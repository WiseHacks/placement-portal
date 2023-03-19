import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import { ResumeForm } from "./CreateResume";
import { Container } from "reactstrap";
import { getCurrentUserDetail } from "../auth";
import { getSingleUser as getUser } from "../services/user-service";
import { getResume,updateResume as updateResumeAPICall,deleteResume as deleteResumeAPICall } from "../services/resume-service";
import { ResumeDisplay as ShowResume } from "./ShowResume";
import { ResumeUpdateForm } from "./ResumeUpdate";
import {toast} from "react-toastify"

export const ResumeCard = () => {
  const [hasResume, setHasResume] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState(undefined);

  useEffect(() => {
    getUser()
      .then((userDto) => {
        console.log(userDto);
        setHasResume(userDto.resume != null);
      })
      .catch((error) => {
        console.log(error);
      });
    fetchUserResume();
  }, [hasResume]);
  const changeHasResumeOnCreate = (resumeExists) => {
    setHasResume(resumeExists);
  };

  const [createResumeFormVisible, setCreateResumeFormVisible] = useState(false);
  const [editResumeFormVisible, setEditResumeFormVisible] = useState(false);

  const changeResumeCreateCardVisible = (newVal) => {
    setCreateResumeFormVisible(newVal);
  };

  const handleCreateResume = () => {
    setCreateResumeFormVisible(true);
    // setHasResume(true);
  };

  const handleEditResume = () => {
    // Code to handle editing the existing resume
    setEditResumeFormVisible(true);
  };

  const handleDeleteResume = ()=>{
    setHasResume(false);
    deleteResumeAPICall().then(()=>{
        toast.success("Resume deleted successfully !!");
    }).catch((error)=>{
        console.log(error);
    })
  }

  const onResumeUpdate = (resume)=>{
    console.log(resume);
    const ResumeDto = {
        name: resume.name,
        address: resume.address,
        workExperience: resume.workExperience,
        phoneNumber: resume.phoneNumber,
        skills: resume.skills,
        achievements: resume.achievements,
        education: resume.education,
        projects: resume.projects,
        cgpa: parseFloat(resume.cgpa)
    }
    updateResumeAPICall(ResumeDto).then((updatedResume)=>{
        console.log(updatedResume);
        toast.success("Resume updated successfully !!");
        setResume(updatedResume);
        setEditResumeFormVisible(false);
    }).catch((error)=>{
        console.log(error);
    })
    
  }
  const fetchUserResume = async () => {
    setIsLoading(true);
    getResume()
      .then((resume) => {
        console.log("here i am");
        console.log(resume);
        setResume(resume);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <CardBody>
          {hasResume ? (
            !editResumeFormVisible ? (
              <>
                {" "}
                <CardTitle className="text-center">Your Resume</CardTitle>
                <ShowResume resume={resume} isLoading={isLoading}></ShowResume>
                {/* Code to display the existing resume */}
                <div className="text-center mt-4">
                  <Button onClick={handleEditResume}>Edit Resume</Button>
                  <Button onClick={handleDeleteResume}>Delete Resume</Button>
                </div>
              </>
            ) : (
              <Card>
                <CardBody>
                    <ResumeUpdateForm
                    resume={resume}
                    onUpdate={onResumeUpdate}
                    ></ResumeUpdateForm>
                </CardBody>
              </Card>
            )
          ) : (
            <>
              <CardTitle>You have no saved Resume</CardTitle>
              <Button
                onClick={handleCreateResume}
                disabled={createResumeFormVisible}
              >
                Create Resume
              </Button>
              {/* <ResumeForm></ResumeForm> */}
            </>
          )}
        </CardBody>
      </Card>
      <Card
        body
        className="my-2"
        style={{
          width: "50rem",
        }}
      >
        <CardBody>
          {createResumeFormVisible ? (
            <ResumeForm
              hasResume={hasResume}
              changeHasResumeOnCreate={changeHasResumeOnCreate}
              createResumeFormVisible={createResumeFormVisible}
              changeResumeCreateCardVisible={changeResumeCreateCardVisible}
            ></ResumeForm>
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
    </>
  );
};
