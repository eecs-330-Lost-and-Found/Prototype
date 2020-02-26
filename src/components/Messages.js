import React from "react";
import { Col, Card, Button } from "react-bootstrap";

const Messages = ({ messages }) => {
  return messages.map(message => (
    <Col xs={12} sm={6} md={6} lg={4} style={{ paddingLeft: "0px" }}>
      <Card>
        <Card.Img variant="top" src={message.image} />
        <Card.Body>
          <Card.Text>{message.description}</Card.Text>
          <Button variant="primary">Send Email to Finder</Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Sent on {message.date_created}</small>
        </Card.Footer>
      </Card>
    </Col>
  ));
};

export default Messages;
