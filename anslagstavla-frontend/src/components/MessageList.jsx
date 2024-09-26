import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function MessageList({ messages, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  if (messages.length === 0) {
    return <div className="no-messages">Du har inga meddelanden att visa.</div>;
  }

  const formatDate = (date) => date.substring(0, 16).replace('T', ' ');

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id} className="message post-it">
          <div className="message-header">
            <strong>{message.username || 'Anonym'}</strong>
            <small>{formatDate(message.createdAt)}</small>
          </div>
          {editingId === message.id ? (
            <div className="message-edit">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="edit-actions">
                <button onClick={() => {
                  onUpdate(message.id, { text: editText });
                  setEditingId(null);
                }}>Spara</button>
                <button onClick={() => setEditingId(null)}>Avbryt</button>
              </div>
            </div>
          ) : (
            <>
              <p className="message-text">{message.text}</p>
              <div className="message-actions">
                <button className="icon-button" onClick={() => {
                  setEditingId(message.id);
                  setEditText(message.text);
                }}>
                  <FaEdit className="icon" />
                </button>
                <button className="icon-button" onClick={() => onDelete(message.id)}>
                  <FaTrash className="icon" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MessageList;