export interface IUser {
  _id: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUserInputDTO {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
}
