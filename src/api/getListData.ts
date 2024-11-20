import { useQuery } from "@tanstack/react-query";
import mockJson from "./mock.json";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export type DeletedListItem = Omit<ListItem, "description">;

export const useGetListData = () => {
  const query = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      try {
        await sleep(1000);

        if (getRandom() > 85) {
          console.error("An unexpected error occurred!");
          throw new Error("👀 Unexpected error while fetching the list.");
        }

        const mockData = mockJson as Omit<ListItem, "isVisible">[];

        return shuffle(mockData).map((item) => {
          return { ...item, isVisible: getRandom() > 50 ? true : false };
        });
      } catch (error) {
        console.error("Error in useGetListData queryFn:", error);
        alert("An error occurred while fetching the list. Please try again later.");
        throw error;
      }
    },
    retry: false, 
    refetchOnWindowFocus: false,
  });
  return query;
};

const getRandom = () => Math.floor(Math.random() * 100);

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = <T extends any[]>(array: T): T => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
