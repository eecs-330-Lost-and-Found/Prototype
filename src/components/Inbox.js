import React from "react";
import { Container, Row, Col, ListGroup, Tab, Image } from "react-bootstrap";
import Messages from "./Messages";

// Add sorting mechanism (as on the original HTML page)
const Inbox = ({ user, listings }) => {
  if (!user) {
    return <Container fluid>Please log in to view your inbox.</Container>;
  }
  const userListings = Object.values(listings).filter(
    listing => listing.owner === user.email
  );

  return (
    <Container fluid>
      <h1>Inbox</h1>
      <Tab.Container defaultActiveKey="#0">
        <Row>
          <Col lg={4}>
            <ListGroup variant="flush">
              {userListings.map((listing, i) => (
                <ListGroup.Item action key={i} href={`#${i}`}>
                  Item - {listing.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col lg={8}>
            <Tab.Content>
              {userListings.map((listing, i) => (
                <Tab.Pane key={i} eventKey={`#${i}`}>
                  <h3>{listing.name}</h3>
                  <div>
                    <Image
                      src={listing.image}
                      thumbnail
                      style={{ width: "300px" }}
                    />
                  </div>
                  <div>Date Lost: {listing.date_lost}</div>
                  <div>Location Lost: {listing.location}</div>
                  <div>Reward: ${listing.reward}</div>
                  <hr />
                  <h4 style={{ marginBottom: "20px" }}>Incoming Messages</h4>
                  <Messages messages={listing.messages} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Inbox;
