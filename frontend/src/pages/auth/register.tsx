import Image from 'next/image';
import React from 'react';
import UndrawCreate from 'assets/undraw/undraw_create.svg';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import useRegister from 'features/auth/register/use-register';
import { Loading } from 'features/ui';
import { NextPage } from 'next';

const Register: NextPage = () => {
  const { initialValues, validationSchema, login, error, loading } = useRegister();

  return (
    <main className="flex justify-center mt-36">
      <div className="flex flex-col items-center justify-center w-11/12 gap-20 xl:w-4/6 xl:flex-row">
        <section className="w-11/12 lg:w-2/3 xl:w-1/2 animate__animated animate__fadeInLeft">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({ errors, touched }) => (
              <>
                {loading ? (
                  <Loading />
                ) : (
                  <Form>
                    <h1 className="text-4xl">Register to ForumAll</h1>
                    <h2 className="mt-2 font-light text-gray-400">
                      A meeting or medium where ideas and views on a topic can be exchanged and
                      others can be helped. It&apos;s all on ForumAll
                    </h2>

                    <div className="flex flex-col mt-12">
                      <Field
                        type="username"
                        placeholder="Username"
                        name="username"
                        minLength={4}
                        maxLength={50}
                        required
                        className="input-underline"
                      />
                      {errors.username && touched.username ? (
                        <div className="text-red-500">{errors.username}</div>
                      ) : null}
                      <Field
                        type="email"
                        placeholder="Email"
                        name="email"
                        minLength={4}
                        maxLength={50}
                        required
                        className="mt-8 input-underline"
                      />
                      {errors.email && touched.email ? (
                        <div className="text-red-500">{errors.email}</div>
                      ) : null}
                      <Field
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength={4}
                        maxLength={50}
                        required
                        className="mt-8 input-underline"
                      />
                      {errors.password && touched.password ? (
                        <div className="text-red-500">{errors.password}</div>
                      ) : null}
                      <Field
                        type="password"
                        placeholder="Repeat password"
                        name="repeatedPassword"
                        minLength={4}
                        maxLength={50}
                        required
                        className="mt-8 input-underline"
                      />
                      {errors.repeatedPassword && touched.repeatedPassword ? (
                        <div className="text-red-500">{errors.repeatedPassword}</div>
                      ) : null}
                      <div className="mt-1 text-red-500">{error}</div>
                    </div>

                    <div className="mt-6">
                      <Link href={'/auth/register'}>
                        <span className="text-lg underline duration-100 cursor-pointer hover:text-indigo-600">
                          Login
                        </span>
                      </Link>
                    </div>

                    <button
                      className="w-full py-5 mt-8 text-xl text-white duration-100 bg-indigo-500 rounded-md hover:bg-indigo-600"
                      type="submit"
                    >
                      Register
                    </button>
                  </Form>
                )}
              </>
            )}
          </Formik>
        </section>
        <Image
          className="w-11/12 lg:w-2/3 xl:w-1/2 animate__animated animate__fadeInRight"
          src={UndrawCreate}
        />
      </div>
    </main>
  );
};

export default Register;
