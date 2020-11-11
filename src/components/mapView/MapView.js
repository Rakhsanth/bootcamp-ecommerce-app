import React, { createRef, Fragment, useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as d3 from 'd3';
import 'd3-selection-multi';
import useMediaQuery from 'react-responsive';

// Action creators
import { resetLoading, getMapBootcamps } from '../../actions';

// Import geojson for inida map
import { geoJson } from '../../config/india_geo_json';

function MapView(props) {
    const cssColors = {
        primaryBtnColor: ' #0f7c90',
        tertiaryColor: '#ea5252',
        tertiaryColorLight: '#be5a0e',
    };

    const {
        loading,
        resetLoading,
        getMapBootcamps,
        bootcamps,
        causeReRender,
    } = props;

    const [renderDistanceDropdown, setrenderDistanceDropdown] = useState(false);
    const [currentMapType, setcurrentMapType] = useState('all');

    const dropDownRef = createRef();

    const classes = {};

    const radioInputs = [
        { key: 'show-all', value: 'all', text: 'All Bootcamps' },
        { key: 'show-state', value: 'state', text: 'Bootamps in my state' },
        { key: 'show-near', value: 'near', text: 'Bootcamps near me' },
    ];

    const isMobile = useMediaQuery({ query: '(max-width: 37.5em)' });
    const isTabletPortrait = useMediaQuery({ query: '(max-width: 56.25em)' });
    const isTabletLandscape = useMediaQuery({ query: '(max-width: 75em)' });
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 75em)' });

    console.log(
        isMobile,
        isTabletPortrait,
        isTabletLandscape,
        isDesktopOrLaptop
    );
    let mapWidth, mapHeight;
    if (isDesktopOrLaptop === undefined) {
        console.log('desktop');
        mapWidth = 750;
        mapHeight = 750;
    }
    if (isTabletLandscape === undefined) {
        console.log('tab-land');
        mapWidth = 600;
        mapHeight = 600;
    }
    if (isTabletPortrait === undefined) {
        console.log('tab-port');
        mapWidth = 500;
        mapHeight = 500;
    }
    if (isMobile === undefined) {
        console.log('mobile');
        mapWidth = 400;
        mapHeight = 400;
    }

    let mapSvg;
    useEffect(() => {
        console.log(mapWidth, mapHeight);
        d3.select('.d3-map').select('svg').remove();
        mapSvg = d3
            .select('.d3-map')
            .append('svg')
            .attr('width', mapWidth)
            .attr('height', mapHeight);

        const mapProjection = d3
            .geoMercator()
            .fitSize([mapWidth, mapHeight], geoJson);

        const mapPath = d3.geoPath().projection(mapProjection);

        const mapViz = mapSvg
            .append('g')
            .selectAll('path')
            .data(geoJson.features)
            .enter()
            .append('path')
            .attr('d', mapPath)
            .attr('fill', cssColors.primaryBtnColor);

        let markers;
        const markerWidthHeight = 20;
        // This is to populate D3s current data dynamically for global use
        let currentData;
        // This is to render tooltip inside this div dynamically
        d3.select('body').append('div').attr('class', 'marker-tool-tip');
        if (bootcamps.length > 0) {
            markers = mapSvg
                .select('g')
                .selectAll('image')
                .data(bootcamps)
                .enter()
                .append('image')
                .attr('xlink:href', 'img/map_marker_icon.png')
                .attr('x', function (data) {
                    currentData = data;
                    return mapProjection([data.longitude, data.latitude])[0];
                })
                .attr('y', function (data) {
                    return mapProjection([data.longitude, data.latitude])[1];
                })
                .attr('width', markerWidthHeight)
                .attr('height', markerWidthHeight)
                .attr('fill', cssColors.tertiaryColor)
                .attr('class', 'map-marker')
                .attr(
                    'transform',
                    `translate(-${markerWidthHeight / 2}, -${
                        markerWidthHeight / 2
                    })`
                );
        }
    }, [
        isMobile,
        isTabletPortrait,
        isTabletLandscape,
        isDesktopOrLaptop,
        bootcamps.length,
    ]);

    useEffect(() => {
        getMapBootcamps('all');
    }, [getMapBootcamps]);

    const initialValues = {
        filter: radioInputs[0].value,
        radialDistance: '',
    };

    const validationSchema = Yup.object({
        filter: Yup.string().required('The filter condition is mandatory'),
        radialDistance: Yup.string().optional(),
    });

    const onSubmit = (values) => {
        // console.log(values.filter);
        if (values.filter === 'all') {
            resetLoading('mapBootcamps');
            getMapBootcamps(values.filter);
        }
        if (values.filter === 'state') {
            resetLoading('mapBootcamps');
            getMapBootcamps(values.filter, 'Tamil Nadu');
        }
        if (values.filter === 'near') {
            resetLoading('mapBootcamps');
            getMapBootcamps(values.filter, 'Tamil Nadu', 600056, 10);
        }
    };

    return (
        <Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validate={onSubmit}
            >
                {(formik) => {
                    console.log(formik);
                    if (formik.values.filter === radioInputs[2].value) {
                        console.log('display');
                        if (dropDownRef.current !== null) {
                            dropDownRef.current.parentElement.style =
                                'display:block;';
                        }
                    } else {
                        console.log('do not display');
                        if (dropDownRef.current !== null) {
                            dropDownRef.current.parentElement.style =
                                'display:none;';
                        }
                    }
                    return (
                        <Form class="map-view-form">
                            {radioInputs.map(({ key, value, text }, index) => (
                                <div key={index} class="map-form-control">
                                    <Field
                                        type="radio"
                                        class="map-form-control-input"
                                        name="filter"
                                        id={key}
                                        value={value}
                                        checked={formik.values.filter === value}
                                    />
                                    <label
                                        for={key}
                                        class="map-form-control-label"
                                    >
                                        {text}
                                    </label>
                                </div>
                            ))}
                            <select
                                ref={dropDownRef}
                                class="ui compact selection dropdown map-select"
                            >
                                <i class="dropdown icon map-select-icon"></i>
                                <div class="menu">
                                    <div class="item">
                                        <option value="">
                                            Radial Distance
                                        </option>
                                    </div>
                                    <div class="item">
                                        <option value="10">10 KMs</option>
                                    </div>
                                    <div class="item">
                                        <option value="20">20 KMs</option>
                                    </div>
                                    <div class="item">
                                        <option value="30">30 KMs</option>
                                    </div>
                                </div>
                            </select>
                        </Form>
                    );
                }}
            </Formik>
            <div class="d3-map"></div>
        </Fragment>
    );
}

const mapStateToProps = (store) => ({
    loading: store.mapBootcamps.loading,
    bootcamps: store.mapBootcamps.bootcamps,
    causeReRender: true,
});

export default connect(mapStateToProps, { resetLoading, getMapBootcamps })(
    MapView
);
