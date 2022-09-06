import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="text-gray-600 body-font mt-96">
      <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
            <FontAwesomeIcon
              className="w-10 h-10 p-2 text-white bg-indigo-500 rounded-full"
              icon={faUserAstronaut}
            />
            <span className="ml-3 text-xl">ForumAll</span>
          </a>
        </div>
        <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 title-font">
              LINKS
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Home</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">About</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Login</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Dashboard</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
