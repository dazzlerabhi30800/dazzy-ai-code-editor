import { childrenType } from "@/type";
import { createContext, useContext, useState } from "react";

export type actionType = {
  actionType: string;
  timestamp: number;
};

type actionContext = {
  action: actionType;
  setAction: React.Dispatch<React.SetStateAction<actionType>>;
  showLoader: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
  liveLink: string | undefined;
  setLiveLink: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const actionContext = createContext<actionContext | null>(null);

export default function ActionContextProvider({ children }: childrenType) {
  const [action, setAction] = useState({
    actionType: "",
    timestamp: 0,
  });
  const [showLoader, setShowLoader] = useState(false);
  const [liveLink, setLiveLink] = useState<string | undefined>();
  return (
    <actionContext.Provider
      value={{
        action,
        setAction,
        showLoader,
        setShowLoader,
        liveLink,
        setLiveLink,
      }}
    >
      {children}
    </actionContext.Provider>
  );
}

export const useActionContext = () => {
  const actionInfoContext = useContext(actionContext);
  if (!actionInfoContext) {
    throw Error("context is not defined");
  }
  return actionInfoContext;
};
