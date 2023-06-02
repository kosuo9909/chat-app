import { Link, useParams } from 'react-router-dom';
import './ChatRoom.scss';
import auth, { db } from '../API/firebase';
import { child, onValue, push, ref, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import ChatRoomMessage from './ChatRoomMessage';

const ChatRoom = (props) => {
  const [currentUser, setCurrentUser] = useState('not yet');
  const [currentUserId, setCurrentUserId] = useState('not yet');
  const [input, setInput] = useState('');

  const [allMessages, setAllMessages] = useState('');

  // Get user email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email);
        setCurrentUserId(user.uid);
      } else {
        setCurrentUser('No user is signed in');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  // Get current date
  let currentDate = new Date();

  let options = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  let readableDate = currentDate.toLocaleString('en-US', options);

  // Get URL params
  const { roomId } = useParams();

  // Get a reference to chatrooms/roomId
  useEffect(() => {
    const messages = ref(db, 'chatrooms/' + roomId);

    // Listen for updates and get data
    onValue(messages, (snapshot) => {
      const data = snapshot.val();
      setAllMessages(data.messages);

      // console.log(data.messages);
    });
  }, [roomId]);

  // Create an onSubmit form handler

  const submitHandler = (e) => {
    e.preventDefault();
    let messageData = {
      user_email: currentUser,
      created_at: readableDate,
      text: input,
    };
    // Get a key for a new Message.
    const newPostKey = push(child(ref(db), 'posts')).key;

    // Write the new data for the specific user.
    const updates = {};
    updates[
      '/chatrooms/' + roomId + '/messages/' + currentUserId + '/' + newPostKey
    ] = messageData;
    setInput('');
    return update(ref(db), updates);
  };
  console.log(allMessages);

  const maxLength = 80;
  return (
    <div className='room-top-layer'>
      <div to='/' className='back-to-rooms'>
        You are currently in the "{roomId}" Chatroom.
      </div>
      <div className='room-flex'>
        {/* <p>{roomId}</p> */}
        <div className='room-all-messages'>
          {allMessages &&
            Object.values(allMessages)
            .map((messageObject, index) =>
              Object.values(messageObject)
                .reverse()
                .map((message, innerIndex) => (
                  <ChatRoomMessage
                    key={`${index}-${innerIndex}`}
                    message={message}
                  />
                ))
            )}
        </div>
      </div>
      <form className='room-send-message' onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Send a message to the room'
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></input>
        <button className='button' type='submit'>
          Send
        </button>
      </form>
      <Link to='/' className='back-to-rooms link'>
        Back to all rooms
      </Link>
    </div>
  );
};

export default ChatRoom;
