"use client";
import { Col, Layout, Row } from "antd";
import Header from "./Header";
import { getUserInfo } from "@/services/auth.service";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const { role } = getUserInfo() as any;
  const base = role;
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <Header />

      {children}
    </Content>
  );
};

export default Contents;
