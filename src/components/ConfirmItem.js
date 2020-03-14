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
import shortid from "shortid";
import { db, storage } from "../App";

const ConfirmItem = ({ user, listings }) => {
  const { id } = useParams();
  const history = useHistory();
  const [listing, setListing] = useState({});
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    const listingInfo = listings.find(listingInfo => id === listingInfo[0]);
    if (listingInfo) setListing(listingInfo[1]);
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
    const id = shortid.generate();
    const imageRef = storage.child(`images/${id}`);
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
          <Image src={listing.image} fluid></Image>
        </Col>
        <Col xs={12} sm={6} lg={8}>
          <h3>{listing.name}</h3>
          <h5>Reward: ${listing.reward}</h5>
          <div>Date Lost: {listing.date_lost}</div>
          <div>Location Lost: {listing.location}</div>
          <div>Owner: {listing.owner}</div>
          <hr></hr>
          <h5>Did you find this item?</h5>
          <Form.Group>
            <Form.Label>Describe your finding:</Form.Label>
            <Form.Control rows="5" as="textarea" onChange={handleDescription} />
          </Form.Group>
          <Row>
            <Col xs={12} sm={6} md={5} lg={3}>
              {image ? (
                <Card.Img alt="" src={URL.createObjectURL(image)} />
              ) : null}
            </Col>
            <Col xs={12} sm={6} md={7} lg={9}>
              Upload photo of finding:
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
