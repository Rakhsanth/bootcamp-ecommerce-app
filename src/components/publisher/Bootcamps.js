import React, { Fragment, useState } from 'react';

// components
import BootcampForm from './BootcampForm';

function Bootcamps(props) {
    const [displayBootcampForm, setdisplayBootcampForm] = useState(false);

    const renderBootcampForm = () => {
        if (displayBootcampForm) {
            return <BootcampForm />;
        } else {
            return null;
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
            {renderBootcampForm()}
            {renderAddButton()}
        </Fragment>
    );
}

export default Bootcamps;
