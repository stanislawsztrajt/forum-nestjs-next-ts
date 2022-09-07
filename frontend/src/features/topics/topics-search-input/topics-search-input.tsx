import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, FC, useState } from 'react'
import { Itopic } from 'features/topics/types';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Iresponse } from 'utils/types/api';

interface Props {
  setTopics?: Dispatch<React.SetStateAction<Itopic[]>>
  setLoading?: Dispatch<React.SetStateAction<boolean>>
  isHeader?: boolean
}

const TopicsSearchInput: FC<Props> = ({ setTopics, setLoading, isHeader }) => {
  const router = useRouter()
  const [value, setValue] = useState<string>('')

  const handleEnter = async (code: string) => {
    if (code !== 'Enter') return
    if (isHeader) router.push(`/search-topic/-${value}`)
    if (!setLoading || !setTopics) return

    setLoading(true)
    const { data }: Iresponse<Itopic[]> = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/topics/search-by-value`,
      { value }
    )

    setTopics(data)
    setLoading(false)
  }
  
  return(
    <div className='flex flex-row'>
      <FontAwesomeIcon
        className="p-4 ml-6 mr-1 text-gray-800 duration-100 border border-gray-800 rounded-full rounded-r-none cursor-pointer hover:text-indigo-600 hover:border-indigo-600"
        icon={faSearch}
        onClick={() => handleEnter("Enter")}
      />
      <input
        type="text"
        onKeyUp={(e) => handleEnter(e.code)}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        maxLength={500}
        className="px-6 pt-3 pb-3 duration-100 border border-gray-800 rounded-full rounded-l-none focus:outline-indigo-600"
      />
    </div>
  )
}

export default TopicsSearchInput