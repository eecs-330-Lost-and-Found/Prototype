import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Tab, Image } from "react-bootstrap";
import "../styles/Inbox.css";
import Messages from "./Messages";

const Inbox = ({ user, listings }) => {
  if (!user) {
    return (
      <Container fluid>
        Please <Link to="/login">log in</Link> to view your inbox.
      </Container>
    );
  }

  const userListings = listings.filter(
    ([id, listing]) => listing.owner === user.email
  );

  return (
    <Container fluid>
      <h1>Inbox</h1>
      <Tab.Container
        defaultActiveKey={userListings.length ? `#${userListings[0][0]}` : null}
      >
        <Row>
          <Col lg={3}>
            <div className="item-count">
              You have posted {userListings.length} lost item(s):
            </div>
            <ListGroup variant="flush">
              {userListings.map(([id, listing]) => (
                <ListGroup.Item action key={id} href={`#${id}`}>
                  {listing.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col lg={9}>
            <Tab.Content>
              {userListings.map(([id, listing]) => (
                <Tab.Pane key={id} eventKey={`#${id}`}>
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
                  {listing.messages && <Messages messages={listing.messages} />}
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
