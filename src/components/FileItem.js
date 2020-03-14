import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Spinner
} from "react-bootstrap";
import ImageUploader from "react-images-upload";
import LocationPicker from "react-location-picker";
import { db, storage } from "../App";
import shortid from "shortid";
import "../styles/FileItem.css";

const FileItem = ({ user }) => {
  const history = useHistory();
  const [isValidDate, setIsValidDate] = useState(true);
  const [isValidReward, setIsValidReward] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "electronics",
    location: "Old Dorm, Evanston, IL 60208",
    date_lost: "",
    reward: ""
  });

  const handleChange = type => {
    return e => {
      setFormData({
        ...formData,
        [type]: e.target.value
      });
    };
  };

  const handleDateChange = e => {
    const currVal = e.target.value;
    const isDate = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(
      currVal
    );
    if (!isDate && currVal !== "") {
      setIsValidDate(false);
    } else {
      setIsValidDate(true);
    }
    setFormData({ ...formData, date_lost: currVal });
  };

  const handleRewardChange = e => {
    const currVal = e.target.value;
    const isPrice = /^[0-9]+(\.[0-9][0-9]?)?$/.test(currVal);
    if (!isPrice && currVal !== "") {
      setIsValidReward(false);
    } else {
      setIsValidReward(true);
    }
    setFormData({ ...formData, reward: currVal });
  };

  const handleImageUpload = images => {
    setImage(images[0]);
  };

  const emptyImageURL =
    "https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png";

  const submitFormData = async () => {
    if (!user) {
      return alert("Log in before filing a lost item.");
    }
    for (const field in formData) {
      if (formData[field].length === 0) {
        return alert("Please fill in all fields.");
      }
    }
    if (!isValidDate || !isValidReward) {
      return alert("Ensure the date lost and reward are valid.");
    } else if (!image) {
      return alert("Please include a photo of the item you found.");
    }
    const id = shortid.generate();
    const imageRef = storage.child(`images/${id}`);
    setShowSpinner(true);
    const snapshot = await imageRef.put(image);
    const downloadUrl = await snapshot.ref.getDownloadURL();
    const data = {
      ...formData,
      image: downloadUrl,
      owner: user.email,
      messages: []
    };
    await db.child(`listings/${id}`).update(data);
    setShowSpinner(false);
    alert("You have successfully filed an item!");
    history.push("/");
  };

  const onPositionChange = ({ address }) => {
    setFormData({ ...formData, location: address });
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={6}>
          <h3>File a Lost Item</h3>
          <hr />
          <Form.Group>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              placeholder="(ex. Black iPhone 11 Pro)"
              onChange={handleChange("name")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Item Category</Form.Label>
            <Form.Control as="select" onChange={handleChange("category")}>
              <option value="electronics">Electronics</option>
              <option value="school supplies">School Supplies</option>
              <option value="jewelry">Jewelry</option>
              <option value="wallet">Wallet</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Location Last Seen</Form.Label>
            <LocationPicker
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "320px" }} />}
              defaultPosition={{ lat: 42.055984, lng: -87.675171 }}
              onChange={onPositionChange}
              zoom={15}
              radius={100}
            />
            <div className="address-box">
              {formData.location
                ? formData.location
                : "Not a valid address. Please move the picker."}
            </div>
          </Form.Group>
        </Col>

        <Col sm={12} md={6}>
          <Form.Group>
            <Form.Label>Date Lost</Form.Label>
            <Form.Control
              placeholder="YYYY-MM-dd"
              onChange={handleDateChange}
              isInvalid={!isValidDate}
            />
            <Form.Control.Feedback type="invalid">
              Please enter correct date format (ex. 2020-02-20)
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Reward ($)</Form.Label>
            <Form.Control
              placeholder="(ex. 30.75)"
              onChange={handleRewardChange}
              isInvalid={!isValidReward}
            />
            <Form.Control.Feedback type="invalid">
              Please enter correct currency format (ex. 29, 29.7, 29.70)
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Label>Upload image of your item</Form.Label>
          <ImageUploader
            withIcon={true}
            buttonText="Choose image"
            onChange={handleImageUpload}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            singleImage={true}
          />
          {image ? (
            <Card.Img
              style={{ width: "270px", height: "270px" }}
              alt=""
              src={URL.createObjectURL(image)}
            />
          ) : (
            <Card.Img
              style={{ width: "260px", height: "260px" }}
              alt=""
              src={emptyImageURL}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={submitFormData}>Submit</Button>
          {showSpinner && <Spinner animation="border" />}
        </Col>
      </Row>
    </Container>
  );
};

export default FileItem;
