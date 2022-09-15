import { Button, Loading } from 'features/ui';
import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import useCreateReplyForm from './use-create-reply-form';

interface Props {
  topicId: string;
  _id?: string;
}

const CreateReplyForm: FC<Props> = ({ topicId, _id }) => {
  const { initialValues, validationSchema, createReply, error, loading } = useCreateReplyForm(
    topicId,
    _id
  );

  return (
    <div className="w-11/12 xl:w-1/2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => createReply(values)}
      >
        {({ errors, touched }) => (
          <>
            {loading ? (
              <Loading />
            ) : (
              <Form>
                <div className="flex flex-col items-center w-full">
                  <h4 className="mb-2 text-2xl">Reply form</h4>
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

export default CreateReplyForm;
