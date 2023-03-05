import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useState, useRef } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import { useModalState } from '../../misc/custom-hooks';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import { getDownloadURL, ref } from 'firebase/storage';
import { uploadBytes } from 'firebase/storage';
import { ref as sref, set, update } from 'firebase/database';
const AvatarUploadBtn = () => {
  const acceptedFilesTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
  const isValidFile = file => acceptedFilesTypes.includes(file.type);
  const { isOpen, open, close } = useModalState();

  const [img, setImg] = useState(null);

  const [url, setUrl] = useState(null);
  const AvatarEditorRef = useRef();
  const { profile } = useProfile();
  const [isLoading, setLoading] = useState(false);
  const fileInputTypes = '.png, .jpeg, .jpg';

  const getBlob = canvas => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('File process Error'));
        }
      });
    });
  };

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

  const onUploadClick = async () => {
    const canvas = AvatarEditorRef.current.getImageScaledToCanvas();
    setLoading(true);
    try {
      const blob = await getBlob(canvas);

      const storageref = ref(storage, `/profile/${profile.uid}/avatar`);

      uploadBytes(storageref, blob).then(snapshot => {
        getDownloadURL(storageref).then(url => {
          setUrl(url);
          console.log(url);
        });
      });

      update(sref(database, `/profiles/${profile.uid}`), {
        avatar: url,
      });

      setLoading(false);
      Alert.info('Avatar has been uploaded');
    } catch (err) {
      Alert.error(err.message, 9000);
      setLoading(false);
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
                  ref={AvatarEditorRef}
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
            <Button block appearance="ghost" onClick={onUploadClick}>
              uplaod new avatar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
