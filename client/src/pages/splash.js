import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const splash = () => {
  return (
    <div>
      <Jumbotron>
        <h1>Paperless Fundraisers</h1>
        <p>Fundraise with your products!</p>
        <p>
          <Button variant='primary'>Learn more</Button>
        </p>
      </Jumbotron>
    </div>
  );
};
export default splash;
