// src/components/CommunicationForm.js
import React, { useState } from 'react';

const CommunicationForm = ({ onSubmit }) => {
  const [communicationType, setCommunicationType] = useState("");
  const [communicationDate, setCommunicationDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ communicationType, communicationDate, notes });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Type of Communication:</label>
      <input type="text" value={communicationType} onChange={(e) => setCommunicationType(e.target.value)} />
      
      <label>Date:</label>
      <input type="date" value={communicationDate} onChange={(e) => setCommunicationDate(e.target.value)} />
      
      <label>Notes:</label>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      
      <button type="submit">Log Communication</button>
    </form>
  );
};

export default CommunicationForm;
