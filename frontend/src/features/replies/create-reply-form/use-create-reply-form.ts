import axios from 'axios';
import { IcreateReplyForm, Ireply } from 'features/replies/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { authBearer, jwt } from 'utils/constants/user';
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

const useCreateReplyForm = (topicId: string, reply?: Ireply) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (reply) {
    initialValues.body = reply.body;
  }

  const createReply = async (values: IcreateReplyForm) => {
    if (!jwt) return router.push('/auth/login')

    setLoading(true);
    try {
      if (reply) {
        // update reply
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/replies/${reply._id}`,
          { ...values, topicId },
          authBearer
        );
      } else {
        // update reply
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/replies`,
          { ...values, topicId },
          authBearer
        );
      }

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
