export class RegisterForm {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public username?: string,
    public password?: string,
    public passwordConfirm?: string,
    public birthday?: string,
    public email?: string,
    public contactNumber?: string
  ) {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.password = '';
    this.passwordConfirm = '';
    this.birthday = '';
    this.email = '';
    this.contactNumber = '';
  }
}
