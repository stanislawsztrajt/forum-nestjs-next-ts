import { IpublicUser } from 'features/users/types';
import Cookies from 'js-cookie';

export const user: IpublicUser = Cookies.get('user') ? JSON.parse(JSON.parse(JSON.stringify(Cookies.get('user')))) : {}
export const jwt = Cookies.get('jwt') as string | undefined;
export const authBearer = { headers: { Authorization: `Bearer ${jwt}` } }