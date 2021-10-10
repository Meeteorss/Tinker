"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateEmail = (value) => {
    if (!value) {
        return false;
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return false;
    }
    return true;
};
const validateRegister = (options) => {
    if (!validateEmail(options.email)) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }
    if (options.firstName.length <= 2 || options.firstName.length >= 21) {
        return [
            {
                field: "firstName",
                message: "length must between 3 and 20 character",
            },
        ];
    }
    if (!/^[A-Za-z]+$/.test(options.firstName)) {
        return [
            {
                field: "firstName",
                message: "Cannot include a symbol or number",
            },
        ];
    }
    if (options.lastName.length <= 2 || options.lastName.length >= 21) {
        return [
            {
                field: "lastName",
                message: "length must between 3 and 20 character",
            },
        ];
    }
    if (!/^[A-Za-z]+$/.test(options.lastName)) {
        return [
            {
                field: "lastName",
                message: "Cannot include a symbol or number",
            },
        ];
    }
    if (options.password.length <= 2) {
        return [
            {
                field: "password",
                message: "length must be greater than 2",
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map