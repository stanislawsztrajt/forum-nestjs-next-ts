import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import useSaveTopicButton from './use-save-topic-button';

interface Props {
  topicId: string
}

const SaveTopicButton: FC<Props> = ({ topicId }) => {
  const {
    saveTopic,
    removeSavedTopic,
    isSaved,
    savedTopicId
  } = useSaveTopicButton(topicId)

  return (
    <FontAwesomeIcon
      onClick={isSaved ? () => removeSavedTopic(savedTopicId) : () => saveTopic(topicId)}
      className={`
        p-2 text-xl duration-150
        ${isSaved ? 'text-red-600 hover:text-gray-600' : 'text-gray-600 duration-150 hover:text-red-600'}
      `}
      icon={faHeart}
    />
  );
};

export default SaveTopicButton;
