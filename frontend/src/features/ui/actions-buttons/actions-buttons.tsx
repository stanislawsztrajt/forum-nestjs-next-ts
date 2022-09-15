import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {
  showDeleteModal: () => void;
  showUpdateModal: () => void;
}

const ActionsButtons: FC<Props> = ({ showDeleteModal, showUpdateModal }) => {
  return (
    <>
      <FontAwesomeIcon
        onClick={showDeleteModal}
        icon={faTrash}
        className="p-2 text-xl text-red-600 duration-100 cursor-pointer hover:text-red-700"
      />
      <FontAwesomeIcon
        onClick={showUpdateModal}
        icon={faEdit}
        className="p-2 text-xl text-blue-600 duration-100 cursor-pointer hover:text-blue-700"
      />
    </>
  );
};

export default ActionsButtons;
