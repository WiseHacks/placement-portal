import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getAllJobOpenings } from "../services/job-opening-service";
import { moderatorSendEmail } from "../services/email-service";
import { toast } from "react-toastify";

export const EmailSendForm = () => {
  const [jobOptions, setJobOptions] = useState([]);
  const [jobId, setJobId] = useState("");
  const [status, setStatus] = useState("");
  const [emailSubject,setEmailSubject] = useState("");
  const [emailMessage,setEmailMessage] = useState("");

  useEffect(() => {
//     fetch("/api/jobs")
//       .then((response) => response.json())
//       .then((data) => setJobOptions(data))
//       .catch((error) => console.log(error));
getAllJobOpenings().then((data)=>{
    console.log(data);
setJobOptions(data);
}).catch((err)=>{
    console.log(err);
})
   }
, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let sendEmailDto = {
        jobId:jobId,
        status:status,
        message:emailMessage,
        subject:emailSubject
    }
    moderatorSendEmail(sendEmailDto);
    toast.success("Emails sent successfully !!");
    setJobId("");
    setEmailMessage("");
    setEmailSubject("");
    setStatus("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <h3>Send email to applicants of a job id by selecting thier status</h3>
        <Label for="jobId">Job ID</Label>
        <Input
          type="select"
          name="jobId"
          id="jobId"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
        >
          <option value="">Select Job ID</option>
          {jobOptions.map((job) => (
            <option key={job.id} value={job.id}>
              {job.id}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="status">Status</Label>
        <Input
          type="select"
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="APPLIED">Applied</option>
          <option value="SHORTLISTED">Shortlisted</option>
          <option value="INTERVIEWING">Interviewing</option>
          <option value="SELECTED">Selected</option>
          <option value="REJECTED">Rejected</option>

        </Input>


      </FormGroup>
      <FormGroup>
          <Label for="emailsubject">Email Subject</Label>
          <Input type="textarea" name="emailsubject" id="emailsubject"  value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}/>
        </FormGroup>
      <FormGroup>
          <Label for="emailmessage">Email Message</Label>
          <Input type="textarea" name="emailmessage" id="emailmessage" value={emailMessage}
          onChange={(e) => setEmailMessage(e.target.value)} />
        </FormGroup>
      <Button type="submit">Send Email</Button>
    </Form>
  );
};

