import { children } from 'react';
import React, { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { off, onValue, ref } from 'firebase/database';
import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helpers';
import { useContext } from 'react';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);
  useEffect(() => {
    const roomListRef = ref(database, 'rooms');
    onValue(roomListRef, snap => {
      const data = transformToArrWithId(snap.val());

      setRooms(data);
    });
    return () => {
      off(roomListRef);
    };
  }, []);
  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
