import React, { FC } from 'react'
import { Itopic } from '../types'
import TopicItem from '../topic-item'

interface Props {
  topics: Itopic[]
}

const TopicList: FC<Props> = ({ topics }) => {
  const topicList = topics.map(topic => <TopicItem key={topic._id} topic={topic}/>)
  return <>{ topicList }</>
}

export default TopicList
  