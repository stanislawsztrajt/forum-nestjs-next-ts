import { IpublicUser } from 'features/users/types';
import Link from 'next/link';
import React, { FC } from 'react';
import { Itopic } from '../types';

interface Props {
  topic: Itopic;
  owner?: IpublicUser;
  index?: number;
}

const TopicItem: FC<Props> = ({ topic, owner, index }) => {
  return (
    <Link href={`/topics/${topic.slug}`}>
      <div
        data-aos={`${index && index % 2 === 0 ? 'fade-left' : 'fade-right'}`}
        className="w-11/12 p-6 mt-4 text-center border border-gray-800 rounded-lg shadow-lg cursor-pointer xl:w-1/2 hover:text-indigo-800 hover:border-indigo-600"
      >
        <h3 className='absolute text-lg text-left'>
          Topic
        </h3>
        <div className="-mb-1">{owner?.username}</div>
        <h4 className="text-2xl font-semibold">{topic.title}</h4>
        <div className="-mt-1 font-light">{topic.createdAt.substring(0, 10)}</div>

        <p className="px-20 mt-2 text-lg">{topic.body}</p>
      </div>
    </Link>
  );
};

export default TopicItem;
