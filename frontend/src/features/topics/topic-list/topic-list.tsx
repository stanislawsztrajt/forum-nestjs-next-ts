import React, { FC } from 'react';
import { Itopic } from '../types';
import TopicItem from '../topic-item';
import { IpublicUser } from 'features/users/types';
import { SavedTopicsContext } from 'features/saved-topics/saved-topics-context';

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
  return (
    <>
      {
        topics.length > 0 ? (
          <SavedTopicsContext>
            {topicList}
          </SavedTopicsContext>
        ) : (
          <>
            No topics {':('}
          </>
        )
      }
    </>
  );
};

export default TopicList;
