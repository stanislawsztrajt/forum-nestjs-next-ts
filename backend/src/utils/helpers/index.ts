import { HttpException, HttpStatus } from '@nestjs/common';

export const parseResponse: (res: any) => any = (res) => {
  return JSON.parse(JSON.stringify(res));
};

export const parseJwt: (jwt: string) => string = (jwt) => {
  try {
    return jwt.split(' ')[1];
  } catch {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
};

export const checkIsUserIsAdmin: (roles: string[]) => boolean = (roles) => {
  return roles.map((role) => role.toLowerCase()).includes('admin');
};
