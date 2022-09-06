import React, { useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import Image from 'next/image'
import UndrawContentCreator from 'assets/undraw/undraw_content_creator.svg';
import TopicsSearchInput from 'features/topics/topics-search-input';
import { Itopic } from 'features/topics/types';
import TopicList from 'features/topics/topic-list';
import { Loading, Button } from 'features/ui';

interface Props {
  topicsData: Itopic[]
}

const Home: NextPage<Props> = ({ topicsData }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [topics, setTopics] = useState<Itopic[]>(topicsData)

  return (
    <div>
      <div className='flex justify-center mt-16 xl:mt-36'>
        <div className='flex flex-col items-center w-3/4 xl:flex-row'>
          <div className='w-11/12 text-center xl:text-left xl:w-1/2 animate__animated animate__fadeInLeft '>
            <h1 className='text-6xl xl:text-8xl'>
              ForumAll
            </h1>
            <p className='mt-4 text-3xl xl:text-5xl'>
              A meeting or medium where ideas and views on a topic can be exchanged and others can be helped.
              It&apos;s all on ForumAll
            </p>
            <div className=''>
              <Button text='Check example topics' className='mt-10' href='/auth/login' />
              <Button text='Login' className='mt-2 ml-4' bg={true} />
            </div>
          </div>
          <br />
          <Image className='w-11/12 xl:w-1/2 animate__animated animate__fadeInRight' src={UndrawContentCreator}/>
        </div>
      </div>
      <div className='flex flex-col items-center mt-64'>
        <h2 className='mb-4 text-6xl'>Example topics</h2>
        <TopicsSearchInput setLoading={setLoading} setTopics={setTopics} />
        <div className='mt-12'></div>
        { loading ? (
          <Loading />
        ) : (
          <>
          { topics.length > 0 ? (
            <TopicList topics={topics} />
          ) : (
            <>No results {':('}</>
          ) }
          </>
        ) }
        
      </div>
    </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/topics/examples`)

  return {
    props: {
      topicsData: data
    }
  };
};