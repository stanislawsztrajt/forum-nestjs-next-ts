import axios from 'axios'
import { Iuser } from 'features/users/types'
import React, { FC, useEffect, useState } from 'react'
import { Itopic } from '../types'

interface Props {
  topic: Itopic
}

const TopicItem: FC<Props> = ({ topic }) => {
  const [owner, setOwner] = useState<Iuser>()
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${topic.ownerId}`)
      setOwner(data)
    }

    fetchData()
  },[])

  return(
    <div className='w-11/12 p-6 mt-4 text-center border border-gray-800 rounded-lg shadow-lg cursor-pointer xl:w-1/2 hover:text-indigo-800 hover:border-indigo-600'>
      <div className='-mb-1'>
        {owner?.username}
      </div>
      <h3 className='text-2xl font-semibold'>
        {topic.title}
      </h3>
      <div className='-mt-1 font-light'>
        {topic.createdAt.substring(0,10)}
      </div>

      <p className='px-20 mt-2 text-lg'>
        {topic.body}
      </p>
    </div>
  )
}

export default TopicItem