import axios from 'axios';
import { Itopic } from 'features/topics/types';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Iresponse } from 'utils/types/api';
import { IpublicUser } from 'features/users/types';
import { Ireply } from 'features/replies/types';
import { ReplyList, CreateReplyForm } from 'features/replies';
import { getUsersFromOwnersIdsAsync } from 'utils/helpers';

interface Props {
  topic: Itopic;
  owner: IpublicUser;
  replies: Ireply[];
  repliesOwners: IpublicUser[];
}

const Topic: NextPage<Props> = ({ topic, owner, replies, repliesOwners }: Props) => {
  return (
    <main>
      <section>
        <h1 className="mt-16 text-5xl font-medium text-center">
          <div className="-mb-1 text-3xl font-normal">{owner.username}</div>
          {topic.title}
        </h1>
        <div className="flex justify-center">
          <p className="w-11/12 mt-8 text-xl lg:w-2/3 xl:w-1/2">{topic.body}</p>
        </div>
      </section>

      <section className="flex flex-col items-center mt-16">
        <div className='w-full xl:w-1/2'>
          <CreateReplyForm topicId={topic._id} />
        </div>
      </section>

      <section className="flex flex-col items-center mt-20">
        <ReplyList replies={replies} owners={repliesOwners} />
      </section>
    </main>
  );
};

export default Topic;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const topicRes: Iresponse<Itopic> = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/topics/slug/${params?.slug}`
  );

  const ownerRes: Iresponse<IpublicUser> = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${topicRes.data.ownerId}`
  );

  const repliesRes: Iresponse<Ireply[]> = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/topics/${topicRes.data._id}/replies`
  );

  const repliesOwners: IpublicUser[] = await getUsersFromOwnersIdsAsync(repliesRes.data);

  return {
    props: {
      topic: topicRes.data,
      owner: ownerRes.data,
      replies: repliesRes.data,
      repliesOwners,
    },
  };
};
