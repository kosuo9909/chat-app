import { ref, remove, update } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import { db } from '../API/firebase';

const ChatRoomMessage = ({
  message,
  message_id,
  user_id,
  owner_id,
  room_id,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.text);

  const [showFullText, setShowFullText] = useState(false);
  const maxLength = 51;

  const editHandler = () => {
    setIsEditing((prevState) => !prevState);
  };

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
    return remove(ref(db, '/chatrooms/' + room_id + '/messages/' + message_id));
  };

  const cancelDelete = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const doneEditHandler = () => {
    const newMessage = { ...message, text: inputRef.current.value };

    // Write the new data for the specific user.
    const updates = {};
    updates['/chatrooms/' + room_id + '/messages/' + message_id] = newMessage;
    setIsEditing((prevState) => !prevState);
    return update(ref(db), updates);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    // <div className='chat-room-message'>
    <div className='flex-div'>
      {owner_id === user_id ? (
        <span className='message-user owner'>{message.user_email}</span>
      ) : (
        <span className='message-user'>{message.user_email}</span>
      )}

      {!isEditing && (
        <span className='message-text'>
          {showFullText || message.text.length <= maxLength
            ? message.text
            : message.text.substring(0, maxLength) + '...'}
        </span>
      )}
      {owner_id !== user_id && <div className='placeholder'></div>}
      {message.text.length > maxLength && (
        <button
          className='button'
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? 'Show Less' : 'Show More'}
        </button>
      )}
      {/* {message.text.length <= maxLength && <div className='placeholder'></div>} */}
      {!isEditing && owner_id === user_id && (
        <div className='flex-container'>
          <button className='button' onClick={editHandler}>
            Edit
          </button>

          <button className='button' onClick={deleteHandler}>
            Delete
          </button>

          <dialog ref={dialogRef}>
            <div className='dialog-content'>
              <p>Are you sure you want to delete this message?</p>
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
      )}

      {isEditing && (
        <div className='input-div'>
          <input
            className='message-input'
            value={editedMessage}
            ref={inputRef}
            onChange={(e) => setEditedMessage(e.target.value)}
            onBlur={editHandler}
          ></input>
          <button className='button' onMouseDown={doneEditHandler}>
            Done
          </button>
        </div>
      )}

      <span className='message-time'>{message.created_at}</span>
    </div>
    // </div>
  );
};

export default ChatRoomMessage;
