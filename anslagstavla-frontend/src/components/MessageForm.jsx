import { useState } from 'react'

function MessageForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, text });
    setUsername('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Skriv ditt meddelande här..."
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Användarnamn"
        required
      />
      <button type="submit">Publicera</button>
    </form>
  );
}

export default MessageForm