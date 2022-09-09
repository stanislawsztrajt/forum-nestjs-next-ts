import axios from 'axios';
import { IpublicUser } from 'features/users/types';
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
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}