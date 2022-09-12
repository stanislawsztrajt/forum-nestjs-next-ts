import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import TopicsSearchInput from 'features/topics/topics-search-input';
import { Button } from 'features/ui';
import useIsLoggedIn from 'features/auth/login/use-is-logged-in';

const Header: FC = () => {
  const { isLoggedIn } = useIsLoggedIn()

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
          <Link href="/create-topic">Create topic</Link>
        </li>
      </ul>

      <div className="flex flex-row">
        <Button text={isLoggedIn ? 'Dadhboard' : 'Login'} href="/auth/login" bg={true} />
        <TopicsSearchInput isHeader={true} />
      </div>
    </header>
  );
};

export default Header;
