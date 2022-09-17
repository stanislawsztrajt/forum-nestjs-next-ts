import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TopicList } from 'features/topics';
import { Itopic } from 'features/topics/types';
import { Loading } from 'features/ui';
import { IpublicUser } from 'features/users/types';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { user } from 'utils/constants/user';
import { getUsersFromOwnersIdsAsync } from 'utils/helpers';

const fetchSavedTopics = (): Promise<{data: Itopic[]}> => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/saved-topics/topics/user/${user._id}`)

const SavedTopics: NextPage = () => {
  const { data: topicsData, isLoading, isError } = useQuery(['getSavedTopics'], fetchSavedTopics)
  const [topicsOwners, setTopicsOwners] = useState<IpublicUser[]>()

  useEffect(() =>{
    if (!topicsData) return

    const fetchData = async () => {
      const owners = await getUsersFromOwnersIdsAsync(topicsData.data)
      setTopicsOwners(owners)
    }

    fetchData()
  }, [topicsData])

  if (isError) return <h2>Something went wrong</h2>
  if (isLoading || !topicsOwners) return <Loading />

  return (
    <main className='flex flex-col items-center mt-16'>
      <h1 className='text-5xl'>Your saved topics</h1>
      <TopicList topics={topicsData.data} owners={topicsOwners} />
    </main>
  );
};

export default SavedTopics;
