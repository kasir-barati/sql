export interface UserDataRepresentationInDatabase {
  id: number;
  email: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  city_id: string | null;
  birthdate: Date;
}
