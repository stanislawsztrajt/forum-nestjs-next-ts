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