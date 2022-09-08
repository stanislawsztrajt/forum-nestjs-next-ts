import React, { FC } from 'react';
import { Ireply } from 'features/replies/types';
import { IpublicUser } from 'features/users/types';

interface Props {
  reply: Ireply;
  owner?: IpublicUser;
  index?: number;
}

const ReplyItem: FC<Props> = ({ reply, owner, index }) => {
  return (
    <div data-aos={`${index && index % 2 === 0 ? 'fade-left' : 'fade-right'}`}>
      {reply.body}
      {owner?.username}
      {reply.createdAt.substring(0, 10)}
    </div>
  );
};

export default ReplyItem;
