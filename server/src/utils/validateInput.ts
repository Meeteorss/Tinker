import {
  CreateSkillS1Input,
  CreateSkillS2Input,
  CreateSkillS3Input,
  UpdateSkillInput,
} from "../resolvers/skill";
import { CityChoices, JobCategory } from "../entities/worker";

export const validateSkillCreationS1 = (options: CreateSkillS1Input) => {
  if (!(options.category in JobCategory)) {
    return [
      {
        field: "category",
        message: "Catégorie invalide",
      },
    ];
  }

  if (!(options.zone in CityChoices)) {
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

export const validateSkillCreationS2 = (options: CreateSkillS2Input) => {
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

export const validateSkillCreationS3 = (options: CreateSkillS3Input) => {
  if (!options.duration) {
    return [
      {
        field: "duration",
        message: "Durée invalide",
      },
    ];
  }

  if (
    options.pricing == "" ||
    parseInt(options.pricing) > 100000 ||
    isNaN(parseInt(options.pricing))
  ) {
    return [
      {
        field: "pricing",
        message: "Prix invalide",
      },
    ];
  }
  return null;
};

export const validateSkillUpdate = (options: UpdateSkillInput) => {
  if (!(options.category in JobCategory)) {
    return [
      {
        field: "category",
        message: "Category invalide",
      },
    ];
  }

  if (!(options.zone in CityChoices)) {
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
