export class UniqueEmailConstraints extends Error {
  constructor() {
    super();
    this.name = 'DUP_EMAIL_P2002';
    this.message =
      'Entered email address is already taken by another user!';
  }
}
