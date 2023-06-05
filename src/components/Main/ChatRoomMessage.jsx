import userEvent from '@testing-library/user-event';
import { useEffect, useRef, useState } from 'react';

const ChatRoomMessage = ({ message, message_id, user_id, owner_id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.text);

  const [showFullText, setShowFullText] = useState(false);
  const maxLength = 50;

  const editHandler = () => {
    setIsEditing((prevState) => !prevState);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

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

        {!isEditing && owner_id === user_id && (
          <button className='button' onClick={editHandler}>
            Edit
          </button>
        )}
      </span>
      {isEditing && (
        <>
          <input
            className='message-input'
            value={editedMessage}
            ref={inputRef}
            onChange={(e) => setEditedMessage(e.target.value)}
            onBlur={editHandler}
          ></input>
          <button className='button' onClick={editHandler}>
            Done
          </button>
        </>
      )}

      <span className='message-time'>{message.created_at}</span>
    </div>
    // </div>
  );
};

export default ChatRoomMessage;
