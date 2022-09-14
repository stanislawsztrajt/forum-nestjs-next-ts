import { CreateTopicForm } from 'features/topics';
import { NextPage } from 'next';
import React from 'react';

const CraeteTopic: NextPage = () => {
  return (
    <main className="flex justify-center mt-24 xl:mt-48">
      <CreateTopicForm />
    </main>
  );
};

export default CraeteTopic;
