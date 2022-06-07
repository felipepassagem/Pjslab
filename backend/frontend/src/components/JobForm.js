import React, { useState, useEffect } from "react";
import { Col, Card, Form, Button } from "react-bootstrap";
import APIService from "../APIServices";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function AddJob() {
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate();
  const { name, id } = useParams();
  //form states
  const [dentist, setDentist] = useState(name);
  const [btn, setBtn] = useState()
  
  
  
  const [body, setBody] = useState({
    dentist: name,
    patient: '',
    jobType: '',
    description: '',
    price: '',
    due: '',
    finishedAt: '',
    isFinished: false,
    isPayed: false,
  });
  

  const getToast = (n) => {
    if (n == 1) {
      return toast.success("Trabalho adicionado!");
    }
    if (n == 2) {
      return toast.error("Houve algum erro...");
    }
    if (n == 3) {
      return toast.info("Trabalho deletado.");
    }
    if (n == 4) {
      return toast.success("Atualização realizada.");
    }
    if (n == 5) {
      return toast.error("Houve algum erro drante a atualização...");
    }
  };

  useEffect(()=>{
    console.log(token)
      axios({
        method: "GET",
        url: `http://localhost:8000/api/jobs/${id}/`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          const data = response.data
          console.log(data)
          setDentist(data.dentist)
          setBody({
            dentist: data.dentist,
            patient: data.patient,
            jobType: data.jobType,
            description: data.description,
            price: data.price,
            due: data.due,
            finishedAt: data.finishedAt,
            isFinished: data.isFinished,
            isPayed: data.isPayed,
          })
        })
        .catch((error) => {
          console.log(error)
        });
    
  }, [])

  useEffect(() => {
    if (body.isFinished === true) {
      var element = document.getElementById("custom");
      element.setAttribute("checked", true);
    }

    if (body.isPayed === true) {
      var element = document.getElementById("custom-switch");
      element.setAttribute("checked", true);
    }
  });

  useEffect(()=> {
    if(id == "undefined"){
      setBtn(false)
    } else {
      setBtn(true)
    }
  } ,[])
  console.log(btn)
  
  
/*
  useEffect(() => {
    if (token !== undefined) {
      axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/users/`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          console.assert.log(response)
        })
        .catch((error) => {
        });
    }
  }, [token]);
  */

  const handleUpdateJob = (e) => {
    e.preventDefault()
    axios({
        method: "PUT",
        url: `http://127.0.0.1:8000/api/jobs/${id}/`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        //timeout: 4000, // 4 segundos timeout
        data: body,
      })
        .then((response) => {
          navigate(-1)
          getToast(4)
          
        })
        .catch((error) => {
          console.log(error)
          getToast(5)
        });
  }


  const handleAddJob = (e) => {
    e.preventDefault()
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/jobs/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        //timeout: 4000, // 4 segundos timeout
        data: body,
      })
        .then((response) => {
          navigate(-1)
          getToast(1)
          
        })
        .catch((error) => {
          console.log(error)
          getToast(2)
        });
  };


  return (
    <div>
      <Card className="p-4">
        <Card.Title><h2>Novo Trabalho</h2></Card.Title>
      
      <Form onSubmit={name != undefined ? handleAddJob : handleUpdateJob}>

      <Form.Group className="mb-3">
          <Form.Label>Dentista:</Form.Label>
          <Form.Control
            readOnly
            type="text"
            name="client"
            id="client"
            value={dentist}
          />
        </Form.Group>
      

        <Form.Group className="mb-3">
          <Form.Label>Paciente:</Form.Label>
          <Form.Control
            type="text"
            name="patient"
            id="patient"
            value={body.patient}
            onChange={(e) => setBody({...body, patient: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trabalho:</Form.Label>
          <Form.Control
            type="text"
            name="jobType"
            id="jobType"
            value={body.jobType}
            onChange={(e) => setBody({...body, jobType: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrição: </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            type="text"
            name="description"
            id="description"
            value={body.description}
            onChange={(e) => setBody({...body, description: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preço:</Form.Label>
          <Form.Control
            required
            placeholder="10,00"
            type="number"
            name="price"
            id="price"
            min="0"
            step=".01"
            value={body.price}
            onChange={(e) => setBody({...body, price: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Previsão de entrega:</Form.Label>
          <Form.Control
            required
            type="date"
            name="due"
            id="due"
            value={body.due}
            onChange={(e) => setBody({...body, due: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data de entrega:</Form.Label>
          <Form.Control
            required
            type="date"
            name="finishedAt"
            id="finishedAt"
            value={body.finishedAt}
            onChange={(e) => setBody({...body, finishedAt: e.target.value})}
          />
        </Form.Group>

        <Form.Check
          type="switch"
          id="custom"
          label="Terminado?"
          value={body.isFinished}
          onClick={() => {
            if (body.isFinished === false) {
              setBody({...body, isFinished: true});
            } else {
              setBody({...body, isFinished: false});
            }
          }}
        />
        <br></br>
        <Form.Check className="mb-3"
          type="switch"
          id="custom-switch"
          label="Pago?"
          value={body.isPayed}
          onClick={() => {
            if (body.isPayed === false) {
              setBody({...body, isPayed: true});
            } else {
              setBody({...body, isPayed: false});
            }
          }}
        />
        <Button className="mb-5" type="submit" variant="primary">
          {btn ?  "Atualizar" : "Adicionar"}
        </Button>
        
      </Form>
      </Card>
    </div>
  );
}

export default AddJob;