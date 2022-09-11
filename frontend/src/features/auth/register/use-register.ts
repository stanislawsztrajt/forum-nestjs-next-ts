import { IregisterForm } from '../types';
import * as Yup from 'yup';
import axios from 'axios';
import { Ierror } from 'utils/types/api';
import { useState } from 'react';
import { useRouter } from 'next/router';

const initialValues: IregisterForm = {
  username: '',
  email: '',
  password: '',
  repeatedPassword: '',
};

const validationSchema = Yup.object({
  username: Yup.string()
    .max(50, 'Username must be shorter than 50 chars')
    .min(4, 'Username must be longer than 4 chars')
    .required('Required'),
  email: Yup.string()
    .max(50, 'Email must be shorter than 50 chars')
    .min(4, 'Email must be longer than 4 chars')
    .email('It must be an email')
    .required('Required'),
  password: Yup.string()
    .max(50, 'Password must be shorter than 50 chars')
    .min(4, 'Password must be longer than 4 chars')
    .required('Required'),
  repeatedPassword: Yup.string()
    .max(50, 'Repeated password must be shorter than 50 chars')
    .min(4, 'Repeated password must be longer than 4 chars')
    .oneOf([Yup.ref('password'), null], 'Does not match with password!')
    .required('Required'),
});

const useLogin = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (values: IregisterForm) => {
    console.log(values);
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, values);

      router.push('/auth/login');
    } catch (err) {
      const { response } = err as Ierror;
      setError(response.data.message);
    }
    setLoading(false);
  };

  return {
    validationSchema,
    initialValues,
    login,
    error,
    loading,
  };
};

export default useLogin;
