import axios from 'axios';
import { Itopic } from 'features/topics/types';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Iresponse } from 'utils/types/api';
import { TopicList } from 'features/topics';
import { getUsersFromOwnersIdsAsync } from 'utils/helpers';
import { IpublicUser } from 'features/users/types';

interface Props {
  topics: Itopic[];
  topicsOwners: IpublicUser[];
}

const SearchTopic: NextPage<Props> = ({ topics, topicsOwners }: Props) => {
  const router = useRouter();
  const { value } = router.query;

  return (
    <main>
      <h1 className="flex justify-center mt-16 text-5xl">
        Results for search&nbsp;
        <span className="text-indigo-600">{value?.slice(1)}</span>
      </h1>
      <div className="flex flex-col items-center mt-20">
        <TopicList topics={topics} owners={topicsOwners} />
      </div>
    </main>
  );
};

export default SearchTopic;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const value = params?.value as string;

  const { data }: Iresponse<Itopic[]> = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/topics/search-by-value`,
    { value: value.slice(1) }
  );

  const topicsOwners = await getUsersFromOwnersIdsAsync(data);

  return {
    props: {
      topics: data,
      topicsOwners,
    },
  };
};
