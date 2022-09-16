import React, { FC } from 'react';

interface Props {
  action: () => void;
}

const ConfirmationModal: FC<Props> = ({ action }) => {
  return (
    <>
      <h2 className="text-3xl">
        Are you sure?
        <p className="text-lg font-light">
          Do you really want to delete? This process cannot be undone
        </p>
      </h2>

      <div className="flex flex-row mt-6 justify-evenly">
        <button
          onClick={action}
          className="text-white bg-red-600 hover:bg-red-700 button-confirmation"
        >
          Yes, delete
        </button>
      </div>
    </>
  );
};

export default ConfirmationModal;
