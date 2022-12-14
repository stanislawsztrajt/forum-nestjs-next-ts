import { IpublicUser } from 'features/users/types';
import { Iresponse } from 'utils/types/api';

export interface Ilogin {
  email: string;
  password: string;
}

export interface IloginForm extends Ilogin {
  isRemember: boolean;
}

export type IloginResponseData = Iresponse<{
  jwt: string;
  user: IpublicUser;
}>;

export interface Iregister {
  username: string;
  email: string;
  password: string;
}

export interface IregisterForm extends Iregister {
  repeatedPassword: string;
}
