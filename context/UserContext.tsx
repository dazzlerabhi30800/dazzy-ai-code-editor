import React, { createContext, useContext, useState } from "react";
import { childrenType } from "@/type";

interface user {
  _id: string;
  name?: string;
  email?: string;
  uid?: string;
  picture?: string;
}

type userState = user | null | undefined;

type userContext = {
  userDetail: userState;
  setUserDetail: React.Dispatch<React.SetStateAction<userState>>;
};
const UserContext = createContext<userContext | null>(null);

export default function UserContextProvider({ children }: childrenType) {
  const [userDetail, setUserDetail] = useState<userState>();
  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const userInfoContext = useContext(UserContext);
  if (!userInfoContext) {
    throw Error("context is not defined");
  }
  return userInfoContext;
};
