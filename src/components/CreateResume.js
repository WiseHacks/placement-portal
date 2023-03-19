import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { createResume } from '../services/resume-service';

export const ResumeForm = (props) => {
  const [skills, setSkills] = useState(['']);
  const [achievements, setAchievements] = useState(['']);
  const [projects, setProjects] = useState(['']);
  const [education, setEducation] = useState(['']);
  const {hasResume,changeHasResumeOnCreate,createResumeFormVisible,changeResumeCreateCardVisible} = props;
  

  const handleSkillsChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleRemoveSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const handleAchievementsChange = (index, value) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setAchievements(newAchievements);
  };

  const handleAddAchievements = () => {
    setAchievements([...achievements, '']);
  };

  const handleRemoveAchievement = (index) => {
    setAchievements((prevAchievements) =>
      prevAchievements.filter((_, i) => i !== index)
    );
  };

  const handleEducationChange = (index, value) => {
    const newEducation = [...education];
    newEducation[index] = value;
    setEducation(newEducation);
  };

  const handleAddEducation = () => {
    setEducation([...education, '']);
  };

  const handleRemoveEducation = (index) => {
    setEducation((prevEducation) =>
      prevEducation.filter((_, i) => i !== index)
    );
  };

  const handleProjectsChange = (index, value) => {
    const newProjects = [...projects];
    newProjects[index] = value;
    setProjects(newProjects);
  };

  const handleAddProjects = () => {
    setProjects([...projects, '']);
  };

  const handleRemoveProject = (index) => {
    setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const ResumeDto = {
        name: event.target.name.value,
        address: event.target.address.value,
        workExperience: event.target.workExperience.value,
        phoneNumber: event.target.phoneNumber.value,
        skills: skills,
        achievements: achievements,
        education: education,
        projects: projects,
        cgpa: parseFloat(event.target.cgpa.value)
    }
    console.log(ResumeDto);
    createResume(ResumeDto).then((data)=>{
        console.log(data);
        changeHasResumeOnCreate(true);
        changeResumeCreateCardVisible(false);
    }).catch((error)=>{
        console.log(error);
    });

  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="Enter your name" required />
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input type="text" name="address" id="address" placeholder="Enter your address" required />
      </FormGroup>
      <FormGroup>
        <Label for="workExperience">Work Experience</Label>
        <Input type="text" name="workExperience" id="workExperience" placeholder="Enter your work experience" required />
      </FormGroup>
      <FormGroup>
        <Label for="phoneNumber">Phone Number</Label>
        <Input type="tel" name="phoneNumber" id="phoneNumber" placeholder="Enter your phone number" pattern="[0-9]{10}" required />
      </FormGroup>
      <FormGroup>
        <Label for="skills">Skills</Label>
        {skills.map((skill, index) => (
          <div
            key={`skill-${index}`}
            className="d-flex align-items-center mb-2"
          >
            <Input
              type="text"
              name="skills"
              id={`skill-${index}`}
              placeholder="Enter a skill"
              value={skill}
              onChange={(event) => handleSkillsChange(index, event.target.value)}
              required
            />
            <Button
              color="danger"
              className="ml-2"
              onClick={() => handleRemoveSkill(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddSkill}>
          Add Skill
        </Button>
      </FormGroup>
      <FormGroup>
        <Label for="achievements">Achievements</Label>
        {achievements.map((achievement, index) => (
          <div
            key={`achievement-${index}`}
            className="d-flex align-items-center mb-2"
          >
            <Input
              type="text"
              name="achievements"
              id={`achievement-${index}`}
              placeholder="Enter an achievement"
              value={achievement}
              onChange={(event) =>
                handleAchievementsChange(index, event.target.value)
              }
              required
            />
            <Button
              color="danger"
              className="ml-2"
              onClick={() => handleRemoveAchievement(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddAchievements}>
          Add Achievement
        </Button>
      </FormGroup>
      <FormGroup>
        <Label for="education">Education</Label>
        {education.map((educationItem, index) => (
          <div
            key={`education-${index}`}
            className="d-flex align-items-center mb-2"
          >
            <Input
              type="text"
              name="education"
              id={`education-${index}`}
              placeholder="Enter an education"
              value={educationItem}
              onChange={(event) =>
                handleEducationChange(index, event.target.value)
              }
              required
            />
            <Button
              color="danger"
              className="ml-2"
              onClick={() => handleRemoveEducation(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddEducation}>
          Add Education
        </Button>
      </FormGroup>
          {/* <FormGroup>
            <Label for="education">Education</Label>
            <Input type="text" name="education" id="education" placeholder="Enter your education" required />
          </FormGroup> */}
          <FormGroup>
        <Label for="projects">Projects</Label>
        {projects.map((project, index) => (
          <div
            key={`project-${index}`}
            className="d-flex align-items-center mb-2"
          >
            <Input
              type="text"
              name="projects"
              id={`project-${index}`}
              placeholder="Enter a project"
              value={project}
              onChange={(event) =>
                handleProjectsChange(index, event.target.value)
              }
              required
            />
            <Button
              color="danger"
              className="ml-2"
              onClick={() => handleRemoveProject(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddProjects}>
          Add Project
        </Button>
      </FormGroup>
          <FormGroup>
            <Label for="cgpa">CGPA</Label>
            <Input type="number" name="cgpa" id="cgpa" placeholder="Enter your CGPA" min="0" max="10" step="0.01" required />
          </FormGroup>
          <div className="text-center">
          <Button type="submit"  color="primary">Submit</Button>
          </div>
        </Form>
      );
    };

    

    