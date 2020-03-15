import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const Messages = ({ messages }) => {
  return (
    <Row>
      {messages.map(message => (
        <Col xs={12} sm={6} md={6} lg={4}>
          <Card>
            <Card.Img
              variant="top"
              style={{ height: "250px", objectFit: "cover" }}
              src={message.image}
            />
            <Card.Body>
              <Card.Text>{message.description}</Card.Text>
              <Button
                variant="outline-primary"
                href={`mailto:${message.sender}`}
              >
                Send Email to Finder
              </Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                Sent on {message.date_created}
              </small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Messages;
