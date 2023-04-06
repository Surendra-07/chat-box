import { equalTo, onValue, query, ref, update } from 'firebase/database';
import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';
const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  const onSave = async newData => {
    const userNickNameRef = ref(database, `/profiles/${profile.uid}`);
    try {
      if (newData !== '') {
        update(userNickNameRef, {
          username: newData,
        });

        const dref = query(ref(database, '/messages'));
        onValue(dref, snap => {
          snap.forEach(msgSnap => {
            const d = ref(database, `/messages/${msgSnap.key}/author`);
            update(d, {
              name: newData,
            });
          });
        });

        const drf = query(ref(database, '/rooms'));
        onValue(drf, snap => {
          snap.forEach(msgSnap => {
            const d = ref(database, `/rooms/${msgSnap.key}/lastMessage/author`);
            update(d, {
              name: newData,
            });
          });
        });

        Alert.info('User name has been updated', 4000);
      }
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.username}</h3>
        <ProviderBlock />
        <Divider />

        <EditableInput
          initialvalue={profile.username}
          onSave={onSave}
          name="nickname"
          placeholder="write your value"
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
