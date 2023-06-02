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
      <div className='home-welcome'>Welcome, here are the available rooms:</div>
      <div className='home-rooms'>
        {!isLoading &&
          Object.values(data).map((room) => (
            <Link
              to={`/room/${room.name}`}
              key={room.id}
              className='home-room-button'
            >
              ({Object.values(room.messages).length / 4}) {room.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
