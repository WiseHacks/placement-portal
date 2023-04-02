import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { getAllPlacementStatus } from '../services/placement-status-service';
import './styles/placementstats.css'

export const StudentPlacementTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student placement data from backend
    // Assume data is returned in the following format:
    // [
    //   { email: string, isPlaced: boolean, company: string, jobProfile: string },
    //   ...
    // ]
    const fetchData = async () => {
      const response = await getAllPlacementStatus();  
      setStudents(response);
    };
    fetchData();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
            <th>Name</th>
            <th>Roll No</th>
          <th>Email</th>
          <th>Placed</th>
          <th>Company</th>
          <th>Job Profile</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.email}>
            <td>{student?.placedJobApplication?.user?.name != null?student?.placedJobApplication?.user?.name != null:"N/A"}</td>
            <td>{student?.placedJobApplication?.user?.rollNo != null?student?.placedJobApplication?.user?.rollNo != null:"N/A"}</td>
            <td>{student.email}</td>
            <td>{student.isPlaced ? 'Yes' : 'No'}</td>
            <td>{student.isPlaced ? student.placedJobApplication.jobOpening.company.companyName : 'N/A'}</td>
            <td>{student.isPlaced ? student.placedJobApplication.jobOpening.jobProfile : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

