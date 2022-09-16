import Link from 'next/link';
import React, { FC } from 'react';

import { IpublicUser, USERS_ROLES } from 'features/users/types';
import { Itopic } from '../types';

import { ActionsButtons, ConfirmationModal, Modal } from 'features/ui';

import useCheckUserRoles from 'utils/hooks/use-check-user-roles';
import useGetUser from 'utils/hooks/use-get-user';
import useTopicItem from './use-topic-item';
import { CreateTopicForm } from 'features/topics';

interface Props {
  topic: Itopic;
  owner?: IpublicUser;
  index?: number;
}

const TopicItem: FC<Props> = ({ topic, owner, index }) => {
  const { isDeleteModal, setIsDeleteModal, isUpdateModal, setIsUpdateModal, deleteTopic } =
    useTopicItem();
  const isUserIsAdmin = useCheckUserRoles([USERS_ROLES.ADMIN]);
  const user = useGetUser();

  return (
    <>
      {isDeleteModal ? (
        <Modal cancelAction={() => setIsDeleteModal(false)}>
          <ConfirmationModal action={() => deleteTopic(topic._id)} />
        </Modal>
      ) : null}

      {isUpdateModal ? (
        <Modal cancelAction={() => setIsUpdateModal(false)}>
          <CreateTopicForm topic={topic} />
        </Modal>
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
                {topic.ownerId === user._id || isUserIsAdmin ? (
                  <div className="flex flex-row justify-end w-full -mb-3">
                    <ActionsButtons
                      showDeleteModal={() => setIsDeleteModal(true)}
                      showUpdateModal={() => setIsUpdateModal(true)}
                    />
                  </div>
                ) : null}
              </div>
            </Link>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TopicItem;
