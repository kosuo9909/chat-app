import { ref, update } from 'firebase/database';
import './Home.scss';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth, { db } from '../API/firebase';
import { onAuthStateChanged } from 'firebase/auth';
const Home = () => {
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount
  const fetchRooms = async () => {
    const res = await axios.get(
      'https://chat-app-f21db-default-rtdb.firebaseio.com/chatrooms.json'
    );
    return res.data;
  };
  const { isLoading, error, data, refetch } = useQuery('posts', fetchRooms);
  const [createRoom, setCreateRoom] = useState(false);
  const inputRef = useRef();
  const createHandler = () => {
    setCreateRoom(true);
  };
  const submitHandler = (e) => {
    // Get a key for a new Message.

    let messageData = {
      messages: '',
      name: inputRef.current.value,
      uid: currentUser,
    };

    // Write the new data for the specific user.
    const updates = {};
    updates['/chatrooms/' + inputRef.current.value] = messageData;
    setCreateRoom(false);

    update(ref(db), updates).then(() => {
      refetch();
    });
  };
  return (
    <div className='home-flex'>
      <div className='home-welcome'>Here are the available chat rooms:</div>
      <div className='home-rooms'>
        {isLoading && <span className='message-loading'>Loading rooms...</span>}
        {!isLoading &&
          Object.values(data).map((room) => (
            <Link to={`/room/${room.name}`} className='room-group'>
              <span key={room.id} className='home-room-button'>
                {room.messages && Object.keys(room.messages).length > 0 ? (
                  <span className='message-counter'>
                    {Object.keys(room.messages).length}
                  </span>
                ) : (
                  <span className='message-counter'>0 </span>
                )}
              </span>
              <span className='home-room-button'> {room.name}</span>
            </Link>
          ))}
      </div>
      {currentUser ? (
        <div className='home-welcome'>
          {!createRoom && (
            <div>
              {' '}
              Or you can also{' '}
              <button onClick={createHandler} className='button large'>
                create a new room
              </button>
            </div>
          )}
          {createRoom && (
            <div className='flex-input'>
              <input ref={inputRef} placeholder='Name your room'></input>
              <button onClick={submitHandler} className='button'>
                Create room
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className='home-welcome'>
          <div>
            You can{' '}
            <Link to='/login' className='button large'>
              Log In
            </Link>{' '}
            to create your own room
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
