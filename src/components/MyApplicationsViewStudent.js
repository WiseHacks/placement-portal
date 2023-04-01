import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { deleteJobApplication, getAllApplicationsForUser } from '../services/job-application-service';
import {Button} from 'reactstrap'
import {toast} from 'react-toastify'
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

  const fetchMyApplications = async ()=>{
    const response = await getAllApplicationsForUser();
    console.log(response);
    setMyApplications(response);
}

  const withdrawApplication = async(application)=>{
    const resp =await deleteJobApplication(application.id);
    toast.success("Application withdrawl successfull !!");
    fetchMyApplications();
  }

  return (
    <>
    {myApplications.length
    ?
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
        <th>Action</th>
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
          <td>
            <Button onClick={()=>withdrawApplication(application)} disabled = {application.status!="APPLIED"}>Withdraw Application</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
    :
    <p>You have no applications yet
      </p>
    }
   
    </>
  );
};

