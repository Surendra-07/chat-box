import { off, onDisconnect, onValue, query, ref, set } from 'firebase/database';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';

const d = new Date();
const isOfflineForDatabase = {
  state: 'offline',
  last_changed: d,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: d,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userStatusRef = ref(database, `/status/${authObj.uid}`);

        userRef = ref(database, `/profiles/${authObj.uid}`);
        onValue(userRef, snap => {
          const { username, createdAt, avatar } = snap.val();
          const data = {
            username,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });
      } else {
        if (userRef) {
          off(userRef);
        }
        if (userStatusRef) {
          off(userStatusRef);
        }
        setProfile(null);
        setIsLoading(false);
      }
    });
    //

    onValue(userStatusRef, snap => {
      if (snap.val() === false) {
        return;
      }
      query(
        userStatusRef,
        onDisconnect,
        set(isOfflineForDatabase).then(function () {
          query(userStatusRef, set(isOnlineForDatabase));
        })
      );
    });

    return () => {
      authUnsub();
      if (userRef) {
        off(userRef);
      }
      if (userStatusRef) {
        off(userStatusRef);
      }
    };
  }, []);
  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
