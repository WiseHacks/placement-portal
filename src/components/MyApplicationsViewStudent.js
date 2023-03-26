import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { getAllApplicationsForUser } from '../services/job-application-service';

export const MyApplications = () => {
  const [myApplications, setMyApplications] = useState([]);

  useEffect(() => {
    const fetchMyApplications = async ()=>{
        const response = await getAllApplicationsForUser();
        console.log(response);
        setMyApplications(response);
    }
    fetchMyApplications();
    // fetch('https://example.com/api/applications')
    //   .then(response => response.json())
    //   .then(data => setApplications(data))
    //   .catch(error => console.error(error));
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Application ID</th>
          <th>Job ID</th>
          <th>Company Name</th>
          <th>Job Profile</th>
          <th>Status</th>
          <th>Applied At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {myApplications.map(application => (
          <tr key={application.id}>
            <td>{application?.id}</td>
            <td>{application?.jobOpening?.id}</td>
            <td>{application?.jobOpening?.company?.companyName}</td>
            <td>{application?.jobOpening?.jobProfile}</td>
            <td>{application?.status}</td>
            <td>{new Date(application?.createdAt).toLocaleString("ru")}</td>
            <td>{new Date(application?.updatedAt).toLocaleString("ru")}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

