// src/components/Dashboard.js
import React, { useState } from 'react';

const Dashboard = () => {
  const [companies] = useState([
    {
      name: "Company A",
      communications: [
        { type: "LinkedIn Post", date: "2025-01-02", notes: "Follow-up" },
        { type: "Email", date: "2025-01-01", notes: "Introductory Email" },
      ],
      nextCommunication: { type: "Phone Call", date: "2025-01-04" },
    },
  ]);

  return (
    <div>
      <h3>Dashboard</h3>
      {companies.map((company, index) => (
        <div key={index} className="company-row">
          <h4>{company.name}</h4>
          <div>Last 5 Communications:</div>
          <ul>
            {company.communications.slice(0, 5).map((comm, idx) => (
              <li key={idx}>
                {comm.type} - {comm.date} ({comm.notes})
              </li>
            ))}
          </ul>
          <div>Next Scheduled: {company.nextCommunication.type} - {company.nextCommunication.date}</div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
