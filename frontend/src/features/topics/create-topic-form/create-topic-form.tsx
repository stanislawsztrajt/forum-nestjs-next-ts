import { Button, Loading } from 'features/ui';
import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import useCreateTopicForm from './use-create-topic-form';

const CreateTopicForm: FC = () => {
  const { initialValues, validationSchema, createReply, error, loading } = useCreateTopicForm();

  return (
    <div className='w-11/12 xl:w-1/2'>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => createReply(values)}>
        {({ errors, touched }) => (
          <>
            {loading ? (
              <Loading />
            ) : (
              <Form>
                <div className='w-full flex flex-col items-center'>
                  <h4 className='text-2xl mb-2'>Create topic form</h4>
                  <Field
                    type="text"
                    placeholder="Title, I have problem with..."
                    name="title"
                    maxLength={200}
                    required
                    className="input-underline"
                  />
                  {errors.title && touched.title ? <div className='text-red-500 mt-2'>{errors.title}</div> : null }
                  <Field
                    as="textarea"
                    type="text"
                    placeholder="Body, Helpful information for you is..."
                    name="body"
                    maxLength={3000}
                    required
                    className="input-underline h-48 border-2 rounded-md max-h-96 p-10 mt-8"
                  />
                  {errors.body && touched.body ? <div className='text-red-500 mt-2'>{errors.body}</div> : null }
                  {error ? <div className='text-red-500 mt-2'>{error}</div> : null }
                  <Button bg text='Create Reply' className='w-64 mt-4'/>
                </div>
              </Form>
            )}
          </>
        )}
      </Formik>
    </div>
  )
}

export default CreateTopicForm;