import React, { Fragment } from "react";
import { Col, Row, Form, Button, Card, Container } from "react-bootstrap";
import Header from '../components/Header'
import User from '../components/User'

function UserScreen() {
  return (
    <Fragment>
    <Container>
        <Header></Header>
        <Row>
          <Col md={4}></Col>
          <Col md={4} className="pt-5">
            <Card>
              <Card.Body>
                <User />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="pt-5">
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default UserScreen