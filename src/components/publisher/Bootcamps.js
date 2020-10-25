import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components
import BootcampCard from '../cards/bootcampPage/BootcampCard';
import BootcampForm from './BootcampForm';

// actions
import { getTaggedBootcamps } from '../../actions';

function Bootcamps(props) {
    const { loading, bootcamps, getTaggedBootcamps, userId } = props;

    const [displayBootcampForm, setdisplayBootcampForm] = useState(false);
    const [query, setquery] = useState(`user=${userId}`);

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
    }, [getTaggedBootcamps, loading]);

    const removeForm = () => {
        setdisplayBootcampForm(false);
    };

    const renderBootcampsOrForm = () => {
        if (displayBootcampForm) {
            return <BootcampForm removeForm={removeForm} />;
        } else {
            return !loading ? (
                <div class="publisher-bootcamps-container">
                    {bootcamps.length > 0 ? (
                        <Fragment>
                            {bootcamps.map((bootcamp, index) => (
                                <BootcampCard
                                    key={bootcamp._id}
                                    image={bootcamp.photo}
                                    name={bootcamp.name}
                                    address={bootcamp.address}
                                    rating={
                                        bootcamp.averageRating
                                            ? bootcamp.averageRating
                                            : null
                                    }
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
        }
    };

    const renderAddButton = () => {
        if (displayBootcampForm) {
            return (
                <button
                    class="btn btn-primary btn-md"
                    onClick={() => setdisplayBootcampForm(false)}
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
