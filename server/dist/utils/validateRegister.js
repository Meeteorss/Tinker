"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validateEmail = void 0;
const validateEmail = (value) => {
    if (!value) {
        return false;
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return false;
    }
    return true;
};
exports.validateEmail = validateEmail;
const validateRegister = (options) => {
    if (!(0, exports.validateEmail)(options.email)) {
        return [
            {
                field: "email",
                message: "Adresse email invalide",
            },
        ];
    }
    if (options.firstName.length <= 2 || options.firstName.length >= 21) {
        return [
            {
                field: "firstName",
                message: "Prénom doit être entre 3 et 20 caractères",
            },
        ];
    }
    if (!/^[A-Za-z]+$/.test(options.firstName)) {
        return [
            {
                field: "firstName",
                message: "Prénom ne doit pas contenir un chiffre ou un symbole",
            },
        ];
    }
    if (options.lastName.length <= 2 || options.lastName.length >= 21) {
        return [
            {
                field: "lastName",
                message: "Nom doit être entre 3 et 20 caractères",
            },
        ];
    }
    if (!/^[A-Za-z]+$/.test(options.lastName)) {
        return [
            {
                field: "lastName",
                message: "Nom ne doit pas contenir un chiffre ou un symbole",
            },
        ];
    }
    if (options.userName.length <= 2 || options.firstName.length >= 21) {
        return [
            {
                field: "userName",
                message: "Nom d'utilisateur doit être entre 3 et 20 caractères",
            },
        ];
    }
    if (!/^[A-Za-z0-9]+$/.test(options.userName)) {
        return [
            {
                field: "userName",
                message: "Nom d'utilisateur ne doit pas contenir un symbole",
            },
        ];
    }
    if (options.password.length <= 4) {
        return [
            {
                field: "password",
                message: "Mot de passe doit être au moins 5 caractères",
            },
        ];
    }
    if (options.confirmedPassword != options.password) {
        return [
            {
                field: "confirmedPassword",
                message: "Mots de passes non identiques",
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map