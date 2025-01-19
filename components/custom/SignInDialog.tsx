"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";

import React from "react";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { nanoid } from "nanoid";
import { toast } from "sonner";

const SignInDialog = ({
  isOpen,
  closeDialog,
}: {
  isOpen: boolean;
  closeDialog: () => void;
}) => {
  const { setUserDetail } = useUserContext();
  const CreateUser = useMutation(api.users.CreateUser);
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } },
      );
      const user = userInfo?.data;
      const createdUser = await CreateUser({
        name: user.name,
        picture: user.picture,
        email: user.email,
        uid: nanoid(),
      });
      if (typeof window !== undefined) {
        window.localStorage.setItem("user", JSON.stringify(user));
      }
      setUserDetail(createdUser as any);
      closeDialog();
      toast.success(`Welcome Back ${user?.name}`);
    },
    onError: (errResponse) => console.log(errResponse),
  });
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent
        className="text-center"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="sr-only text-2xl font-bold text-white text-center">
            {Lookup.SIGNIN_HEADING}
          </DialogTitle>
          <DialogDescription
            id="dialog-description"
            className="mt-2 text-center"
          >
            {Lookup.SIGNIN_SUBHEADING}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={() => login()}
            className="bg-blue-500 text-white hover:bg-blue-400 mt-2 w-fit mx-auto"
          >
            Sign In With Google
          </Button>
          <p className="text-gray-500 text-xs">
            {Lookup.SIGNIN_AGREEMENT_TEXT}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
