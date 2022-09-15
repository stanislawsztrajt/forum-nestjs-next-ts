import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { authBearer } from 'utils/constants/user';

const useReplyItem = () => {
  const router = useRouter();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);

  const deleteReply = async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/replies/${id}`, authBearer);
    router.reload();
  };

  return {
    isDeleteModal,
    setIsDeleteModal,
    isUpdateModal,
    setIsUpdateModal,
    deleteReply,
  };
};

export default useReplyItem;
