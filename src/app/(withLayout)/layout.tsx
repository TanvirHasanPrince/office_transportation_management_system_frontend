import Contents from "@/components/ui/Contents";
import Sidebar from "@/components/ui/Sidebar";
import { Layout } from "antd";
import { Button, ConfigProvider, Space } from "antd";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#29AB87",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#ADD8E6",
        },
      }}
    >
      <Layout hasSider>
        <Sidebar />
        <Contents> {children}</Contents>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
