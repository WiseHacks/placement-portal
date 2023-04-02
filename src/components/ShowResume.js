import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, CardText, Table, List } from 'reactstrap';
import { getCurrentUserDetail } from '../auth';

export const ResumeDisplay = ({ resume, isLoading }) => {
  const stringsss = ["help", "me", "please"];
  return (
    isLoading ? (<h1>....Loading</h1>) :
      <Container>

        {/* <Row>
          <Col sm="12" md={{ size: 12, offset: 0 }}> */}
            <Card>
              <CardHeader>
                <div class="d-flex justify-content-around align-items-center">
                  <h2>{resume?.name}</h2>
                  <h5>+91 {resume?.phoneNumber}</h5>
                  <h5>{getCurrentUserDetail().email}</h5>
                </div>
              </CardHeader>
              <CardBody>
                <Table className='table-fixed'>
                  {/* <thead>
                    <tr>
                      <th className='col-2'></th>
                      <th></th>
                    </tr>
                  </thead> */}
                  <tbody>
                    <tr>
                      <td className='col-3'>CGPA:</td>
                      <td>{resume?.cgpa}</td>
                    </tr>
                    <tr>
                      <td>Address:</td>
                      <td>{resume?.address}</td>
                    </tr>
                    <tr>
                      <td>Phone Number:</td>
                      <td>{resume?.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td>Work Experience:</td>
                      <td>{resume?.workExperience}</td>
                    </tr>
                    <tr>
                      <td>Education:</td>
                      <td>{resume?.education?.join(',\n')}</td>
                    </tr>
                    <tr>
                      <td>Skills:</td>
                      <td>{resume?.skills?.join(',\n')}</td>
                    </tr>
                    <tr>
                      <td>Projects:</td>
                      <td>{resume?.projects?.join(',\n')}</td>
                    </tr>
                    <tr>
                      <td>Achievements:</td>
                      <td>{stringsss.map(str => str + "\n").join("")}</td>
                    </tr>
                  </tbody>

                </Table>
              </CardBody>
            </Card>
          {/* </Col>
        </Row> */}
      </Container>

  );
};


