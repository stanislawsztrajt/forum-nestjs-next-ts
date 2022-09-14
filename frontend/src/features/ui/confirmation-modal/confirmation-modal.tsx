import React, { FC } from 'react';

interface Props {
  action: () => void;
  cancelAction: () => void;
}

const ConfirmationModal: FC<Props> = ({ action, cancelAction }) => {
  return (
    <div className="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black -left-2 bg-opacity-30">
      <div className="flex flex-col w-11/12 p-6 text-center bg-white rounded-md md:w-2/3 lg:w-1/2 xl:w-1/3 justify-evenly h-1/3 animate__animated animate__fadeInDown">
        <h2 className="text-3xl">
          Are you sure?
          <p className="text-lg font-light">
            Do you really want to delete? This process cannot be undone
          </p>
        </h2>

        <div className="flex flex-row justify-evenly">
          <button
            onClick={action}
            className="text-white bg-red-600 hover:bg-red-700 button-confirmation"
          >
            Yes, delete
          </button>
          <button className="button" onClick={cancelAction}>
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
