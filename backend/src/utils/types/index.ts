import { Request } from 'express';

export interface Irequest<T> extends Request {
  body: T;
  token: string;
}

export interface IrequestBodyId {
  ownerId: string;
  _id: string;
}

export interface IrequestBodyDates {
  updatedAt: Date;
  createdAt: Date;
}
