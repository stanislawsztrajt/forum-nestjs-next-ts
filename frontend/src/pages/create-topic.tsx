import { CreateTopicForm } from 'features/topics';
import { NextPage } from 'next';
import React from 'react';

const CraeteTopic: NextPage = () => {
  return (
    <main className="flex justify-center mt-24 xl:mt-48">
      <div className="w-11/12 xl:w-1/2">
        <CreateTopicForm />
      </div>
    </main>
  );
};

export default CraeteTopic;
