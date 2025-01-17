import React, { useEffect, useRef } from "react";
import {
  SandpackPreview,
  SandpackPreviewRef,
} from "@codesandbox/sandpack-react";
import { useActionContext } from "@/context/ActionContext";

const SandpackPreviewClient = () => {
  const sandboxRef = useRef<SandpackPreviewRef>(null);
  const tabStyle = {
    height: "78vh",
  };
  const { action } = useActionContext();

  // const { sandpack } = useSandpack();

  const getSandpackClient = async () => {
    if (!sandboxRef.current) return;
    const client = sandboxRef?.current?.getClient();
    if (client) {
      const result =
        await Object.getPrototypeOf(client).getCodeSandboxURL?.call(client);
      if (action.actionType === "deploy") {
        console.log(result);
        const url = "https://" + result?.sandboxId + ".csb.app/";
        console.log(encodeURI(url));
        window.open(encodeURI(url));
      } else if (action.actionType === "export") {
        window.open(result?.editorUrl);
        console.log(result);
      } else {
        return;
      }
    }
  };
  useEffect(() => {
    getSandpackClient();
  }, [action]);
  return (
    <>
      <SandpackPreview ref={sandboxRef} showNavigator={true} style={tabStyle} />
    </>
  );
};

export default SandpackPreviewClient;
