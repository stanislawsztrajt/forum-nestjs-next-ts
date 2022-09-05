import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Header: FC = () => {
  return (
    <header className='flex flex-row items-center justify-around p-4'>
      <a href='/' className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
        <FontAwesomeIcon className='p-2 text-white bg-indigo-500 rounded-full w-7 h-7' icon={faUserAstronaut} />
        <span className="ml-3 text-xl">ForumAll</span>
      </a>
      
      <ul className='flex flex-row'>
        <li className=' hover:text-indigo-600'>
          <Link href="/">
            Home
          </Link>
        </li>
        <li className='ml-4 hover:text-indigo-600'>
          <Link href='/auth/login'>
            Login
          </Link>
        </li>
        <li className='ml-4 hover:text-indigo-600'>
          <Link href='dashboard'>
            Dadhboard
          </Link>
        </li>
      </ul>
      
      <div className='flex flex-row'>
        <button className='px-10 pt-2 pb-1 font-normal text-white duration-100 bg-indigo-500 rounded-full hover:bg-indigo-600'>
          Login
        </button>
        <FontAwesomeIcon className='p-4 ml-6 mr-1 text-gray-800 duration-100 border border-gray-800 rounded-full rounded-r-none cursor-pointer hover:text-indigo-600 hover:border-indigo-600' icon={faSearch} />
        <div>
          <input type="text" placeholder='Search' className='px-6 pt-3 pb-3 duration-100 border border-gray-800 rounded-full rounded-l-none focus:outline-indigo-600'/>
        </div>
      </div>
    </header>
  )
}

export default Header;