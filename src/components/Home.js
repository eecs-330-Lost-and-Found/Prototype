import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

const Home = ({ listings }) => {
  const categoryNames = [
    "Electronics",
    "School Supplies",
    "Jewelry",
    "Wallet",
    "Others"
  ];
  const [viewableListings, setViewableListings] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setViewableListings(listings);
  }, [listings]);

  const toggleCategory = e => {
    if (categories.includes(e.target.value)) {
      setCategories(categories.filter(category => category !== e.target.value));
    } else {
      setCategories([...categories, e.target.value]);
    }
  };

  const applyFilter = () => {
    if (!categories.length) {
      setViewableListings(listings);
    } else {
      const filteredListings = listings.filter(([id, listing]) =>
        categories.includes(listing.category)
      );
      setViewableListings(filteredListings);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={4} md={4}>
          <h4>Categories:</h4>
          <div>
            {categoryNames.map(category => (
              <Form.Check
                label={category}
                value={category.toLowerCase()}
                onChange={toggleCategory}
              />
            ))}
          </div>
          <Button onClick={applyFilter}>Apply Filter</Button>
        </Col>
        <Col xs={12} sm={8} md={8}>
          <Row>
            {viewableListings.map(([id, listing]) => (
              <Col xs={12} sm={6} md={6} lg={4}>
                <Link to={`/confirm/${id}`}>
                  <Card>
                    <Card.Img variant="top" src={listing.image} />
                    <Card.Body>
                      <Card.Text>{listing.name}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
