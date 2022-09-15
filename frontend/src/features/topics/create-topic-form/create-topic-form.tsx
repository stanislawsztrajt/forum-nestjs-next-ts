import { Button, Loading } from 'features/ui';
import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import useCreateTopicForm from './use-create-topic-form';

interface Props {
  _id?: string;
}

const CreateTopicForm: FC<Props> = ({ _id }) => {
  const { initialValues, validationSchema, createTopic, error, loading } = useCreateTopicForm(_id);

  return (
    <div className="w-11/12 xl:w-1/2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => createTopic(values)}
      >
        {({ errors, touched }) => (
          <>
            {loading ? (
              <Loading />
            ) : (
              <Form>
                <div className="flex flex-col items-center w-full">
                  <h4 className="mb-2 text-2xl">Create topic form</h4>
                  <Field
                    type="text"
                    placeholder="Title, I have problem with..."
                    name="title"
                    maxLength={200}
                    required
                    className="input-underline"
                  />
                  {errors.title && touched.title ? (
                    <div className="mt-2 text-red-500">{errors.title}</div>
                  ) : null}
                  <Field
                    as="textarea"
                    type="text"
                    placeholder="Body, Helpful information for you is..."
                    name="body"
                    maxLength={3000}
                    required
                    className="h-48 p-10 mt-8 border-2 rounded-md input-underline max-h-96"
                  />
                  {errors.body && touched.body ? (
                    <div className="mt-2 text-red-500">{errors.body}</div>
                  ) : null}
                  {error ? <div className="mt-2 text-red-500">{error}</div> : null}
                  <Button bg text="Create Reply" className="w-64 mt-4" />
                </div>
              </Form>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreateTopicForm;
