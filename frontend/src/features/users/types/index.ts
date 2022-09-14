export interface Iuser {
  _id: string;
  __v?: number;
  username: string;
  email: string;
  password: string;
  roles: string[];
  updatedAt: Date;
  createdAt: Date;
}

export interface IpublicUser {
  _id: string;
  __v?: number;
  username: string;
  updatedAt: Date;
  createdAt: Date;
  roles: string[];
}

export enum USERS_ROLES {
  ADMIN = "Admin",
  USER = "User"
}