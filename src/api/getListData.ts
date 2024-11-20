import { useQuery } from "@tanstack/react-query";
import mockJson from "./mock.json";
import { useListStore } from "../store";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export type DeletedListItem = Omit<ListItem, "description">;

export const useGetListData = () => {
  const setLoading = useListStore((state) => state.setLoading);
  const setError = useListStore((state) => state.setError);

  const query = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      setLoading(true);
      setError(false);
      try {
        await sleep(1000);

        if (getRandom() > 85) {
          throw new Error("👀 Unexpected error while fetching the list.");
        }

        const mockData = mockJson as Omit<ListItem, "isVisible">[];

        return shuffle(mockData).map((item) => ({
          ...item,
          isVisible: getRandom() > 50,
        }));
      } catch (error) {
        setError(true);
        throw error;
      } finally {
        setLoading(false);
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
