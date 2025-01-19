import React, { useEffect, useRef } from "react";
import {
  SandpackPreview,
  SandpackPreviewRef,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useActionContext } from "@/context/ActionContext";

const SandpackPreviewClient = () => {
  const sandboxRef = useRef<SandpackPreviewRef>(null);
  const tabStyle = {
    height: "78vh",
  };
  const { action, setLiveLink } = useActionContext();

  const { sandpack } = useSandpack();

  const getSandpackClient = async () => {
    if (!sandboxRef.current) return;
    const client = sandboxRef?.current?.getClient();
    if (client) {
      const result =
        await Object.getPrototypeOf(client).getCodeSandboxURL?.call(client);
      if (action.actionType === "deploy") {
        const url = "https://" + result?.sandboxId + ".csb.app/";
        setLiveLink(url);
      } else if (action.actionType === "export") {
        window.open(result?.editorUrl);
      } else {
        return;
      }
    }
  };
  useEffect(() => {
    getSandpackClient();
  }, [sandpack, action]);
  return (
    <>
      <SandpackPreview ref={sandboxRef} showNavigator={true} style={tabStyle} />
    </>
  );
};

export default SandpackPreviewClient;
