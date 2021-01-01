import React from 'react';

function Alert(props) {
    const { color, message } = props;

    return (
        <div className="tempAlert" style={{ backgroundColor: color }}>
            <h5 className="tempAlert-text">{message}</h5>
        </div>
    );
}

export default Alert;
