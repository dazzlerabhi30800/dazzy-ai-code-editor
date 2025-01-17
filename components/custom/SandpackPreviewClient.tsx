import React, { useEffect, useRef } from "react";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { useActionContext } from "@/context/ActionContext";

const SandpackPreviewClient = () => {
  const sandboxRef = useRef<any>(null);
  const tabStyle = {
    height: "78vh",
  };
  const { action } = useActionContext();

  const { sandpack } = useSandpack();

  const getSandpackClient = async () => {
    const client = sandboxRef?.current?.getClient();
    console.log(client);
    console.log(action);
    if (client) {
      const result = await client.getCodeSandboxURL();
      if (action.actionType === "deploy") {
        const url = "https://" + result?.sandboxId + ".csb.app/";
        console.log(encodeURI(url));
        window.open(encodeURI(url));
      } else if (action.actionType === "export") {
        window.open(result?.editorUrl);
      } else {
        return;
      }
    }
  };
  useEffect(() => {
    getSandpackClient();
  }, [sandpack && action]);
  return (
    <>
      <SandpackPreview ref={sandboxRef} showNavigator={true} style={tabStyle} />
    </>
  );
};

export default SandpackPreviewClient;
