import useGetUser from './use-get-user';

type TcheckUserRoles = (roles: string[]) => boolean;
const useCheckUserRoles: TcheckUserRoles = (roles) =>
  useGetUser().roles.some((role) => roles.includes(role));

export default useCheckUserRoles;
