import React, { Fragment } from "react";
import { Col, Row, Form, Button, Card, Container } from "react-bootstrap";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function LoginRegisterScreen({ username }) {
  return (
    <Fragment>
      <Container>
        <Header></Header>
        <Row>
          <Col md={3}></Col>
          <Col md={3} className="pt-5">
            <Card>
              <Card.Body>
                <LoginForm />
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="pt-5">
            <Card>
              <Card.Body>
                <RegisterForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default LoginRegisterScreen;
