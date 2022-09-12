import { CreateTopicForm } from 'features/topics';
import React, { FC } from 'react';

const CraeteTopic: FC = () => {
  return (
    <main className='flex justify-center mt-24 xl:mt-48'>
      <CreateTopicForm />
    </main>
  )
}

export default CraeteTopic;