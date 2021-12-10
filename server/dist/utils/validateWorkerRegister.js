"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWorkerRegister = void 0;
const worker_1 = require("../entities/worker");
const validateWorkerRegister = (options) => {
    if (!(options.city in worker_1.CityChoices)) {
        return [
            {
                field: "city",
                message: "Ville invalide",
            },
        ];
    }
    if (!/^\(?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/.test(options.phone)) {
        return [
            {
                field: "phone",
                message: "Numero de téléphone invalide",
            },
        ];
    }
    if (options.description.length <= 10) {
        return [
            {
                field: "description",
                message: "Description doit être au moins 10 caractères",
            },
        ];
    }
    if (options.sexe != "Male" && options.sexe != "Female") {
        return [
            {
                field: "sexe",
                message: "Sexe Invalide",
            },
        ];
    }
    if (options.dateOfBirth == null) {
        return [
            {
                field: "dateOfBirth",
                message: "Date de naissance nécessaire",
            },
        ];
    }
    return null;
};
exports.validateWorkerRegister = validateWorkerRegister;
//# sourceMappingURL=validateWorkerRegister.js.map