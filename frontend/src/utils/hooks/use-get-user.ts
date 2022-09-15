import { IpublicUser } from 'features/users/types';
import { useEffect, useState } from 'react';
import { user } from 'utils/constants/user';

const useGetUser = () => {
  const [hydrationedUser, setHydrationedUserr] = useState<IpublicUser>({
    _id: '',
    username: '',
    updatedAt: new Date(),
    createdAt: new Date(),
    roles: [''],
  });

  useEffect(() => setHydrationedUserr(user), []);

  return hydrationedUser;
};

export default useGetUser;
