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
    <div 
      className='w-11/12 p-6 mt-4 text-center border border-gray-800 rounded-lg shadow-lg xl:w-1/2'
      data-aos={`${index && index % 2 === 0 ? 'fade-left' : 'fade-right'}`}
    >
      <h3 className='absolute text-lg text-left'>
        Reply
      </h3>
      <div className='text-2xl'>
        {owner?.username}
      </div>
      <div className='font-light'>
        {reply.createdAt.substring(0, 10)}
      </div>
      <p className='text-lg dont-break-out'>
        {reply.body}
      </p>
    </div>
  );
};

export default ReplyItem;
