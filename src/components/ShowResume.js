import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';

export const ResumeDisplay = ({ resume,isLoading }) => {
  return (
    isLoading ?(<h1>....Loading</h1>):
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Card>
            <CardHeader>
              <h2>{resume?.name}</h2>
            </CardHeader>
            <CardBody>
              <CardTitle>Address:</CardTitle>
              <CardText>{resume?.address}</CardText>
              <CardTitle>Work Experience:</CardTitle>
              <CardText>{resume?.workExperience}</CardText>
              <CardTitle>Phone Number:</CardTitle>
              <CardText>{resume?.phoneNumber}</CardText>
              <CardTitle>Skills:</CardTitle>
              <CardText>{resume?.skills?.join(', ')}</CardText>
              <CardTitle>Achievements:</CardTitle>
              <CardText>{resume?.achievements?.join(', ')}</CardText>
              <CardTitle>Education:</CardTitle>
              <CardText>{resume?.education?.join(', ')}</CardText>
              <CardTitle>Projects:</CardTitle>
              <CardText>{resume?.projects.join(', ')}</CardText>
              <CardTitle>CGPA:</CardTitle>
              <CardText>{resume?.cgpa}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
};


