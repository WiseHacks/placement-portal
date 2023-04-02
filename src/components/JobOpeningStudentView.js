import React, { useState, useEffect } from "react";
import { getAllJobOpenings, searchJobOpening } from "../services/job-opening-service";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup, InputGroupText
} from "reactstrap";
import { getCurrentUserDetail } from "../auth";
import { applyToJobOpening, getAllApplicationsForUser } from "../services/job-application-service";
import {toast} from 'react-toastify';
import { getMyPlacementStatus } from "../services/placement-status-service";

export const JobOpeningsTable = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedJobOpening, setSelectedJobOpening] = useState({});
  const [myApplications,setMyApplications] = useState([]);
  const [placementStatus, setPlacementStatus] = useState(null);
  const [applicantData, setApplicantData] = useState({
    name: getCurrentUserDetail().email.split('@')[0].toUpperCase(),
    email: getCurrentUserDetail().email,
    status:"NOT_APPLIED",
  });
  const [searchText, setSearchText] = useState('');


  // Fetch job openings from backend API on component mount
  useEffect(() => {
    const fetchJobOpenings = async () => {
    //   const response = await fetch("https://example.com/job-openings");
    //   const jobOpenings = await response.json();
    //   setJobOpenings(jobOpenings);
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
            jobProfile:jobOpeningDto?.jobProfile,
            companyId:jobOpeningDto?.company?.id,
            userPosted:jobOpeningDto?.user
        })
    })
    console.log(njo)
    setJobOpenings(njo);
    };
    fetchJobOpenings();

    const fetchMyApplications = async ()=>{
        const response = await getAllApplicationsForUser();
        console.log(response);
        setMyApplications(response);
    }
    fetchMyApplications();

    const fetchData = async () => {
      const response = await getMyPlacementStatus(getCurrentUserDetail().email);
      console.log(response);
      setPlacementStatus(response);
    };
    fetchData();


  }, []);

  

  const handleSearch = async() => {
   const resp = await searchJobOpening(searchText);
   const njo = []
    resp.forEach((jobOpeningDto)=>{
        njo.push({
            jobId:jobOpeningDto?.id,
            jobDescription:jobOpeningDto?.jobDescription,
            postedBy:jobOpeningDto?.user?.email,
            cgpaCutoff:jobOpeningDto?.cgpaCutoff,
            companyName:jobOpeningDto?.company?.companyName,
            jobProfile:jobOpeningDto?.jobProfile,
            companyId:jobOpeningDto?.company?.id,
            userPosted:jobOpeningDto?.user
        })
    })
    console.log(njo)
    setJobOpenings(njo);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const fetchJobOpenings = async () => {
    //   const response = await fetch("https://example.com/job-openings");
    //   const jobOpenings = await response.json();
    //   setJobOpenings(jobOpenings);
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
            jobProfile:jobOpeningDto?.jobProfile,
            companyId:jobOpeningDto?.company?.id,
            userPosted:jobOpeningDto?.user
        })
    })
    console.log(njo)
    setJobOpenings(njo);
    };

  const toggleModal = (jobOpening) => {
    setSelectedJobOpening(jobOpening);
    setModal(!modal);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setApplicantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

//   const handleResumeUpload = (event) => {
//     setApplicantData((prevState) => ({
//       ...prevState,
//       resume: event.target.files[0],
//     }));
//   };

const isDisabled = (jobOpening)=>{

    if(placementStatus?.isPlaced)return true;
    let isdis = false;
    myApplications.forEach((application)=>{
        if(application.jobOpening.id == jobOpening.jobId){
            isdis = true;
        }
    })
    return isdis;
}

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement submit logic to send applicantData to backend
    const jobApplicationDto = {
        user:getCurrentUserDetail(),
        status:"APPLIED",
        jobOpening:{
            id:selectedJobOpening.jobId,
            company:{
                id:selectedJobOpening.companyId,
                companyName:selectedJobOpening.companyName
            },
            cgpaCutoff:selectedJobOpening.cgpaCutoff,
            jobDescription:selectedJobOpening.jobDescription,
            jobProfile:selectedJobOpening.jobProfile,
            user:selectedJobOpening.userPosted
        }

    }
    console.log(jobApplicationDto);
    applyToJobOpening(jobApplicationDto).then((response)=>{
        console.log(response);
        setModal(false);
        toast.success("Application submitted succesfully !!");
    }).catch((err)=>{
        console.log(err);
    })
    // const response = applyToJobOpening(jobApplicationDto);
    // console.log(response);
    
  };

  return (
    <>
    <InputGroup>
    <Input
      placeholder="Enter Search query"
      value={searchText}
      onChange={handleSearchInputChange}
      onKeyPress={handleKeyPress}
    />
    <InputGroupText addonType="append">
      <Button color="primary" onClick={handleSearch}>
        Search
      </Button>
    </InputGroupText>
  </InputGroup>
    <div>
      <h1>Job Openings</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Description</th>
            <th>Company Name</th>
            <th>Job Profile</th>
            <th>CGPA Cutoff</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobOpenings.map((jobOpening) => (
            <tr key={jobOpening.jobId}>
              <td>{jobOpening.jobId}</td>
              <td>{jobOpening.jobDescription}</td>
              <td>{jobOpening.companyName}</td>
              <td>{jobOpening.jobProfile}</td>
              <td>{jobOpening.cgpaCutoff}</td>
              <td>
                <Button
                  color="primary"
                  onClick={() => toggleModal(jobOpening)}
                  disabled = {isDisabled(jobOpening)}
                >
                  Apply
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Apply for Profile: {selectedJobOpening.jobProfile} at {selectedJobOpening.companyName}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={applicantData.name}
                onChange={handleInputChange}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={applicantData.email}
                onChange={handleInputChange}
                disabled
              />
              </FormGroup>
              <FormGroup>
              <Label for="status">Status</Label>
              <Input
                type="text"
                name="status"
                id="status"
                value={applicantData.status}
                onChange={handleInputChange}
                disabled
              />
              </FormGroup>
              <Button color="primary" type="submit">
            Apply
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
              </Form>
              </ModalBody>
              <ModalFooter>
         
        </ModalFooter>
      </Modal>
      </div>
      </>
  )}
           
