import { PostPageProps } from "Post";
import { FC } from "react";
import type { Metadata } from "next";
import { getDefaultPostData } from "@/data-fetching/post/getDefaultData";
import { getDefaultHomeData } from "@/data-fetching/home/getDefaultData";
import PostView from "@/views/PostView";

export const generateMetadata = async (props: {
  params: {
    slug: string;
  };
}): Promise<Metadata> => {
  const { params } = props;
  const { slug } = params || { slug: "" };
  const defaultPostData = await getDefaultPostData(slug);

  return {
    title: defaultPostData?.title || "",
  };
};

const Page: FC<PostPageProps> = async ({ params }) => {
  const { slug } = params || { slug: "" };
  const defaultData = await getDefaultHomeData();

  return (
    <main>
      <PostView defaultData={defaultData}>{slug}</PostView>
    </main>
  );
};

export default Page;