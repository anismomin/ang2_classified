import { Control } from "angular2/common";

interface ValidationResult {
  [key: string]: boolean;
}

export class UsernameValidator {

  static startsWithNumber(control: Control): ValidationResult {

    if (control.value != "" && !isNaN(control.value.charAt(0))) {
      return { "startsWithNumber": true };
    }

    return null;
  }

  static usernameTaken(control: Control): Promise<ValidationResult> {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "anismomin") {
          resolve({ "usernameTaken": true })
        } else {
          resolve(null);
        };

      }, 1000);
    });

  }
}

export class EmailValidator {

  static validEmail(control: Control): ValidationResult {

    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (control.value != "" && !EMAIL_REGEXP.test(control.value)) {
      return { "invalidEmail": true };
    }

  }
}