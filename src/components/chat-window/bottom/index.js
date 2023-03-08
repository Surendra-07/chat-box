import { async } from '@firebase/util';
import { push, ref, set, update } from 'firebase/database';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';
function assembleMessage(profile, chatId, input) {
  const time = new Date();
  return {
    roomId: chatId,

    author: {
      name: profile.username,
      text: input,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: time,
  };
}

const ChatBottom = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();
  const { profile } = useProfile();

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim() === '') {
      return;
    }

    const datref = await ref(database, `messages/`);

    const messageId = push(datref, assembleMessage(profile, chatId, input)).key;
    console.log(messageId);

    const msgData = assembleMessage(profile, chatId, input);

    setIsLoading(true);
    try {
      await update(ref(database, `/rooms/${chatId}`), {
        lastMessage: msgData,
      });
      setInput('');
      setIsLoading(false);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSendClick();
    }
  };

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new message..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        ></Input>
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
