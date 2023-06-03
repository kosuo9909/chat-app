import './Home.scss';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
const Home = () => {
  const fetchRooms = async () => {
    const res = await axios.get(
      'https://chat-app-f21db-default-rtdb.firebaseio.com/chatrooms.json'
    );
    return res.data;
  };
  const { isLoading, error, data } = useQuery('posts', fetchRooms);
  console.log(isLoading);

  console.log(data);
  return (
    <div className='home-flex'>
      <div className='home-welcome'>Here are the available rooms:</div>
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
    </div>
  );
};

export default Home;
