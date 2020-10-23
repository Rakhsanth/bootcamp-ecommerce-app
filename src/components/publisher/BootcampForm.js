import React from 'react';

function BootcampForm(props) {
    return (
        <div class="main-conatiner-bootcampForm">
            <div class="ui top attached two steps">
                <div
                    class="active step bootcamp-form-step"
                    // onclick="handleStepper(event)"
                >
                    <i aria-hidden="true" class="truck icon"></i>
                    <div class="content">
                        <div class="title">Basic information</div>
                        <div class="description">
                            Bootcamp and location specific information
                        </div>
                    </div>
                </div>
                <div
                    class="disabled step bootcamp-form-step"
                    // onclick="handleStepper(event)"
                >
                    <i aria-hidden="true" class="payment icon"></i>
                    <div class="content">
                        <div class="title">Technical information</div>
                        <div class="description">
                            Bootcamp offerings, skillset and more
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui attached segment">
                <div class="bootcamp-form-content">
                    <div class="bootcamp-form-content-basic">
                        <div class="bootcamp-form-content-basic-picture">
                            <img
                                src="./img/courseImages/course.png"
                                alt=""
                                class="pubProfile-tabContent-profile-image-img"
                            />
                            <label
                                for="pubProfile-picture"
                                class="btn btn-primary pubProfile-form-control-label text-center label-btn"
                            >
                                Change picture
                            </label>
                            <input
                                id="pubProfile-picture"
                                type="file"
                                class="pubProfile-form-control-fileInput"
                                multiple
                            />
                        </div>
                        <div class="bootcamp-form-content-basic-details">
                            <div class="pubProfile-form-control">
                                <label
                                    for="bootcamp-name"
                                    class="pubProfile-form-control-label"
                                >
                                    Bootcamp Name
                                </label>
                                <input
                                    id="bootcamp-name"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="Tech Pllayground"
                                />
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="bootcamp-state"
                                    class="pubProfile-form-control-label"
                                >
                                    State
                                </label>
                                <input
                                    id="bootcamp-state"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="Tamil Nadu"
                                />
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="bootcamp-district"
                                    class="pubProfile-form-control-label"
                                >
                                    District
                                </label>
                                <input
                                    id="bootcamp-district"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="Madurai"
                                />
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="bootcamp-address"
                                    class="pubProfile-form-control-label"
                                >
                                    Complete address
                                </label>
                                <input
                                    id="bootcamp-address"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="no: 10, xyz apartments, abc nagar, 10th cross street ........."
                                />
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="bootcamp-pincode"
                                    class="pubProfile-form-control-label"
                                >
                                    Pincode
                                </label>
                                <input
                                    id="bootcamp-pincode"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="600026"
                                />
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for=""
                                    class="pubProfile-form-control-label"
                                >
                                    Housing provided
                                </label>
                                <div class="pubProfile-form-control-radio">
                                    <div class="pubProfile-form-control-radio-set">
                                        <input
                                            id="housing-yes"
                                            type="radio"
                                            name="housing"
                                            class="pubProfile-form-control-input"
                                        />
                                        <label
                                            for="housing-yes"
                                            class="pubProfile-form-control-label"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                    <div class="pubProfile-form-control-radio-set">
                                        <input
                                            id="housing-no"
                                            type="radio"
                                            name="housing"
                                            class="pubProfile-form-control-input"
                                        />
                                        <label
                                            for="housing-no"
                                            class="pubProfile-form-control-label"
                                        >
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for=""
                                    class="pubProfile-form-control-label"
                                >
                                    Job assistance provided
                                </label>
                                <div class="pubProfile-form-control-radio">
                                    <div class="pubProfile-form-control-radio-set">
                                        <input
                                            id="job-assistance-yes"
                                            type="radio"
                                            name="job-assistance"
                                            class="pubProfile-form-control-input"
                                        />
                                        <label
                                            for="job-assistance-yes"
                                            class="pubProfile-form-control-label"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                    <div class="pubProfile-form-control-radio-set">
                                        <input
                                            id="job-assistance-no"
                                            type="radio"
                                            name="job-assistance"
                                            class="pubProfile-form-control-input"
                                        />
                                        <label
                                            for="job-assistance-no"
                                            class="pubProfile-form-control-label"
                                        >
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for=""
                                    class="pubProfile-form-control-label"
                                >
                                    Job guaranteed
                                </label>
                                <div class="pubProfile-form-control-radio">
                                    <div class="pubProfile-form-control-radio-set">
                                        <input
                                            id="job-guaranteed-yes"
                                            type="radio"
                                            name="job-guaranteed"
                                            class="pubProfile-form-control-input"
                                        />
                                        <label
                                            for="job-guaranteed-yes"
                                            class="pubProfile-form-control-label"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                    <div class="pubProfile-form-control-radio-set">
                                        <input
                                            id="job-guaranteed-no"
                                            type="radio"
                                            name="job-guaranteed"
                                            class="pubProfile-form-control-input"
                                        />
                                        <label
                                            for="job-guaranteed-no"
                                            class="pubProfile-form-control-label"
                                        >
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bootcamp-form-content-basic-bottom">
                            <button
                                type="button"
                                class="btn btn-primary btn-md"
                                disabled
                            >
                                back
                            </button>
                            <button
                                type="button"
                                class="btn btn-primary btn-md"
                            >
                                next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BootcampForm;
