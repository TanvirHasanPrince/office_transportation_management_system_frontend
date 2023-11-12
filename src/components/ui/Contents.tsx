"use client";

import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return <Content style={{
minHeight: '100vh',
color: 'black'

  }}>{children}</Content>;
};

export default Contents;
