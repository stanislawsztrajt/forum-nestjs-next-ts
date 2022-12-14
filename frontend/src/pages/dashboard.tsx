import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReplyList } from 'features/replies';
import { Ireply } from 'features/replies/types';
import { TopicList } from 'features/topics';
import { Itopic } from 'features/topics/types';
import { Loading } from 'features/ui';
import { NextPage } from 'next';
import React from 'react';
import { user } from 'utils/constants/user';

const Dashboard: NextPage = () => {
  const userTopics = useQuery(['userTopics'], () =>
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/topics/user/${user?._id}`)
  );
  const userReplies = useQuery(['userReplies'], () =>
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/replies/user/${user?._id}`)
  );

  if (userTopics.isLoading || userReplies.isLoading) {
    return <Loading />;
  }

  if (userTopics.error || userReplies.error) {
    return <>Something went wrong</>;
  }

  const topics: Itopic[] = userTopics.data?.data;
  const replies: Ireply[] = userReplies.data?.data;

  return (
    <main className="flex flex-col gap-20 mt-12 lg:flex-row">
      <section className="w-full">
        <div className="flex flex-col items-center lg:items-end">
          <h2 className="text-5xl">Topics</h2>
          <TopicList topics={topics} owners={[user]} />
        </div>
      </section>
      <section className="w-full">
        <h2 className="text-5xl text-center lg:text-left">Replies</h2>
        <div className="flex flex-col items-center lg:items-start">
          <ReplyList replies={replies} owners={[user]} />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
