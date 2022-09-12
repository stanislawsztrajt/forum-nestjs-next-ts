import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { authBearer } from "utils/constants/user";
import { Ierror } from "utils/types/api";
import * as Yup from 'yup'
import { IcraeteTopicForm } from "../types";


const initialValues: IcraeteTopicForm = {
  title: '',
  body: '',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .max(200, 'Body must be shorter than 200 chars')
    .min(10, 'Body must be longer than 10 chars')
    .required('Required'),
  body: Yup.string()
    .max(3000, 'Body must be shorter than 3000 chars')
    .min(10, 'Body must be longer than 10 chars')
    .required('Required'),
});

const useCreateReplyForm = () => {
  const router = useRouter()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createReply = async (values: IcraeteTopicForm) => {
    setLoading(true)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/topics`, values, authBearer)
      router.push('/dashboard')
    } catch (err) {
      const { response } = err as Ierror;
      setError(response.data.message)
    }
    setLoading(false)
  }
  
  return { initialValues, validationSchema, createReply, error, loading }
}

export default useCreateReplyForm