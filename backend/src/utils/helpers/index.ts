import { HttpException, HttpStatus } from "@nestjs/common";

export const parseResponse: (res: any) => any = (res) => {
  return JSON.parse(JSON.stringify(res));
};

export const parseJwt: (jwt: string) => string = (jwt) => {
  console.log(jwt.includes(process.env.JWT_SECRET))
  if (!jwt || !jwt.includes(process.env.JWT_SECRET)) {
    throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
  }

  return jwt.split(' ')[1]
};

export const checkIsUserIsAdmin: (roles: string[]) => boolean = (roles) => {
  return roles.map((role) => role.toLowerCase()).includes('admin');
};
