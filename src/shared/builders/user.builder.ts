import { createUserUsingPrisma } from '../../create/create-user';
import {
  generateRandomDate,
  generateRandomNumber,
} from '../utils/random.util';

// https://github.com/kasir-barati/algorithm-in-js-ts/tree/main/src/design-patterns/builder
export class UserBuilder {
  private email: string;
  private firstName: string | null;
  private middleName: string | null;
  private lastName: string | null;
  private cityId: string | null;
  private birthdate: Date;

  constructor() {
    this.cityId = 'UKY';
    this.birthdate = generateRandomDate();
    this.email = 'e' + generateRandomNumber(9) + '@ex.jp';
    this.firstName = 'Some name' + generateRandomNumber(3);
    this.lastName = 'Some last name' + generateRandomNumber(3);
    this.middleName = 'Some middle name' + generateRandomNumber(3);
  }

  setEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }
  setFirstName(firstName: string): UserBuilder {
    this.firstName = firstName;
    return this;
  }
  setLastName(lastName: string): UserBuilder {
    this.lastName = lastName;
    return this;
  }
  setMiddleName(middleName: string): UserBuilder {
    this.middleName = middleName;
    return this;
  }
  setCityId(cityId: string): UserBuilder {
    this.cityId = cityId;
    return this;
  }
  setBirthdate(birthdate: Date): UserBuilder {
    this.birthdate = birthdate;
    return this;
  }

  async build(): Promise<number> {
    const user = await createUserUsingPrisma({
      email: this.email,
      cityId: this.cityId,
      lastName: this.lastName,
      birthdate: this.birthdate,
      firstName: this.firstName,
      middleName: this.middleName,
    });

    return user.id;
  }
}
