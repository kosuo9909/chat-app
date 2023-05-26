import './Home.scss';
import axios from 'axios';
import { useQuery } from 'react-query';
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
      {!isLoading &&
        Object.values(data).map((room) => (
          <p key={room.id} className='home-welcome'>
            {room.name}
          </p>
        ))}
    </div>
  );
};

export default Home;
