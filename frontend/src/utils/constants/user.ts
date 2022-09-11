import { IpublicUser } from 'features/users/types';
import Cookies from 'js-cookie';

export const user = Cookies.get('user') as IpublicUser | undefined;
export const jwt = Cookies.get('jwt') as string | undefined;
