import React, { useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router';
import {
  Button,
  Icon,
  Modal,
  Form,
  ControlLabel,
  FormControl,
  FormGroup,
  Schema,
} from 'rsuite';

import { useModalState } from '../../../misc/custom-hooks';

const { StringType } = Schema.Types;

const model = Schema.Model({
  title: StringType().isRequired('Title is required'),
  message: StringType().isRequired('Message body is required'),
});

const INITIAL_FORM = {
  title: '',
  message: '',
};

const SendFcmBtnModal = () => {
  const { chatId } = useParams();
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setIsLoading(true);
  };

  return (
    <>
      <Button appearance="primary" size="xs" onClick={open}>
        <Icon icon="podcast" /> Broadcast message
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Send notification to room users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl name="title" placeholder="Enter message title..." />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Message</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="message"
                placeholder="Enter notification message..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Publish message
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendFcmBtnModal;
