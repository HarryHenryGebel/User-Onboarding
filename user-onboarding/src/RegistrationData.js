export default class RegistrationData {
  constructor(source) {
    this.name = source.name;
    this.email = source.email;
    this.password = source.password;

    // check if it is from form or response
    if ('tosAccepted' in source)
      this.tosAccepted = source.tosAccepted;
    else
      this.tosAccepted = `${source.tosChecked}`;

    // only include registration date if in source data
    if ('createdAt' in source)
      this.since = Date(source.createdAt);
  }
}

//  LocalWords:  createdAt tosAccepted
