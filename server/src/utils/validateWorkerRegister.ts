import { CityChoices } from "../entities/worker";
import { WorkerRegisterInput } from "../resolvers/worker";

export const validateWorkerRegister = (options: WorkerRegisterInput) => {
  if (!(options.city in CityChoices)) {
    return [
      {
        field: "city",
        message: "Ville invalide",
      },
    ];
  }

  if (
    !/^\(?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/.test(
      options.phone
    )
  ) {
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
