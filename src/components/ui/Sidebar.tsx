"use client";
import React, { useState } from "react";
import {  Layout, Menu } from "antd";
import { sidebarItems } from "@/constants/sidebarItems";
import { USER_ROLE } from "@/constants/role";

const {  Sider } = Layout;



const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const role = USER_ROLE.ADMIN;
  return (
    <div>
      <Sider
        style={{
          minHeight: "100vh",
          overflow: "auto",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={collapsed ? 80 : 280}
      >
        <div
          style={{
            color: "#ADD8E6",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {collapsed ? "" : "Transportation Management System"}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems(role)}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
