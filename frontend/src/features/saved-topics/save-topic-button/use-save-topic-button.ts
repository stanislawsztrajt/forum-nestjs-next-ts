import { useEffect, useState } from "react";
import { useSavedTopics } from "../saved-topics-context";

const useSaveTopicButton = (topicId: string) => {
  const { saveTopic, removeSavedTopic, savedTopics } = useSavedTopics()
  const [isSaved, setIsSaved] = useState(false)
  const [savedTopicId, setSavedTopicId] = useState('')

  useEffect(() => {
    setIsSaved(savedTopics.some(savedTopic => {
      if (savedTopic.topicId === topicId) {
        setSavedTopicId(savedTopic._id)
        return true
      }
    }))
  }, [savedTopics])

  return {
    saveTopic,
    removeSavedTopic,
    isSaved,
    savedTopicId
  };
};

export default useSaveTopicButton;
