import HomePage from "@/views/Home";
import { ImageResponse } from "BgImage";

const getData = async (): Promise<ImageResponse> => {
  const res = await fetch("http://127.0.0.1:3000/api/home", {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const result = await res.json();

  return result?.data;
};

export default async function Page() {
  const backgroundImage = await getData();

  return (
    <main className="flex flex-col gap-8">
      <HomePage backgroundImage={backgroundImage} />
    </main>
  );
}
