"use client";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import TMSBreastCrumb from "./TMSBreastCrumb";

const { Header, Content, Footer, Sider } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = 'admin'
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <TMSBreastCrumb
        items={[
          {
            label: `${base}`,
            link: `/${base}`,
          },

          {
            label: `student`,
            link: `/${base}/student`,
          },
        ]}
      />

      {children}
    </Content>
  );
};

export default Contents;
