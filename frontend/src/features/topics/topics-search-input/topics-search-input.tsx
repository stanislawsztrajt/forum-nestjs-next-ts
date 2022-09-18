import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, FC} from 'react';
import { Itopic } from 'features/topics/types';
import useTopicsSearchInput from './use-topics-search-input';

interface Props {
  setTopics?: Dispatch<React.SetStateAction<Itopic[]>>;
  setLoading?: Dispatch<React.SetStateAction<boolean>>;
  isHeader?: boolean;
}

const TopicsSearchInput: FC<Props> = ({ setTopics, setLoading, isHeader }) => {
  const { searchTopics, setValue } = useTopicsSearchInput({ setTopics, setLoading, isHeader })

  return (
    <div className="flex flex-row">
      <FontAwesomeIcon
        className="p-4 ml-6 mr-1 text-gray-800 duration-100 border border-gray-800 rounded-full rounded-r-none cursor-pointer hover:text-indigo-600 hover:border-indigo-600"
        icon={faSearch}
        onClick={() => searchTopics('Enter')}
      />
      <input
        type="text"
        onKeyUp={(e) => searchTopics(e.code)}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        maxLength={500}
        className="px-6 pt-3 pb-3 duration-100 border border-gray-800 rounded-full rounded-l-none focus:outline-indigo-600"
      />
    </div>
  );
};

export default TopicsSearchInput;
