import { off, onValue, ref } from 'firebase/database';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userRef = ref(database, `/profiles/${authObj.uid}`);
        onValue(userRef, snap => {
          const { username, createdAt } = snap.val();
          const data = {
            username,
            createdAt,

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
        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      authUnsub();
      if (userRef) {
        off(userRef);
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