import React from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from 'moment';

function Jobs({ job, handleDelete }) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  var token = cookies.get("mycookie");

  const getToast = (n) => {
    if (n == 1) {
      return toast.success("Cadastro realizado com sucesso!");
    }
    if (n == 2) {
      return toast.error("Houve algum erro. Cadastro não realizado.");
    }
    if (n == 3) {
      return toast.info("Trabalho deletado.");
    }
  };

  const handleUpdateJob = (id) => {
    navigate(`/job/${id}`);
  };
/*
  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir")) {
      fetch(`http://localhost:8000/api/jobs/${id}/`, {
        method: "Delete",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then(()=>{
          navigate("/")
        })
        .catch((error) => {
          getToast(3);
        });
      
    }
  };
  */

  return (
    <div id='divtest'>
    <Card key={job.id} style={{ width: "18rem" }} id='jobcard' >
      <Card.Body>
        <Card.Title>Dr(a): {job.dentist}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Paciente: {job.patient}</ListGroupItem>
        <ListGroupItem>Trabalho: {job.jobType}</ListGroupItem>
        <ListGroupItem>Preço: {job.price}</ListGroupItem>
        
        <ListGroupItem>Para: {Moment(job.due).format('DD/MM/YYYY')}</ListGroupItem>
        <ListGroupItem variant={job.isFinished ? "success" : "danger"}>
          Finalizado: {job.isFinished ? Moment(job.finishedAt).format('DD/MM/YYYY') : "Não"}
        </ListGroupItem>
        <ListGroupItem variant={job.isPayed ? "success" : "danger"}>
          Pago: {job.isPayed ? "Sim" : "Não"}
        </ListGroupItem>
      </ListGroup>
      {/*
      <Card.Body>
        <Card.Text>{job.description}</Card.Text>
      </Card.Body>
      */}
      <Card.Body>
        <Button
          className="btn btn-info"
          onClick={() => handleUpdateJob(job.id)}
        >
          Info
        </Button>

        <Button
          className="btn btn-danger m-2"
          onClick={() => handleDelete(job.id)}
        >
          Del
        </Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Jobs;
