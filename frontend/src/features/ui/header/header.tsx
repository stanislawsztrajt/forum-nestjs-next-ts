import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import TopicsSearchInput from 'features/topics/topics-search-input';

const Header: FC = () => {
  return (
    <header className="flex flex-row flex-wrap items-center justify-around p-4 animate__animated animate__fadeInDown">
      <a href="/" className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
        <FontAwesomeIcon
          className="p-2 text-white bg-indigo-500 rounded-full w-7 h-7"
          icon={faUserAstronaut}
        />
        <span className="ml-3 text-xl">ForumAll</span>
      </a>

      <ul className="flex flex-row">
        <li className=" hover:text-indigo-600">
          <Link href="/">Home</Link>
        </li>
        <li className="ml-4 hover:text-indigo-600">
          <Link href="/about">About</Link>
        </li>
        <li className="ml-4 hover:text-indigo-600">
          <Link href="dashboard">Nothing</Link>
        </li>
      </ul>

      <div className="flex flex-row">
        <button className="px-10 pt-2 pb-1 font-normal text-white duration-100 bg-indigo-500 rounded-full hover:bg-indigo-600">
          Login
        </button>
        <TopicsSearchInput isHeader={true} />
      </div>
    </header>
  );
};

export default Header;
