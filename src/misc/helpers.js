import { equalTo, orderByChild, query, ref } from 'firebase/database';
import { database } from './firebase';

export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' ');
  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }
  return splitName[0][0];
}

export function transformToArrWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}

export async function getUserUpdate(userId, keyToUpdate, value, db) {
  const updates = {};
  updates[`/profles/${userId}/${keyToUpdate}`] = value;

  const getMsgs = query(
    ref(database, '/messages'),
    orderByChild('author/uid'),
    equalTo(userId)
  );

  const getRooms = query(
    ref(database, '/rooms'),
    orderByChild('lastMessage/author/uid'),
    equalTo(userId)
  );

  const [mSnap, rSnap] = await Promise.all([getMsgs, getRooms]);
  console.log(getMsgs);
  mSnap.forEach(msgSnap => {
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });

  rSnap.forEach(roomSnap => {
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });

  return updates;
}
