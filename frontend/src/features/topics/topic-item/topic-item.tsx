import { ActionsButtons, ConfirmationModal } from 'features/ui';
import { IpublicUser } from 'features/users/types';
import Link from 'next/link';
import React, { FC } from 'react';
import { user } from 'utils/constants/user';
import { checkIsUserIsAdmin } from 'utils/helpers';
import { Itopic } from '../types';
import useTopicItem from './use-topic-item';

interface Props {
  topic: Itopic;
  owner?: IpublicUser;
  index?: number;
}

const TopicItem: FC<Props> = ({ topic, owner, index }) => {
  const { isDeleteModal, setIsDeleteModal, deleteTopic } = useTopicItem();

  return (
    <>
      {isDeleteModal ? (
        <ConfirmationModal
          cancelAction={() => setIsDeleteModal(false)}
          action={() => deleteTopic(topic._id)}
        />
      ) : null}

      <Link href={`/topics/${topic.slug}`}>
        <div
          data-aos={`${index && index % 2 === 0 ? 'fade-left' : 'fade-right'}`}
          className="w-11/12 p-6 mt-4 text-center border border-gray-800 rounded-lg shadow-lg cursor-pointer xl:w-1/2 hover:text-indigo-800 hover:border-indigo-600"
        >
          <h3 className="absolute text-lg text-left">Topic</h3>
          <div className="-mb-1">{owner?.username}</div>
          <h4 className="text-2xl font-semibold">{topic.title}</h4>
          <div className="-mt-1 font-light">{topic.createdAt.substring(0, 10)}</div>

          <p className="px-20 mt-2 text-lg">{topic.body}</p>
          <div className="z-10 flex flex-row justify-end w-full -mb-3">
            <Link href="">
              <div>
                {
                  topic.ownerId === user._id || checkIsUserIsAdmin(user)
                  ? (
                    <div className="flex flex-row justify-end w-full -mb-3">
                      <ActionsButtons showModal={() => setIsDeleteModal(true)} />
                    </div>
                  ) : null
                }
              </div>
            </Link>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TopicItem;
