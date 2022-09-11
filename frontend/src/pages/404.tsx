import Image from 'next/image';
import React, { FC } from 'react';
import UndrawNotFound from 'assets/undraw/undraw_page_not_found.svg';

const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-36">
      <h1 className="text-5xl">Page not found</h1>
      <Image className="mt-2 animate__animated animate__heartBeat" src={UndrawNotFound} />
    </div>
  );
};

export default NotFound;
