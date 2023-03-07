import { push, ref } from 'firebase/database';
import React, { useCallback, useRef } from 'react';
import { useState } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import { useModalState } from '../misc/custom-hooks';
import { database } from '../misc/firebase';

const INITIAL_FORM = {
  name: '',
  description: '',
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const { StringType } = Schema.Types;
  const formRef = useRef();
  const model = Schema.Model({
    name: StringType().isRequired('chat name is required'),
    description: StringType().isRequired('Description is required'),
  });
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);
  const a = new Date();

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setIsLoading(true);

    const newRoomdata = {
      ...formValue,
      createdAt: `${a}`,
    };

    try {
      const datref = await ref(database, `rooms/`);
      push(datref, newRoomdata);
      Alert.info(`${formValue.name} has been created`, 4000);
      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };
  return (
    <div className="mt-2">
      <Button block color="green" onClick={open}>
        <Icon icon="creative"> Create new Chat room</Icon>
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat room</Modal.Title>
        </Modal.Header>

        <ModalBody>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room name</ControlLabel>
              <FormControl
                name="name"
                placeholder="Enter chat room"
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter room decription..."
              ></FormControl>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
