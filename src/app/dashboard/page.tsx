import theme from "@/theme/themeConfig";
import DashBoardView from "@/views/DashBoardView";
import { ConfigProvider } from "antd";

const Page = async () => {
  return (
    <ConfigProvider theme={theme}>
      <DashBoardView />
    </ConfigProvider>
  );
};

export default Page;
