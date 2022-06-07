import React, { Fragment, useEffect } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function LoginRegisterScreen({ username }) {
  
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate()

  useEffect(() => {
     cookies.remove("mycookie")
     console.log(cookies.get("mycookie"))
     if(cookies.get("mycookie") != undefined){
       navigate(0)
     }
  });

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
