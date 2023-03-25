import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { getAllJobOpenings ,deleteJobOpening} from '../services/job-opening-service';
import {toast} from 'react-toastify'
export const JobOpeningsList = () => {
const [jobOpenings, setJobOpenings] = useState([]);

const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const fetchJobOpenings = async () => {
    try {
    //   const response = await fetch('/api/job-openings');
    //   const data = await response.json();
    //   setJobOpenings(data);
    const allJobOpeningDto = await getAllJobOpenings();
    console.log(allJobOpeningDto);
    const njo = []
    allJobOpeningDto.forEach((jobOpeningDto)=>{
        njo.push({
            jobId:jobOpeningDto?.id,
            jobDescription:jobOpeningDto?.jobDescription,
            postedBy:jobOpeningDto?.user?.email,
            cgpaCutoff:jobOpeningDto?.cgpaCutoff,
            companyName:jobOpeningDto?.company?.companyName,
        })
    })
    console.log(njo)
    setJobOpenings(njo);
    } catch (error) {
      console.log(error);
    }
  };

//   const handleEditJobOpening = (jobOpening) => {
//     // handle edit job opening logic here
//   };

  const handleDeleteJobOpening = async(jobOpeningId) => {
    // handle delete job opening logic here
    try{
        const resp = await deleteJobOpening(jobOpeningId);
        toast.success("Job Deleted Successfully");
        fetchJobOpenings();
        console.log(resp);
    }
    catch(err){
        console.log(err);
    }
   

  };

  return (
    <div>
      <h2>Job Openings</h2>
      <Table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Description</th>
            <th>Posted By</th>
            <th>CGPA Cutoff</th>
            <th>Company Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobOpenings.map((jobOpening) => (
            <tr key={jobOpening.jobId}>
              <td>{jobOpening.jobId}</td>
              <td>{jobOpening.jobDescription}</td>
              <td>{jobOpening.postedBy}</td>
              <td>{jobOpening.cgpaCutoff}</td>
              <td>{jobOpening.companyName}</td>
              <td>
                {/* <Button color="primary" onClick={() => handleEditJobOpening(jobOpening)}>
                  Edit
                </Button> */}
                <Button color="danger" onClick={() => handleDeleteJobOpening(jobOpening.jobId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
