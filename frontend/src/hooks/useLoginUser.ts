import { useLoginUserContext } from "@/contexts/LoginUserContext";

export const useLoginUser = () => {
  const { loginUser, setLoginUser } = useLoginUserContext();
  return { loginUser, setLoginUser };
};
