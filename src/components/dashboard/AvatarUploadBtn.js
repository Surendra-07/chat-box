import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useState } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import { useModalState } from '../../misc/custom-hooks';
const AvatarUploadBtn = () => {
  const acceptedFilesTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
  const isValidFile = file => acceptedFilesTypes.includes(file.type);
  const { isOpen, open, close } = useModalState();

  const [img, setImg] = useState(null);
  const fileInputTypes = '.png, .jpeg, .jpg';

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;
    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`wrong file type ${file.type}`, 4000);
      }
    }
  };
  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>
        <Modal show={isOpen} onHide={close}>
          <ModalHeader>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center align-item-center h-100">
              {' '}
              {img && (
                <AvatarEditor
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button block appearance="ghost">
              uplaod new avatar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
