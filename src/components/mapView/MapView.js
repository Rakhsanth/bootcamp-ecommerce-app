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
// Utils
import Spinner from '../utils/Spinner';

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
        history,
    } = props;

    const [renderDistanceDropdown, setrenderDistanceDropdown] = useState(false);
    // const [currentMapType, setcurrentMapType] = useState('all');

    const dropDownRef = createRef();

    const classes = {};

    const radioInputs = [
        { key: 'show-all', value: 'all', text: 'All Bootcamps' },
        { key: 'show-state', value: 'state', text: 'Bootamps in my state' },
        { key: 'show-near', value: 'near', text: 'Bootcamps near me' },
    ];
    const selectInputs = [
        { key: '10KMs', value: '10', text: '10KMs' },
        { key: '20KMs', value: '20', text: '20KMs' },
        { key: '30KMs', value: '30', text: '30KMs' },
        { key: '600KMs', value: '600', text: '600KMs' },
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

    const generateStars = (stars) => {
        const wholeStars = Math.floor(stars);
        console.log(wholeStars);
        let starSvgs = '';
        for (let star = 1; star <= wholeStars; star++) {
            starSvgs = starSvgs.concat(`<svg
            class="course-feedback-top-rating-stars-star"
        >
            <use xlink:href="img/sprite.svg#icon-star-full"></use>
        </svg>`);
        }
        if (wholeStars < stars) {
            starSvgs = starSvgs.concat(`<svg
            class="course-feedback-top-rating-stars-star"
        >
            <use xlink:href="img/sprite.svg#icon-star-half"></use>
        </svg>`);
        }
        if (Math.ceil(stars) < 5) {
            for (let index = Math.ceil(stars) + 1; index <= 5; index++) {
                starSvgs = starSvgs.concat(`<svg
                class="course-feedback-top-rating-stars-star"
            >
                <use xlink:href="img/sprite.svg#icon-star-empty"></use>
            </svg>`);
            }
        }
        console.log(starSvgs);
        return starSvgs;
    };
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
        const markerWidthHeight = 30;
        if (bootcamps.length > 0) {
            markers = mapSvg
                .select('g')
                .selectAll('image')
                .data(bootcamps)
                .enter()
                .append('use')
                .attr('xlink:href', 'img/sprite.svg#icon-map-marker')
                .attr('x', function (data) {
                    return mapProjection([data.longitude, data.latitude])[0];
                })
                .attr('y', function (data) {
                    return mapProjection([data.longitude, data.latitude])[1];
                })
                .attr('width', markerWidthHeight)
                .attr('height', markerWidthHeight)
                .attr('fill', cssColors.tertiaryColor)
                .attr(
                    'transform',
                    `translate(-${
                        markerWidthHeight / 2
                    }, -${markerWidthHeight})`
                )
                .style('cursor', 'pointer')
                .on('mouseover', function (event, d) {
                    console.log(this);
                    d3.select('.top-level-toop-tip').remove();
                    d3.select(this)
                        .attr('width', `${markerWidthHeight * 1.25}`)
                        .attr('height', `${markerWidthHeight * 1.25}`)
                        .attr(
                            'transform',
                            `translate(-${(markerWidthHeight * 1.25) / 2},-${
                                markerWidthHeight * 1.25
                            })`
                        )
                        .transition()
                        .duration(500);
                    d3.select('body')
                        .append('div')
                        .attr('class', 'top-level-toop-tip')
                        .html(
                            `<h3 class="tool-tip-head">${
                                d.name
                            }</h3><p class="tool-tip-desc">${
                                d.address
                            }</p><div class="course-feedback-top-rating-stars">${generateStars(
                                d.rating ? d.rating : 0
                            )}<p class="tool-tip-text">${
                                d.rating ? d.rating : 'No ratings yet !!!'
                            }</p></div>`
                        )
                        .attr(
                            'style',
                            `top: ${event.pageY - 150}px; left: ${
                                event.pageX - 100
                            }px; opacity: 1; pointer-events: default;`
                        );
                })
                .on('click', function (event, d) {
                    history.push(`/bootcamps/${d.id}`);
                    d3.select('.top-level-toop-tip').attr(
                        'style',
                        `opacity: 0; pointer-events: none;`
                    );
                })
                .on('mouseout', function (event) {
                    console.log(this);
                    d3.select('.top-level-toop-tip').attr(
                        'style',
                        `opacity: 0; pointer-events: none;`
                    );
                    d3.select(this)
                        .attr('width', `${markerWidthHeight}`)
                        .attr('height', `${markerWidthHeight}`)
                        .attr(
                            'transform',
                            `translate(-${
                                markerWidthHeight / 2
                            },-${markerWidthHeight})`
                        )
                        .transition()
                        .duration(500);
                });
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

    useEffect(() => {
        const selectionBox = document.querySelector('.ui.selection.dropdown');
        console.log(selectionBox);
        console.log(renderDistanceDropdown);
        if (renderDistanceDropdown) {
            selectionBox.style = 'display:block !important;';
        } else {
            selectionBox.style = 'display:none !important;';
        }
        console.log(selectionBox);
    });

    const initialValues = {
        filter: radioInputs[0].value,
        radialDistance: selectInputs[0].value,
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
            getMapBootcamps(
                values.filter,
                'Tamil Nadu',
                600056,
                values.radialDistance
            );
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
                        setrenderDistanceDropdown(true);
                        // if (dropDownRef.current !== null) {
                        //     dropDownRef.current.parentElement.style =
                        //         'display:block;';
                        // }
                    } else {
                        console.log('do not display');
                        setrenderDistanceDropdown(false);
                        // if (dropDownRef.current !== null) {
                        //     dropDownRef.current.parentElement.style =
                        //         'display:none;';
                        // }
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
                            <Field
                                as="select"
                                name="radialDistance"
                                class="ui compact selection dropdown map-select"
                            >
                                {selectInputs.map(
                                    ({ key, value, text }, index) => (
                                        <option key={key} value={value}>
                                            {text}
                                        </option>
                                    )
                                )}
                                <i class="dropdown icon map-select-icon"></i>
                            </Field>
                        </Form>
                    );
                }}
            </Formik>
            <div class="d3-map">{loading ? <Spinner size="md" /> : null}</div>
        </Fragment>
    );
}

const mapStateToProps = (store) => ({
    loading: store.mapBootcamps.loading,
    bootcamps: store.mapBootcamps.bootcamps,
    causeReRender: true,
});

export default connect(mapStateToProps, { resetLoading, getMapBootcamps })(
    withRouter(MapView)
);
