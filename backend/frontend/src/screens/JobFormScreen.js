import React, { Fragment } from 'react'
import JobForm from "../components/JobForm"
import { Col, Row, Form, Button, Card, Container } from "react-bootstrap";
import DentistForm from "../components/DentistForm";
import Header from '../components/Header'

function JobFormScreen() {
  return (
    <Fragment>
    <Container>
        <Header></Header>
        <Row>
          <Col md={4}></Col>
          <Col md={4} className="pt-5">
            <JobForm></JobForm>
          </Col>
          <Col md={4} className="pt-5">
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default JobFormScreen