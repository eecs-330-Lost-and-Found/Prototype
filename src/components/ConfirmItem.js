import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
  Spinner
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import ImageUploader from "react-images-upload";
import { db, storage } from "../App";

const ConfirmItem = ({ user, listings }) => {
  const { id } = useParams();
  const history = useHistory();
  const [listing, setListing] = useState({});
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    if (listings.length > parseInt(id)) {
      setListing(listings[id]);
    }
  }, [listings, id]);

  const handleDescription = e => {
    setDescription(e.target.value);
  };

  const handleImageUpload = images => {
    setImage(images[0]);
  };

  const handleSubmit = async () => {
    if (!user) {
      return alert("Log in before confirming that you found a lost item.");
    } else if (description.length < 30) {
      return alert("Ensure your description is at least 30 characters.");
    } else if (!image) {
      return alert("Please include a photo of the item you found.");
    }
    const imageRef = storage.child(`images/${image.name}`);
    setShowSpinner(true);
    const snapshot = await imageRef.put(image);
    const downloadUrl = await snapshot.ref.getDownloadURL();
    const message = {
      date_created: new Date().toLocaleDateString(),
      description,
      image: downloadUrl,
      email: user.email
    };
    db.child(`listings/${id}`).update({
      ...listing,
      messages: [...listing.messages, message]
    });
    setShowSpinner(false);
    alert(`Successfully Added!`);
    history.push("/");
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
            <Form.Control rows="5" as="textarea" onChange={handleDescription} />
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
              {showSpinner && <Spinner animation="border" />}
              <Button style={{ float: "right" }} onClick={handleSubmit}>
                Notify Owner
              </Button>
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
