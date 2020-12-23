import React from 'react';

function EnrolledCard(props) {
    // custom css related variable:
    const lineSeperatorColor = 'rgb(220, 218, 203)';
    const tertiaryColor = '#ea5252';

    const { courseId, title, description, endCourse } = props;

    return (
        <div
            class="filter-result-card"
            style={{
                marginTop: '1rem',
                border: `1px solid ${tertiaryColor}`,
                borderRadius: '1rem',
                width: '90%',
                alignItems: 'center',
                cursor: 'default',
            }}
        >
            <div class="filter-result-card-details">
                <h5 class="filter-result-card-details-title">{title}</h5>
                <p class="filter-result-card-details-description">
                    {description}
                </p>
            </div>
            <button
                class="btn btn-circle pubBootcampCard-btn"
                style={{ marginLeft: 'auto', marginRight: '3rem' }}
                onClick={(event) => endCourse(courseId)}
            >
                <svg style={{ width: '2rem', height: '2rem' }}>
                    {/*Inline styled for ease*/}
                    <use xlinkHref="img/sprite.svg#icon-bin2"></use>
                </svg>
            </button>
        </div>
    );
}

export default EnrolledCard;
