import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://vz35nu72ha.execute-api.eu-north-1.amazonaws.com/dev';

export function useMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    axios.get(`${API_URL}/messages`)
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));
  };

  const addMessage = (message) => {
    axios.post(`${API_URL}/messages`, message)
      .then(getMessages)
      .catch(error => console.error('Error adding message:', error));
  };

  const updateMessage = (id, updatedMessage) => {
    axios.put(`${API_URL}/messages/${id}`, updatedMessage)
      .then(getMessages)
      .catch(error => console.error('Error updating message:', error));
  };

  const deleteMessage = (id) => {
    axios.delete(`${API_URL}/messages/${id}`)
      .then(getMessages)
      .catch(error => console.error('Error deleting message:', error));
  };

  return { messages, addMessage, updateMessage, deleteMessage };
}
