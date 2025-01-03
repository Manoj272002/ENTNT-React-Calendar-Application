// src/components/CalendarView.js

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
    const [value, setValue] = useState(new Date());
    const [events, setEvents] = useState([
        { date: '2025-01-10', description: 'Scheduled Phone Call with Company A' },
        // Add more events here
    ]);

    return (
        <div>
            <h2>Calendar View</h2>
            <Calendar onChange={setValue} value={value} />
            {/* Display events */}
            <ul>
                {events
                    .filter((event) => event.date === value.toDateString())
                    .map((event, index) => (
                        <li key={index}>{event.description}</li>
                    ))}
            </ul>
        </div>
    );
};

export default CalendarView;