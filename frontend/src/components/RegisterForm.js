import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, ListGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIService from "../APIServices";
import Cookies from "universal-cookie";
import axios from "axios";
import "../custom.css"


import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [email, setEmail] = useState("")
  const [userList, setUserList] = useState([]);
  //username states
  const [unique, setUnique] = useState(true);
  const [comp, setComp] = useState(false)
  const [special, setSpecial] = useState(false)
  const [userOk, setUserOk] = useState(false)
  
  //password states
  const [passLen, setPassLen] = useState(false)
  const [passUpper, setPassUpper] = useState(false)
  const [passLower, setPassLower] = useState(false)
  const [passNum, setPassNum] = useState(false)
  const [passOk, setPassOk] = useState(false)

  const cookies = new Cookies();

  const navigate = useNavigate();

  const getToast = (n) => {
    if (n == 1) {
      return toast.success("Cadastro realizado com sucesso!");
    }
    if (n == 2) {
      return toast.error("Houve algum erro. Cadastro não realizado.");
    }
    if (n == 3) {
      return toast.error("Cadastro não realizado. Erro de conexão com servidor.");
    }
  }

  // user will always be logged off in this page
  useEffect(() => {
    cookies.remove("mycookie");
  }, []);
  //fetch usernames
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/users/",
    })
      .then((response) => {
        var data1 = response.data;
        var data = []
        data1.map((user) =>{
          data.push(user.username.toLowerCase())
        })
        setUserList(data);
        
      })
      .catch((error) => {
        getToast(2)
      });
  }, []);
  //control username validity
  useEffect(() => {
    if (userList.includes(username.toLowerCase())){
      setUnique(false)
    } else {
      setUnique(true)
    }

    if(username.length <= 3 || username.length >= 16){
      setComp(false)
      setUnique(false)
    } else {
      setComp(true)
    }

    if (!/[^a-zA-Z]/.test(username) && username.length > 0){
      setSpecial(true)
    } else {
      setSpecial(false)
    }

    if(unique === false || comp === false || special === false){
      document.getElementById('btn').setAttribute('disabled', 'disabled')
      setUserOk(false)
    } else {
      setUserOk(true)
    }
  }, [username, unique, special, comp]);
  //controll password validity
  useEffect(()=> {
    if(password.match(/[a-z]/)){
      setPassLower(true)
    } else {
      setPassLower(false)
    }

    if(password.length < 6){
      setPassLen(false)
    } else {
      setPassLen(true)
    }

    if(password.match(/[A-Z]/)){
      setPassUpper(true)
    } else {
      setPassUpper(false)
    }

    if(password.match(/[0-9]/)){
      setPassNum(true)
    } else {
      setPassNum(false)
    }

    if(passLen === false || passUpper === false || passLower === false || passNum === false){
      document.getElementById('btn').setAttribute('disabled', 'disabled')
      setPassOk(false)
    } else {
      setPassOk(true)
    }
  },[password, passLen, passUpper, passLower, passNum])
  //enable/disable submit button
  useEffect(() => {
    if(passOk === true && userOk === true && password === confirmation){
      document.getElementById('btn').removeAttribute('disabled')
    } else {
      document.getElementById('btn').setAttribute('disabled', 'disabled')
    }
  }, [username, password, passOk, userOk, confirmation])



  const handleRegister = (e) => {
    e.preventDefault()
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/users/",
        //timeout: 4000, // 4 segundos timeout
        data: {
          username: username,
          password: password,
          email: email,
        },
      })
        .then((response) => {
          navigate("/test")
          getToast(1)
        })
        .catch((error) => {
          if(error.response != undefined){
            const status = error.response.status;
            getToast(2);
          } else {
            getToast(3)
          }
        });
  };

  return (
    <div onSubmit={handleRegister}>
      <h2>Cadastrar</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text>
          <div >
          <ul id="list">
          <li><small className="">Nome de usuário deve:</small></li>
          <li><small className={comp ? "text-success " : "text-danger "}>Ser maior que 3 e menor que 16 caracteres</small></li>
          <li><small className={special ? "text-success " : "text-danger "}>Conter apenas letras</small></li>
          <li><small className={unique ? "text-success pt-1" : "text-danger pt-1"}>Ainda não ser usado</small></li>
          </ul>
          </div>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            required
            id="confirm"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text>
          <div >
          <ul id="list">
          <li><small className="">Senha deve:</small></li>
          <li><small className={passLen ? "text-success " : "text-danger "}>Ter mais que 6 caracteres</small></li>
          <li><small className={passLower ? "text-success " : "text-danger "}>Ter ao menos uma letra minúscula</small></li>
          <li><small className={passUpper ? "text-success " : "text-danger "}>Ter ao menos uma letra maiúscula</small></li>
          <li><small className={passNum ? "text-success " : "text-danger "}>Ter ao menos um número</small></li>
          </ul>
          </div>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id="confirm"
            type="password"
            name="confirmation"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" id="btn">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegisterForm;
