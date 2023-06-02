import { useState } from 'react';

const ChatRoomMessage = ({ message }) => {
  const [showFullText, setShowFullText] = useState(false);
  const maxLength = 50;

  return (
    // <div className='chat-room-message'>
    <div className='flex-div'>
      <span className='message-user'>{message.user_email} said: </span>
      <span className='message-text'>
        {showFullText || message.text.length < maxLength
          ? message.text
          : message.text.substring(0, maxLength) + '...'}
        {message.text.length > maxLength && (
          <button
            className='button'
            onClick={() => setShowFullText(!showFullText)}
          >
            {showFullText ? 'Show Less' : 'Show More'}
          </button>
        )}
      </span>
      <span className='message-time'>{message.created_at}</span>
    </div>
    // </div>
  );
};

export default ChatRoomMessage;
