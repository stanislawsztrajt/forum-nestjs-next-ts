import React, { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import Image from 'next/image';
import UndrawContentCreator from 'assets/undraw/undraw_content_creator.svg';
import { Itopic } from 'features/topics/types';
import { TopicList, TopicsSearchInput } from 'features/topics';
import { Loading, Button } from 'features/ui';
import { Iresponse } from 'utils/types/api';
import { IpublicUser } from 'features/users/types';
import { getUsersFromOwnersIdsAsync, scrollToElementById } from 'utils/helpers';
import useIsLoggedIn from 'features/auth/login/use-is-logged-in';

interface Props {
  topicsData: Itopic[];
  topicsOwners: IpublicUser[];
}

const Home: NextPage<Props> = ({ topicsData, topicsOwners }: Props) => {
  const { isLoggedIn } = useIsLoggedIn();

  const [loading, setLoading] = useState<boolean>(false);
  const [topics, setTopics] = useState<Itopic[]>(topicsData);

  return (
    <main>
      <section className="flex justify-center mt-16 xl:mt-36">
        <div className="flex flex-col items-center w-3/4 xl:flex-row">
          <div className="w-11/12 text-center xl:text-left xl:w-1/2 animate__animated animate__fadeInLeft ">
            <h1 className="text-6xl xl:text-8xl">ForumAll</h1>
            <p className="mt-4 text-3xl xl:text-5xl">
              A meeting or medium where ideas and views on a topic can be exchanged and others can
              be helped. It&apos;s all on ForumAll
            </p>
            <div className="">
              <Button
                text="Check example topics"
                className="mt-10 ml-4"
                action={() => scrollToElementById('example-topics')}
              />
              <Button
                text={isLoggedIn ? 'Dadhboard' : 'Login'}
                className="mt-2 ml-4"
                href={isLoggedIn ? '/dahboard' : '/auth/login'}
                bg
              />
            </div>
          </div>
          <br />
          <Image
            loading="lazy"
            className="w-11/12 xl:w-1/2 animate__animated animate__fadeInRight"
            src={UndrawContentCreator}
            alt="Image about forum"
          />
        </div>
      </section>
      <section className="flex flex-col items-center mt-72">
        <h2 data-aos="fade-left" id="example-topics" className="mb-4 text-6xl">
          Example topics
        </h2>
        <div data-aos="fade-right">
          <TopicsSearchInput setLoading={setLoading} setTopics={setTopics} />
        </div>

        <div className="mt-12"></div>
        {loading ? <Loading /> : <TopicList topics={topics} owners={topicsOwners} />}
      </section>
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const topicsRes: Iresponse<Itopic[]> = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/topics/examples`
  );

  const topicsOwners = await getUsersFromOwnersIdsAsync(topicsRes.data);

  return {
    props: {
      topicsData: topicsRes.data,
      topicsOwners,
    },
  };
};
