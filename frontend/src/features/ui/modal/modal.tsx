import React, { ReactNode } from 'react';
import type { FCC } from 'utils/types/index';

interface Props {
  children: ReactNode;
  cancelAction: () => void;
}

const Modal: FCC<Props> = ({ children, cancelAction }: Props) => {
  return (
    <div className="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black -left-2 bg-opacity-30">
      <div className="flex flex-col w-11/12 p-20 text-center bg-white rounded-md md:w-2/3 lg:w-1/2 xl:w-1/3 justify-evenly animate__animated animate__fadeInDown">
        {children}
        <div>
          <button className="mt-4 button" onClick={cancelAction}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
