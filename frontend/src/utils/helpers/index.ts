import axios from 'axios';
import { IpublicUser, USERS_ROLES } from 'features/users/types';
import { jwt } from 'utils/constants/user';
import { Iresponse } from 'utils/types/api';

type TgetUsersFromOwnerIds = (array: { ownerId: string }[]) => Promise<IpublicUser[]>;
export const getUsersFromOwnersIdsAsync: TgetUsersFromOwnerIds = async (array) => {
  return await Promise.all(
    array.map(async (element) => {
      const { data }: Iresponse<IpublicUser> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${element.ownerId}`
      );
      return data;
    })
  );
};

export const scrollToElementById = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export const checkIsUserIsAdmin = (user: IpublicUser) => user.roles.includes(USERS_ROLES.ADMIN)

export const guardRoutes = (path: string, routerPush: (url: string) => Promise<boolean>) => {
  switch (path) {
    case '/auth/login':
      {
        if (jwt) routerPush('/dashboard');
      }
      break;
    case '/auth/register':
      {
        if (jwt) routerPush('/dashboard');
      }
      break;
    case '/dadhbosrd':
      {
        if (!jwt) routerPush('/auth/login');
      }
      break;
  }
};
