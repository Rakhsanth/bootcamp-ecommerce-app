import React from 'react';
import { Fragment } from 'react';

function Spinner(props) {
    const { size, global } = props;

    console.log(size);

    const smallSpinner = () => {
        if (size === 'sm') {
            return (
                <div className="spinner-container">
                    <img
                        className="spinner"
                        style={{
                            top: global ? '50vh' : null,
                            left: global ? '50vw' : null,
                        }}
                        src="img/spinners/Double Ring-1s-98px.svg"
                        alt="loading-spinner"
                    />
                </div>
            );
        } else {
            return null;
        }
    };

    const mediumSpinner = () => {
        if (size === 'md') {
            return (
                <div className="spinner-container">
                    <img
                        className="spinner"
                        style={{
                            top: global ? '50vh' : null,
                            left: global ? '50vw' : null,
                        }}
                        src="img/spinners/Double Ring-1s-217px.svg"
                        alt="loading-spinner"
                    />
                </div>
            );
        } else {
            return null;
        }
    };

    const largeSpinner = () => {
        if (size === 'lg') {
            return (
                <div className="spinner-container">
                    <img
                        className="spinner"
                        style={{
                            top: global ? '50vh' : null,
                            left: global ? '50vw' : null,
                        }}
                        src="img/spinners/Double Ring-1s-377px.svg"
                        alt="loading-spinner"
                    />
                </div>
            );
        } else {
            return null;
        }
    };

    const hugeSpinner = () => {
        if (size === 'hg') {
            return (
                <div className="spinner-container">
                    <img
                        className="spinner"
                        style={{
                            top: global ? '50vh' : null,
                            left: global ? '50vw' : null,
                        }}
                        src="img/spinners/Double Ring-1s-504px.svg"
                        alt="loading-spinner"
                    />
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <Fragment>
            {smallSpinner()}
            {mediumSpinner()}
            {largeSpinner()}
            {hugeSpinner()}
        </Fragment>
    );
}

export default Spinner;
