import { redirect } from "next/navigation";
import { getLoginStatus } from "@/services/fetchInitialProps/login/getLoginStatus";
import DashBoardView from "@/views/DashBoardView";

const Page = async (props) => {
  // const response = await getLoginStatus("123456");
  // if (response.code === "401") redirect("/login");

  return <DashBoardView />;
};

export default Page;
