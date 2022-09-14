import React, { FC } from 'react';
import { Ireply } from 'features/replies/types';
import { IpublicUser } from 'features/users/types';
import { ActionsButtons, ConfirmationModal } from 'features/ui';
import useReplyItem from './use-reply-item';
import { user } from 'utils/constants/user';
import { checkIsUserIsAdmin } from 'utils/helpers';

interface Props {
  reply: Ireply;
  owner?: IpublicUser;
  index?: number;
}

const ReplyItem: FC<Props> = ({ reply, owner, index }) => {
  const { isDeleteModal, setIsDeleteModal, deleteReply } = useReplyItem();

  return (
    <>
      {isDeleteModal ? (
        <ConfirmationModal
          cancelAction={() => setIsDeleteModal(false)}
          action={() => deleteReply(reply._id)}
        />
      ) : null}
      <div
        className="w-11/12 p-6 mt-4 text-center border border-gray-800 rounded-lg shadow-lg xl:w-1/2"
        data-aos={`${index && index % 2 === 0 ? 'fade-left' : 'fade-right'}`}
      >
        <h3 className="absolute text-lg text-left">Reply</h3>
        <div className="text-2xl">{owner?.username}</div>
        <div className="font-light">{reply.createdAt.substring(0, 10)}</div>
        <p className="text-lg dont-break-out">{reply.body}</p>
        {
          reply.ownerId === user._id || checkIsUserIsAdmin(user)
          ? (
            <div className="flex flex-row justify-end w-full -mb-3">
              <ActionsButtons showModal={() => setIsDeleteModal(true)} />
            </div>
          ) : null
        }
      </div>
    </>
  );
};

export default ReplyItem;
