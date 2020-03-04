import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Card
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import ImageUploader from "react-images-upload";

const ConfirmItem = ({ listings }) => {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [image, setImage] = useState("");
  useEffect(() => {
    if (listings.length > parseInt(id)) {
      setListing(listings[id]);
    }
  }, [listings, id]);

  const handleImageUpload = images => {
    setImage(images[0]);
  };

  return Object.keys(listing).length ? (
    <Container fluid>
      <Row>
        <Col xs={12} sm={6} lg={4}>
          <h5>Photo of lost item:</h5>
          <Image src={listing.image} fluid></Image>
        </Col>
        <Col xs={12} sm={6} lg={8}>
          <h4>{listing.name}</h4>
          <h6>Reward: ${listing.reward}</h6>
          <div>Date Lost: {listing.date_lost}</div>
          <div>Location Lost: {listing.location}</div>
          <div>Owner: {listing.owner}</div>
          <hr></hr>
          <Form.Group>
            <Form.Label>Describe the Item You Found:</Form.Label>
            <Form.Control rows="5" as="textarea" />
          </Form.Group>
          <Row>
            <Col xs={12} sm={6} md={5} lg={3}>
              {image ? (
                <Card.Img alt="" src={URL.createObjectURL(image)} />
              ) : null}
            </Col>
            <Col xs={12} sm={6} md={7} lg={9}>
              Add a photo of the item you found:
              <ImageUploader
                withIcon={true}
                buttonText="Choose image"
                onChange={handleImageUpload}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                singleImage={true}
              />
              <Button style={{ float: "right" }}>Notify Owner</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid>Not a valid lost item.</Container>
  );
};

export default ConfirmItem;
