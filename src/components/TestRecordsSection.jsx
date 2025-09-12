import React from 'react';

const TestRecordsSection = () => (
  <div>
    <h3
      style={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        marginBottom: '1rem',
      }}
    >
      Test & Evaluation Records
    </h3>

    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.98rem',
        background: '#f5f8fa',
        borderRadius: '10px',
      }}
    >
      <thead>
        <tr style={{ background: '#e3eefd', color: '#3b6fc2' }}>
          <th style={{ padding: '0.7rem' }}>Exam Name</th>
          <th>Course</th>
          <th>Date</th>
          <th>Time</th>
          <th>Platform</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Python Programming Midterm</td>
          <td>CSE101</td>
          <td>Aug 27, 2025</td>
          <td>10:00 AM</td>
          <td>NPTEL</td>
          <td style={{ color: '#4cae4c', fontWeight: 'bold' }}>Completed</td>
          <td>⋮</td>
        </tr>

        <tr>
          <td>Full Stack Web Development Quiz</td>
          <td>CSE202</td>
          <td>Sep 02, 2025</td>
          <td>02:00 PM</td>
          <td>AICTE FDP</td>
          <td style={{ color: '#4cae4c', fontWeight: 'bold' }}>Completed</td>
          <td>⋮</td>
        </tr>

        <tr>
          <td>Data Structures Unit Test</td>
          <td>CSE303</td>
          <td>Sep 10, 2025</td>
          <td>01:00 PM</td>
          <td>CSE303</td>
          <td style={{ color: '#3b6fc2', fontWeight: 'bold' }}>Upcoming</td>
          <td>⋮</td>
        </tr>

        <tr>
          <td>Database Systems Internal Exam</td>
          <td>CSE404</td>
          <td>Sep 15, 2025</td>
          <td>08:45 AM</td>
          <td>NPTEL</td>
          <td style={{ color: '#3b6fc2', fontWeight: 'bold' }}>Upcoming</td>
          <td>⋮</td>
        </tr>

        <tr>
          <td>Web Dev Project Evaluation</td>
          <td>CSE202</td>
          <td>Sep 20, 2025</td>
          <td>11:15 AM</td>
          <td>AICTE FDP</td>
          <td style={{ color: '#3b6fc2', fontWeight: 'bold' }}>Upcoming</td>
          <td>⋮</td>
        </tr>

        <tr>
          <td>Python Final Examination</td>
          <td>CSE101</td>
          <td>Sep 25, 2025</td>
          <td>02:15 PM</td>
          <td>NPTEL</td>
          <td style={{ color: '#3b6fc2', fontWeight: 'bold' }}>Upcoming</td>
          <td>⋮</td>
        </tr>

        <tr>
          <td>Data Structures Final Exam</td>
          <td>CSE303</td>
          <td>Sep 28, 2025</td>
          <td>02:00 PM</td>
          <td>CSE303</td>
          <td style={{ color: '#3b6fc2', fontWeight: 'bold' }}>Upcoming</td>
          <td>⋮</td>
        </tr>
      </tbody>
    </table>

    <div
      style={{
        textAlign: 'right',
        color: '#3b6fc2',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '0.95rem',
        marginTop: '0.5rem',
      }}
    >
      View all →
    </div>
  </div>
);

export default TestRecordsSection;
