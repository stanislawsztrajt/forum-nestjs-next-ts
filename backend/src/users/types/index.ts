import { Exclude } from 'class-transformer';

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

export class SerializedUser {
  _id: any;
  __v?: number;
  username: string;
  roles: string[];
  updatedAt: Date;
  createdAt: Date;

  @Exclude()
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
