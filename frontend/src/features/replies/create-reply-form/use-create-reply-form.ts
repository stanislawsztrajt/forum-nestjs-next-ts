import axios from 'axios';
import { IcreateReplyForm, Ireply } from 'features/replies/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { authBearer } from 'utils/constants/user';
import { Ierror, Iresponse } from 'utils/types/api';
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

const useCreateReplyForm = (topicId: string, _id?: string) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!_id) return;

    const fetchData = async () => {
      const { data }: Iresponse<Ireply> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/replies/${_id}`
      );
      initialValues.body = data.body;
    };
    fetchData();
  }, []);

  const createReply = async (values: IcreateReplyForm) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/replies${_id ? `/${_id}` : ''}`,
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
