import { useEffect, useState } from "react";
import { jwt } from "utils/constants/user";

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  useEffect(() => setIsLoggedIn(jwt ? true : false), [])

  return {
    isLoggedIn
  }
};

export default useIsLoggedIn;
