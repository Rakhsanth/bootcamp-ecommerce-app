const oneMB = 1 * 1024 * 1024;

export const validatePassword = (password) => {
    if (!password) return false;

    if (password.length < 7) return false;

    if (password.search(/[A-Z]/i) === -1) return false;

    if (password.search(/[a-z]/i) === -1) return false;

    if (password.search(/[0-9]/i) === -1) return false;

    if (password.search(/\W/i) === -1) return false;

    return true;
};

export const validateMobileNumber = (mobileNum) => {
    if (!mobileNum) {
        return false;
    }
    if (mobileNum.length !== 10) {
        return false;
    }
    if (!mobileNum.match(/\d{10}/)) {
        return false;
    }
    return true;
};

export const validateImageFileSize = (file, fileSize) => {
    if (typeof file === 'string') return true;
    if (file !== undefined) {
        if (file.size > fileSize * oneMB) return false;
        if (!file.type.includes('image')) return false;
    }
    return true;
};
export const validateVideoFileSize = (file, fileSize) => {
    if (typeof file === 'string') return true;
    if (file !== undefined) {
        if (file.size > fileSize * oneMB) return false;
        if (!file.type.includes('video')) return false;
    }
    return true;
};
export const validateDocFileSize = (file, fileSize) => {
    if (typeof file === 'string') return true;
    if (file !== undefined) {
        if (file.size > fileSize * oneMB) return false;
        if (!file.type.includes('pdf')) return false;
    }
    return true;
};
