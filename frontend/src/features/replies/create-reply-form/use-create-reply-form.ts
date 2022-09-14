import axios from 'axios';
import { IcreateReplyForm } from 'features/replies/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { authBearer } from 'utils/constants/user';
import { Ierror } from 'utils/types/api';
import * as Yup from 'yup';

const initialValues: IcreateReplyForm = {
  body: '',
};

const validationSchema = Yup.object({
  body: Yup.string()
    .max(3000, 'Body must be shorter than 3000 chars')
    .min(10, 'Body must be longer than 10 chars')
    .required('Required'),
});

const useCreateReplyForm = (topicId: string) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createReply = async (values: IcreateReplyForm) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/replies`,
        { ...values, topicId },
        authBearer
      );
      router.reload();
    } catch (err) {
      const { response } = err as Ierror;
      setError(response.data.message);
    }
    setLoading(false);
  };

  return { initialValues, validationSchema, createReply, error, loading };
};

export default useCreateReplyForm;
