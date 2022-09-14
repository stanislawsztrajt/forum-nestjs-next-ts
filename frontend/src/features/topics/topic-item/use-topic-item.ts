import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { authBearer } from 'utils/constants/user';

const useTopicItem = () => {
  const router = useRouter();
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const deleteTopic = async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, authBearer);
    router.reload();
  };

  return {
    isDeleteModal,
    setIsDeleteModal,
    deleteTopic,
  };
};

export default useTopicItem;
