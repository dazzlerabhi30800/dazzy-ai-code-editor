import { children } from "@/type";
import { createContext, useState } from "react";

type userContext = {
  userDetail: Array<string> | any;
  setUserDetail: React.Dispatch<React.SetStateAction<any>>;
};

export const userContext = createContext<userContext>({
  userDetail: "",
  setUserDetail: () => {},
});

export default function UserContextProvider({ children }: children) {
  const [userDetail, setUserDetail] = useState();
  return (
    <userContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </userContext.Provider>
  );
}
