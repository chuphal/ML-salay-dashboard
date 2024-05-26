import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#01204E",
          colorBgLayout: "#313131",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
