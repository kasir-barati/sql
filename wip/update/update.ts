import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async updateById(id: number, data: Partial<Omit<User, 'id'>>) {
    let updateFields: string[] = [];

    if (data.email) {
      updateFields.push(`email = ${data.email}`);
    }
    if (data.birthdate) {
      updateFields.push(`birthdate = ${data.birthdate}`);
    }
    if (data.cityId) {
      updateFields.push(`city_id = ${data.cityId}`);
    }
    if (data.firstName) {
      updateFields.push(`first_name = ${data.firstName}`);
    }
    if (data.lastName) {
      updateFields.push(`last_name = ${data.lastName}`);
    }
    if (data.middleName) {
      updateFields.push(`middle_name = ${data.middleName}`);
    }

    console.log(updateFields);

    return await this.prisma.$queryRaw<User>`
    UPDATE users
    SET ${updateFields.join(', ')}
    WHERE id = ${id}
    RETURNING *;
    `;
  }
}
