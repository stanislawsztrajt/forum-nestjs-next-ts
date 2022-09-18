import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, useState } from "react";
import { Iresponse } from 'utils/types/api';
import { Itopic } from "../types";

interface Props {
  setTopics?: Dispatch<React.SetStateAction<Itopic[]>>;
  setLoading?: Dispatch<React.SetStateAction<boolean>>;
  isHeader?: boolean;
}

const useTopicsSearchInput = ({ setTopics, setLoading, isHeader }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');

  const searchTopics = async (code: string) => {
    if (code !== 'Enter') return;
    if (isHeader) router.push(`/search-topic/-${value}`);
    if (!setLoading || !setTopics) return;

    setLoading(true);
    const { data }: Iresponse<Itopic[]> = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/topics/search-by-value`,
      { value }
    );

    setTopics(data);
    setLoading(false);
  };
  return {
    setValue,
    searchTopics
  };
};

export default useTopicsSearchInput;
