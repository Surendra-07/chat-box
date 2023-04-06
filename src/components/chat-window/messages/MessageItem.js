import React from 'react';
import ProfileAvatar from '../../ProfileAvatar';
import TimeAgo from 'timeago-react';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
const MessageItem = ({ message }) => {
  const { author } = message;

  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1"></div>
      <ProfileAvatar
        src={author.avatar}
        name={author.name}
        className="m1-1"
        size="xs"
      />

      <ProfileInfoBtnModal
        profile={author}
        appearance="link"
        className="p-0 ml-1 text-black"
      ></ProfileInfoBtnModal>
      <TimeAgo
        datetime={author.createdAt}
        locale="en"
        className="font-normal text-black-45 ml-2"
      />
      <div>
        <span className="word-breal-all">{author.text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
