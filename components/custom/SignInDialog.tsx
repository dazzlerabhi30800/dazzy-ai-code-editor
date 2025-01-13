import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { userContext } from "@/context/UserContext";

const SignInDialog = ({
  isOpen,
  closeDialog,
}: {
  isOpen: boolean;
  closeDialog: () => void;
}) => {
  const { setUserDetail } = useContext(userContext);
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } },
      );
      setUserDetail(userInfo?.data);
    },
    onError: (errResponse) => console.log(errResponse),
  });
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            {Lookup.SIGNIN_HEADING}
          </DialogTitle>
          <DialogDescription className="mt-2 text-center">
            {Lookup.SIGNIN_SUBHEADING}
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={() => login()}
          className="bg-blue-500 text-white hover:bg-blue-400 mt-2 w-fit mx-auto"
        >
          Sign In With Google
        </Button>
        <p className="text-gray-500 text-xs">{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
