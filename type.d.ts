import { ReactNode } from "react";

type childrenType = {
  children: ReactNode;
};

type Obj = { [key: string]: any };

interface workspace {
  _id: string;
  fileData: Obj;
  messages: {
    content: string;
    role: string;
  }[];
  user: string;
  _creationTime: any;
}

interface pricing {
  name: string;
  tokens: string;
  value: number;
  desc: string;
  price: number;
}
