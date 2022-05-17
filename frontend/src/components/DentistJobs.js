/*import React, { useState, useEffect } from "react";
import Header from "./Header";
import Jobs from "./Job";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
} from "react-bootstrap";

function DentistJobs() {
  const [jobs, setJobs] = useState([]);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const token = cookies.get("mycookie");

  //Ensure user is loged in
  useEffect(() => {
    if (token === undefined || token === "") {
      navigate("/login");
    }
  });

  //Get all the jobs
  useEffect(() => {
    if (token !== undefined) {
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/jobs/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (response.data.length > 0) {
            setJobs(response.data);
          }
          setLogin(true);
        })
        .catch((error) => {});
    }
  }, [token]);

  return (
    <div>
      <Container>
        <Header login={login}></Header>
        <Row className="justify-content-center">
          {jobs.length > 0 ? (
            jobs.map((job, index) => {
              return (
                <Col key={index} sm={12} md={6} lg={4} xl={3} className="pt-3">
                  <Jobs job={job}></Jobs>;
                </Col>
              );
            })
          ) : (
            <div>
              <Card>
                <Card.Text>Nenhum trabalho cadastrado.</Card.Text>
              </Card>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default DentistJobs
*/