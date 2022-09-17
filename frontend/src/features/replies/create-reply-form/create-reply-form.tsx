import { Button, Loading } from 'features/ui';
import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import { Ireply } from '../types';
import useCreateReplyForm from './use-create-reply-form';

interface Props {
  topicId: string;
  reply?: Ireply;
}

const CreateReplyForm: FC<Props> = ({ topicId, reply }) => {
  const { initialValues, validationSchema, createReply, error, loading } = useCreateReplyForm(
    topicId,
    reply
  );

  if (loading) return <Loading />;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => createReply(values)}
    >
      {({ errors, touched }) => (
        <Form className="w-full">
          <div className="flex flex-col items-center w-full">
            <h4 className="mb-2 text-2xl">{reply ? 'Update' : 'Create'} reply form</h4>
            <Field
              as="textarea"
              type="text"
              placeholder="Helpful information for you is..."
              name="body"
              maxLength={3000}
              required
              className="h-48 p-10 border-2 rounded-md input-underline max-h-96"
            />
            {errors.body && touched.body ? (
              <div className="mt-2 text-red-500">{errors.body}</div>
            ) : null}
            {error ? <div className="mt-2 text-red-500">{error}</div> : null}
            <Button bg text={`${reply ? 'Update' : 'Create'} reply`} className="w-64 mt-4" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateReplyForm;
