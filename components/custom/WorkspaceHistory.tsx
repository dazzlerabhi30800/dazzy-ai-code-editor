import { useMessageContext } from "@/context/MessageContext";
import { useUserContext } from "@/context/UserContext";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { workspace } from "@/type";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const WorkspaceHistory = () => {
  const { userDetail } = useUserContext();
  const { messages } = useMessageContext();
  const [workspaces, setWorkspaces] = useState<Array<workspace>>([]);
  const convex = useConvex();

  //NOTE: get all the workspaces
  const getWorkspace = async (id: string) => {
    const result = await convex.query(api.workspace.getAllWorkspace, {
      userId: id as Id<"users">,
    });
    setWorkspaces(result as workspace[]);
  };

  useEffect(() => {
    userDetail && getWorkspace(userDetail._id);
  }, [userDetail, messages]);
  // console.log(workspaces);
  return (
    <div>
      <h2 className="font-medium text-lg">Your Chats</h2>
      <div className="mt-2">
        {workspaces?.map((item: workspace, index) => (
          <Link
            href={`/workspace/${item._id}`}
            key={index}
            className="text-sm font-light text-gray-500 hover:text-gray-300 mt-3"
          >
            <h3 className="">{item?.messages[0]?.content}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceHistory;
