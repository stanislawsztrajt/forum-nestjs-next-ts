import { Exclude } from "class-transformer";

export interface Iuser {
  _id: string;
  __v?: number
  username: string;
  email: string;
  password: string;
  roles: string[];
}

export class SerializedUser {
  _id: any
  __v?: number
  username: string
  roles: string[]

  @Exclude()
  email: string

  @Exclude()
  password: string


  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial)
  }
}

