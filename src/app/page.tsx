import { getDefaultList } from "@/utils/data/getDefaultList";
import HomePage from "@/views/Home";
import { HomeResponse } from "Api";

const getData = async (): Promise<HomeResponse> => {
  const res = await getDefaultList();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const result = await res.json();

  return result?.data;
};

export default async function Page() {
  const defaultData = await getData();

  return (
    <main className="flex flex-col gap-8">
      <HomePage {...defaultData} />
    </main>
  );
}
