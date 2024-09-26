import React, { useState } from 'react';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import { useMessages } from './hooks/useMessages';
import './App.css';

function App() {
  const { messages, error, addMessage, updateMessage, deleteMessage } = useMessages();
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterUsername, setFilterUsername] = useState('');
  const [showAbout, setShowAbout] = useState(false);

  function handleSortChange() {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  }

  function handleAboutClick() {
    setShowAbout(!showAbout);
  }

  let filteredMessages = messages.filter(message => 
    message.username.toLowerCase().includes(filterUsername.toLowerCase())
  );

  if (sortOrder === 'desc') {
    filteredMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else {
    filteredMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  return (
    <div className="App">
      <div className="header">
        <h1>CyberTavlan</h1>
        {error && <p className="error">{error}</p>}
        
        <MessageForm onSubmit={addMessage} />
        <div className="controls">
          <button onClick={handleSortChange}>
            {sortOrder === 'desc' ? 'Äldst först' : 'Nyast först'}
          </button>
          <button onClick={handleAboutClick}>Om</button>
          <input
            type="text"
            placeholder="Filtrera efter användare"
            value={filterUsername}
            onChange={(e) => setFilterUsername(e.target.value)}
          />
        </div>
        {showAbout && (
          <div className="about-modal">
            <h2>Om CyberTavlan</h2>
            <p>CyberTavlan är en digital anslagstavla där användare kan dela meddelanden med varandra.</p>
            <p>I och med att det är en digital anslagstavla, betyder det att alla har möjlighet att ändra, ta bort och lägga till meddelanden.</p>

            <p>Detta projekt är en individuell examination av Linus Zackrisson för kursen "Utveckling och driftsättning i molnmiljö".</p>
            <h4>Frontend:</h4>
            <ul>
              <li>Byggt med React</li>
              <li>Deployad på AWS i en S3 bucket</li>
            </ul>
            <h4>Backend:</h4>
            <ul>
              <li>Serverless framework</li>
              <li>API Gateway</li>
              <li>Lambda</li>
              <li>DynamoDB</li>
            </ul>
            <button onClick={handleAboutClick}>Stäng</button>
          </div>
        )}
      </div>

      <div className="board">
        <MessageList 
          messages={filteredMessages} 
          onUpdate={updateMessage}
          onDelete={deleteMessage}
        />
        
      </div>
    </div>
  );
}

export default App;
