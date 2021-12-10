"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSkillUpdate = exports.validateSkillCreationS3 = exports.validateSkillCreationS2 = exports.validateSkillCreationS1 = void 0;
const worker_1 = require("../entities/worker");
const validateSkillCreationS1 = (options) => {
    if (!(options.category in worker_1.JobCategory)) {
        return [
            {
                field: "category",
                message: "Catégorie invalide",
            },
        ];
    }
    if (!(options.zone in worker_1.CityChoices)) {
        return [
            {
                field: "zone",
                message: "Ville invalide",
            },
        ];
    }
    if (options.title.length <= 9 || options.title.length >= 51) {
        return [
            {
                field: "title",
                message: "Titre doit être entre 10 et 50 caractères",
            },
        ];
    }
    return null;
};
exports.validateSkillCreationS1 = validateSkillCreationS1;
const validateSkillCreationS2 = (options) => {
    if (options.description.length <= 10) {
        return [
            {
                field: "description",
                message: "Description doit être  10 caractères au moins",
            },
        ];
    }
    return null;
};
exports.validateSkillCreationS2 = validateSkillCreationS2;
const validateSkillCreationS3 = (options) => {
    if (!options.duration) {
        return [
            {
                field: "duration",
                message: "Durée invalide",
            },
        ];
    }
    if (options.pricing == "" ||
        parseInt(options.pricing) > 100000 ||
        isNaN(parseInt(options.pricing))) {
        return [
            {
                field: "pricing",
                message: "Prix invalide",
            },
        ];
    }
    return null;
};
exports.validateSkillCreationS3 = validateSkillCreationS3;
const validateSkillUpdate = (options) => {
    if (!(options.category in worker_1.JobCategory)) {
        return [
            {
                field: "category",
                message: "Category invalide",
            },
        ];
    }
    if (!(options.zone in worker_1.CityChoices)) {
        return [
            {
                field: "city",
                message: "Ville invalide",
            },
        ];
    }
    if (options.title.length <= 9 || options.title.length >= 51) {
        return [
            {
                field: "title",
                message: "Titre doit être entre 10 et 50 caractères",
            },
        ];
    }
    if (options.description.length <= 9) {
        return [
            {
                field: "description",
                message: "Description doit être  10 caractères au moins",
            },
        ];
    }
    if (!options.duration) {
        return [
            {
                field: "duration",
                message: "Durée invalide",
            },
        ];
    }
    if (options.pricing == "" || parseInt(options.pricing) > 100000) {
        return [
            {
                field: "price",
                message: "Prix invalide",
            },
        ];
    }
    return null;
};
exports.validateSkillUpdate = validateSkillUpdate;
//# sourceMappingURL=validateInput.js.map