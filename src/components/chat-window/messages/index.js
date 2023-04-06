import {
  equalTo,
  off,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';
import { useParams } from 'react-router';

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messageRef = query(
      ref(database, '/messages'),
      orderByChild('roomId'),
      equalTo(chatId)
    );
    onValue(messageRef, snap => {
      snap.forEach(msgSnap => {
        const data = transformToArrWithId(snap.val());

        setMessages(data);
      });
    });
    return () => {
      off(messageRef);
    };
  }, [chatId]);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No message yet</li>}
      {canShowMessages &&
        messages.map(msg => <MessageItem key={msg.id} message={msg} />)}
    </ul>
  );
};

export default Messages;
