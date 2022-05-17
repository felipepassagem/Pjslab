import React, { Fragment } from "react";
import { Col, Row, Form, Button, Card, Container } from "react-bootstrap";
import DentistForm from "../components/DentistForm";
import Header from '../components/Header'
import User from '../components/User'

function AddDentistScreen() {
  return (
    <Fragment>
    <Container>
        <Header></Header>
        <Row>
          <Col md={4}></Col>
          <Col md={4} className="pt-5">
            <DentistForm></DentistForm>
          </Col>
          <Col md={4} className="pt-5">
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default AddDentistScreen