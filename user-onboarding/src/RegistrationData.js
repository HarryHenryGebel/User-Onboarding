export default class RegistrationData {
  constructor(source) {
    this.name = source.name;
    this.email = source.email;
    this.password = source.password;
    this.tosAccepted = source.tosAccepted;
  }
}
