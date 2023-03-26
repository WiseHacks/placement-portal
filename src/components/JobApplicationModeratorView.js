import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button, Table } from 'reactstrap';
import axios from 'axios';
import { getAllApplicationsForJobOpening,updateJobApplication } from '../services/job-application-service';
import { getAllJobOpenings } from '../services/job-opening-service';
import {toast} from 'react-toastify'

export const JobApplications = () => {
  const [selectedJobId, setSelectedJobId] = useState('');
  const [jobApplications, setJobApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [status, setStatus] = useState('');
  const [jobOpenings,setJobOpenings] = useState([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
        const response = await getAllApplicationsForJobOpening(selectedJobId);
        console.log(response);
        setJobApplications(response)
    //   const response = await axios.get(`/api/jobApplications/${selectedJobId}`);
    //   setJobApplications(response.data);
    };
    const fetchJobOpenings = async ()=>{
        const response = await getAllJobOpenings();
        setJobOpenings(response);
    }
    fetchJobOpenings();

    if (selectedJobId) {
      fetchJobApplications();
    }
  }, [selectedJobId]);

  const fetchJobApplications = async () => {
    const response = await getAllApplicationsForJobOpening(selectedJobId);
    console.log(response);
    setJobApplications(response)
//   const response = await axios.get(`/api/jobApplications/${selectedJobId}`);
//   setJobApplications(response.data);
};

  const handleJobIdChange = (event) => {
    setSelectedJobId(event.target.value);
  };

  const handleApplicationClick = (application) => {
    console.log(application);
    setSelectedApplication(application);
    setStatus(application.status);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    // const response = await axios.patch(`/api/jobApplications/${selectedApplication.id}`, {
    //   status: status,
    // });
    let jobApplicationDto = {...selectedApplication}
    jobApplicationDto.status= status;
    const response = await updateJobApplication(jobApplicationDto);
    fetchJobApplications();
    toast.success("Status successfully updated !!");
    setSelectedApplication(null);
  };

  return (
    <div>
      <FormGroup>
        <Label for="jobId">Select Job ID:</Label>
        <Input type="select" name="jobId" id="jobId" onChange={handleJobIdChange}>
        <option value="">Select a job ID</option>
          {jobOpenings.map((jobOpening) => (
            <option key={jobOpening.id} value={jobOpening.id}>
              {jobOpening.id}
            </option>
          ))}
        </Input>
      </FormGroup>

      {jobApplications.length > 0 && (
        <Table>
          <thead>
            <tr>
                <th>Application Id</th>
                <th>Applicant Name</th>
                <th>Applied Company</th>
                <th>Applied Profile</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobApplications.map((application) => (
              <tr key={application.id} >
                <td>{application.id}</td>
                <td>{application.user.email.split('@')[0].toUpperCase()}</td>
                <td>{application.jobOpening.company.companyName}</td>
                <td>{application.jobOpening.jobProfile}</td>
                <td>{application.user.email}</td>
                <td>{application.status}</td>
                <td>
                <Button color="primary" onClick={()=>handleApplicationClick(application)}>
                    Update Status
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selectedApplication && (
        <FormGroup>
          <Label for="status">Select Updated Status for Application Id : {selectedApplication.id}</Label>  
          <Input type="select" name="status" id="status" value={status} onChange={handleStatusChange}>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="SELECTED">Selected</option>
            <option value="REJECTED">Rejected</option>
          </Input>
          <Button color="primary" onClick={handleUpdateStatus}>
            Confirm
          </Button>
        </FormGroup>
      )}
    </div>
  );
};

