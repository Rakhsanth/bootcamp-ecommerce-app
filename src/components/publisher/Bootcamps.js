import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components
import BootcampCard from '../cards/bootcampPage/BootcampCard';
import BootcampForm from './BootcampForm';

// actions
import { getTaggedBootcamps } from '../../actions';
import EditBootcamp from './EditBootcamp';

function Bootcamps(props) {
    const { loading, bootcamps, getTaggedBootcamps, userId } = props;

    const [displayBootcampForm, setdisplayBootcampForm] = useState(false);
    const [displayBootcampList, setdisplayBootcampList] = useState(true);
    const [editBootcampId, seteditBootcampId] = useState(null);
    const [query, setquery] = useState(`user=${userId}`);
    const [reRender, setreRender] = useState(false);

    useEffect(() => {
        getTaggedBootcamps(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            query,
            null
        );
    }, [getTaggedBootcamps, loading, reRender]);

    const removeForm = () => {
        setdisplayBootcampForm(false);
    };

    const renderThisBootcamp = (bootcampId) => {
        if (bootcampId) {
            setdisplayBootcampList(false);
            seteditBootcampId(bootcampId);
        } else {
            console.log('render the list thing');
            setdisplayBootcampList(true);
            seteditBootcampId(bootcampId);
        }
    };

    const causeReRender = () => {
        console.log('causing re-render');
        getTaggedBootcamps(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            query,
            null
        );
    };

    const renderBootcampsOrForm = () => {
        if (displayBootcampForm) {
            return (
                <BootcampForm
                    removeForm={removeForm}
                    causeReRender={causeReRender}
                />
            );
        } else {
            if (displayBootcampList) {
                return !loading ? (
                    <div class="publisher-bootcamps-container">
                        {bootcamps.length > 0 ? (
                            <Fragment>
                                {bootcamps.map((bootcamp, index) => (
                                    <BootcampCard
                                        key={index}
                                        id={bootcamp._id}
                                        image={bootcamp.photo}
                                        name={bootcamp.name}
                                        address={bootcamp.address}
                                        rating={
                                            bootcamp.averageRating
                                                ? bootcamp.averageRating
                                                : null
                                        }
                                        renderThisBootcamp={renderThisBootcamp}
                                        causeReRender={causeReRender}
                                    />
                                ))}
                            </Fragment>
                        ) : (
                            <h1>You have not created bootcamps yet !!!</h1>
                        )}
                    </div>
                ) : (
                    <h1>Loading !!!</h1>
                );
            } else {
                if (editBootcampId) {
                    return (
                        <EditBootcamp
                            bootcampId={editBootcampId}
                            causeReRender={causeReRender}
                            renderThisBootcamp={renderThisBootcamp}
                        />
                    );
                }
            }
        }
    };

    const renderAddButton = () => {
        if (displayBootcampForm || !displayBootcampList) {
            return (
                <button
                    class="btn btn-primary btn-md"
                    onClick={() => {
                        setdisplayBootcampForm(false);
                        setdisplayBootcampList(true);
                    }}
                >
                    {'<< Back'}
                </button>
            );
        } else {
            return (
                <button
                    class="btn btn-primary btn-center btn-circle pubBootcamp-create-btn"
                    onClick={() => setdisplayBootcampForm(true)}
                >
                    <svg class="pubBootcamp-create-btn-icon">
                        <use xlinkHref="img/sprite.svg#icon-plus-circle" />
                    </svg>
                </button>
            );
        }
    };

    return (
        <Fragment>
            {renderBootcampsOrForm()}
            {renderAddButton()}
        </Fragment>
    );
}

const mapStateToProps = (store) => ({
    loading: store.taggedBootcamps.loading,
    bootcamps: store.taggedBootcamps.bootcamps,
    userId: store.auth.user._id,
});

export default connect(mapStateToProps, { getTaggedBootcamps })(Bootcamps);
