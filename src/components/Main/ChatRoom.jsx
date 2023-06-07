import { Link, useNavigate, useParams } from 'react-router-dom';
import './ChatRoom.scss';
import auth, { db } from '../API/firebase';
import { child, onValue, push, ref, remove, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import ChatRoomMessage from './ChatRoomMessage';

const ChatRoom = (props) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const [allMessages, setAllMessages] = useState(null);
  const [roomOwner, setRoomowner] = useState(null);

  // Get URL params
  const { roomId } = useParams();

  const deleteHandler = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const confirmDelete = () => {
    // delete message
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    navigate('/');

    return remove(ref(db, '/chatrooms/' + roomId));
  };

  const cancelDelete = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  const dialogRef = useRef(null);

  // Get user email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email);
        setCurrentUserId(user.uid);
      } else {
        setCurrentUser('Guest');
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

  // Get a reference to chatrooms/roomId
  useEffect(() => {
    const messages = ref(db, 'chatrooms/' + roomId);

    // Listen for updates and get data
    onValue(messages, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAllMessages(data.messages);
        setRoomowner(data.uid);
      }

      // console.log(data.messages);
    });
  }, [roomId]);

  // Create an onSubmit form handler

  const submitHandler = (e) => {
    e.preventDefault();
    // Get a key for a new Message.
    const newPostKey = push(child(ref(db), 'posts')).key;

    let messageData = {
      user_email: currentUser,
      created_at: readableDate,
      text: input,
      uid: currentUserId,
      message_id: newPostKey,
    };

    // Write the new data for the specific user.
    const updates = {};
    updates['/chatrooms/' + roomId + '/messages/' + newPostKey] = messageData;
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
          {!allMessages && allMessages === null && (
            <span className='white-test'>Loading...</span>
          )}
          {allMessages === undefined || allMessages === '' ? (
            <span className='white-test'>
              No messages yet. Be the first one to send a message.
            </span>
          ) : (
            ''
          )}
          {allMessages &&
            Object.values(allMessages)
              .reverse()
              .map((message, index) => (
                <ChatRoomMessage
                  key={`${index}`}
                  message={message}
                  user_id={currentUserId}
                  owner_id={message.uid}
                  message_id={message.message_id}
                  room_id={roomId}
                />
              ))}
        </div>
      </div>
      {currentUser !== 'Guest' && allMessages !== null && (
        <>
          <form className='room-send-message' onSubmit={submitHandler}>
            <input
              className='input-border'
              type='text'
              placeholder='Send a message to the room'
              onChange={(e) => setInput(e.target.value)}
              value={input}
            ></input>
            <button className='button' type='submit'>
              Send
            </button>
          </form>
          <div className='back-delete-flex'>
            <Link to='/' className='back-to-rooms link'>
              Back to all rooms
            </Link>
            {roomOwner === currentUserId && (
              <>
                <span className='white-test'> or </span>
                <button onClick={deleteHandler} className='button light'>
                  Delete this room
                </button>
              </>
            )}
            <dialog ref={dialogRef}>
              <div className='dialog-content'>
                <p>Are you sure you want to delete this room?</p>
                <div className='flex-div-buttons'>
                  <button className='button large' onClick={confirmDelete}>
                    Yes
                  </button>
                  <button className='button large' onClick={cancelDelete}>
                    No
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        </>
      )}

      {currentUser === 'Guest' && (
        <Link to='/login' className='back-to-rooms link no-user'>
          Log in to send a message
        </Link>
      )}
    </div>
  );
};

export default ChatRoom;
