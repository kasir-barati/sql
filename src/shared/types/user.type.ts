export interface PrismaUsersCountInEachCityReturnType {
  _count: { _all: number };
  cityId: string | null;
}

export interface UsersCountInEachCity {
  cityId: string | null;
  count: number;
}
