import React, { FC } from 'react';

import { Ireply } from 'features/replies/types';
import { IpublicUser, USERS_ROLES } from 'features/users/types';
import { ActionsButtons, ConfirmationModal, Modal } from 'features/ui';

import useCheckUserRoles from 'utils/hooks/use-check-user-roles';
import useGetUser from 'utils/hooks/use-get-user';
import useReplyItem from './use-reply-item';
import CreateReplyForm from '../create-reply-form';

interface Props {
  reply: Ireply;
  owner?: IpublicUser;
  index?: number;
}

const ReplyItem: FC<Props> = ({ reply, owner, index }) => {
  const { isDeleteModal, setIsDeleteModal, isUpdateModal, setIsUpdateModal, deleteReply } =
    useReplyItem();
  const isUserIsAdmin = useCheckUserRoles([USERS_ROLES.ADMIN]);
  const user = useGetUser();

  return (
    <>
      {isDeleteModal ? (
        <Modal cancelAction={() => setIsDeleteModal(false)}>
          <ConfirmationModal action={() => deleteReply(reply._id)} />
        </Modal>
      ) : null}
      {isUpdateModal ? (
        <Modal cancelAction={() => setIsUpdateModal(false)}>
          <CreateReplyForm topicId={reply.topicId} reply={reply} />
        </Modal>
      ) : null}

      <div
        className="w-11/12 p-6 mt-4 text-center border border-gray-800 rounded-lg shadow-lg xl:w-1/2"
        data-aos={`${index && index % 2 === 0 ? 'fade-left' : 'fade-right'}`}
      >
        <h3 className="absolute text-lg text-left">Reply</h3>
        <div className="text-2xl">{owner?.username}</div>
        <div className="font-light">{reply.createdAt.substring(0, 10)}</div>
        <p className="text-lg dont-break-out">{reply.body}</p>
        {reply.ownerId === user._id || isUserIsAdmin ? (
          <div className="flex flex-row justify-end w-full -mb-3">
            <ActionsButtons
              showDeleteModal={() => setIsDeleteModal(true)}
              showUpdateModal={() => setIsUpdateModal(true)}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ReplyItem;
