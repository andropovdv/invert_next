import { useAppSelector } from "./store";

export const useAuth = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { email, name } = user;
  return {
    isAuth: !!email,
    email,
    name,
    isLoading,
  };
};
