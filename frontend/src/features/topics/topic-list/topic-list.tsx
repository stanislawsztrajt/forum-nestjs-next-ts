import React, { FC } from 'react';
import { Itopic } from '../types';
import TopicItem from '../topic-item';
import { IpublicUser } from 'features/users/types';

interface Props {
  topics: Itopic[];
  owners: IpublicUser[];
}

const TopicList: FC<Props> = ({ topics, owners }) => {
  const topicList = topics.map((topic, index) => (
    <TopicItem
      key={topic._id}
      topic={topic}
      index={index}
      owner={owners.find((owner) => owner._id === topic.ownerId)}
    />
  ));
  return <>{topics.length > 0 ? <>{topicList}</> : <>No topics {':('}</>}</>;
};

export default TopicList;
