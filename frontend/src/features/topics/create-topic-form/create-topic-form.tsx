import { Button, Loading } from 'features/ui';
import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import { Itopic } from '../types';
import useCreateTopicForm from './use-create-topic-form';

interface Props {
  topic?: Itopic;
}

const CreateTopicForm: FC<Props> = ({ topic }) => {
  const { initialValues, validationSchema, createTopic, error, loading } =
    useCreateTopicForm(topic);

  if (loading) return <Loading />;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => createTopic(values)}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="flex flex-col items-center w-full">
            <h4 className="mb-2 text-2xl">{topic ? 'Update' : 'Create'} topic form</h4>
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
            <Button bg text={`${topic ? 'Update' : 'Create'} topic`} className="w-64 mt-4" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTopicForm;
