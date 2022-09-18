import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import TopicsSearchInput from 'features/topics/topics-search-input';
import { Button } from 'features/ui';
import useIsLoggedIn from 'features/auth/login/use-is-logged-in';

const Header: FC = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <header className="flex flex-row flex-wrap items-center justify-around p-4 animate__animated animate__fadeInDown">
      <div className="flex flex-wrap items-center justify-center mb-4 font-medium text-gray-900 title-font md:mb-0">
        <Link href={'/'}>
          <FontAwesomeIcon
            className="p-2 text-white bg-indigo-500 rounded-full cursor-pointer w-7 h-7"
            icon={faUserAstronaut}
          />
        </Link>
        <Link href={'/'}>
          <span className="ml-3 text-xl cursor-pointer">ForumAll</span>
        </Link>

        <ul className="flex flex-row mt-2 ml-8 font-normal md:mt-0">
          <li className=" hover:text-indigo-600">
            <Link href="/">Home</Link>
          </li>
          <li className="ml-4 hover:text-indigo-600">
            <Link href="/create-topic">Create topic</Link>
          </li>
          {isLoggedIn ?
            <li className="ml-4 hover:text-indigo-600">
              <Link href="/saved-topics">Saved topics</Link>
            </li>
          : null}
        </ul>
      </div>
      

      <div className="flex flex-row flex-wrap justify-center gap-2 mt-2">
        <Button
          text={isLoggedIn ? 'Dashboard' : 'Login'}
          href={isLoggedIn ? '/dashboard' : '/auth/login'}
          bg={true}
        />
        <TopicsSearchInput isHeader={true} />
      </div>
    </header>
  );
};

export default Header;
