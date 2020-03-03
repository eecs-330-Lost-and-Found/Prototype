import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import ImageUploader from "react-images-upload";

const FileItem = () => {
  const [isValidDate, setIsValidDate] = useState(true);
  const [isValidReward, setIsValidReward] = useState(true);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "electronics",
    location: "",
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

  const submitFormData = () => {
    for (const field in formData) {
      if (formData[field].length === 0) {
        return alert("Please fill in all fields.");
      }
    }
    if (!isValidDate || !isValidReward) {
      return alert("Ensure the date lost and reward are valid.");
    }
    alert("You have successfully filed an item!");
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={6}>
          <Form.Group>
            <Form.Label>Item name</Form.Label>
            <Form.Control
              placeholder="Item Name"
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
            <Form.Control
              placeholder="Enter address"
              onChange={handleChange("location")}
            />
          </Form.Group>
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
            <Form.Label>Reward</Form.Label>
            <Form.Control
              placeholder="Enter reward ($)"
              onChange={handleRewardChange}
              isInvalid={!isValidReward}
            />
            <Form.Control.Feedback type="invalid">
              Please enter correct currency format (ex. 29, 29.7, 29.70)
            </Form.Control.Feedback>
          </Form.Group>
          <Button onClick={submitFormData}>Submit</Button>
        </Col>
        <Col sm={12} md={6}>
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
              style={{ width: "400px" }}
              alt=""
              src={URL.createObjectURL(image)}
            />
          ) : (
            <Card.Img style={{ width: "400px" }} alt="" src={emptyImageURL} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FileItem;
