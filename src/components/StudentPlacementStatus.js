import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { getMyPlacementStatus } from '../services/placement-status-service';
import './styles/Placementstatus.css'

export const StudentPlacementStatus = ({ userEmail }) => {
  const [placementStatus, setPlacementStatus] = useState(null);

  useEffect(() => {
    // Fetch placement status data from backend using userEmail
    // Assume data is returned in the following format:
    // {
    //   isPlaced: boolean,
    //   company: string,
    //   jobProfile: string,
    // }
    const fetchData = async () => {
      const response = await getMyPlacementStatus(userEmail);
      setPlacementStatus(response);
    };
    fetchData();
  }, [userEmail]);

  return (
    <Card>
      <CardBody>
        <CardTitle>Placement Status</CardTitle>
        {placementStatus ? (
          <>
            <CardSubtitle>
              {placementStatus.isPlaced ? 'Placed : Yes' : 'Not Placed Yet'}
            </CardSubtitle>
            {placementStatus.isPlaced && (
              <>
              <p>Name: {placementStatus?.placedJobApplication?.user?.name != null?placementStatus?.placedJobApplication?.user?.name != null:"N/A"}</p>
              <p>Roll No. : {placementStatus?.placedJobApplication?.user?.rollNo != null?placementStatus?.placedJobApplication?.user?.rollNo != null:"N/A"}</p>

                <p>Company: {placementStatus.placedJobApplication.jobOpening.company.companyName}</p>
                <p>Job Profile: {placementStatus.placedJobApplication.jobOpening.jobProfile}</p>
              </>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
        {/* <Button color="primary">Edit Status</Button> */}
      </CardBody>
    </Card>
  );
};

