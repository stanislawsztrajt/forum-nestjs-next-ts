import React, { FC } from 'react';
import { ReplyItem } from 'features/replies';
import { Ireply } from '../types';
import { IpublicUser } from 'features/users/types';

interface Props {
  replies: Ireply[];
  owners: IpublicUser[];
}

const ReplyList: FC<Props> = ({ replies, owners }) => {
  const replyList = replies.map((reply, index) => (
    <ReplyItem
      key={reply._id}
      reply={reply}
      index={index}
      owner={owners.find((owner) => owner._id === reply.ownerId)}
    />
  ));
  return <>{replies.length > 0 ? <>{replyList}</> : <>No replies results {':('}</>}</>;
};

export default ReplyList;
