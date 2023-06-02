import { useState } from 'react';

const ChatRoomMessage = ({ message }) => {
  const [showFullText, setShowFullText] = useState(false);
  const maxLength = 60;

  return (
    <div className='chat-room-message'>
      <span className='message-time'>On {message.created_at}, </span>
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
    </div>
  );
};

export default ChatRoomMessage;
