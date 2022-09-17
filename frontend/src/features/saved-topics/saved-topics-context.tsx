import axios from 'axios';
import React, { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { authBearer, user } from 'utils/constants/user';
import { FCC } from 'utils/types';
import { Iresponse } from 'utils/types/api';
import { IsavedTopic } from './types';

interface IsavedTopicContext {
  savedTopics: IsavedTopic[],
  saveTopic: (topicId: string) => void
  removeSavedTopic: (savedTopicId: string) => void
}

const SavedTopics: Context<IsavedTopicContext> = createContext(
  {
    savedTopics: [
      {
        topicId: '',
        _id: '',
        ownerId: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    saveTopic: (topicId: string) => { console.log(topicId) },
    removeSavedTopic: (savedTopicId: string) => { console.log(savedTopicId) }
  }
);

export const useSavedTopics = () => useContext(SavedTopics);

interface Props {
  children: ReactNode;
}
export const SavedTopicsContext: FCC<Props> = ({ children }: Props) => {
  const [savedTopics, setSavedTopics] = useState<IsavedTopic[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data }: Iresponse<IsavedTopic[]> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/saved-topics/user/${user._id}`)
      setSavedTopics(data)
    }
    fetchData()
  }, [])

  const saveTopic = (topicId: string) => {
    const topic = {
      topicId,
      _id: String(Math.random()),
      ownerId: user._id,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setSavedTopics(prevState => [topic, ...prevState])
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/saved-topics`, { topicId }, authBearer)
  }

  const removeSavedTopic = (savedTopicId: string) => {
    const filteredSavedTopics = savedTopics.filter(savedTopic => savedTopic._id !== savedTopicId)
    setSavedTopics(filteredSavedTopics)
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/saved-topics/${savedTopicId}`, authBearer)
  }

  return (
    <SavedTopics.Provider
      value={{
        savedTopics,
        saveTopic,
        removeSavedTopic
      }}
    >
      {children}
    </SavedTopics.Provider>
  );
};
