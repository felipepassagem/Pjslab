import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [err, setErr] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();

  //set user logout
  useEffect(() => {
    cookies.remove("mycookie");
  }, []);

  //Login function
  const handleLogin = (e) => {
    const getToast = (n) => {
      if (n === 1) {
        return toast.success("Login realizado com sucesso!");
      }
      if (n === 2) {
        return toast.error("Credenciais inválidas.");
      }
      if (n === 3) {
        return toast.error("Erro de conexão com servidor.");
      }
    };
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/auth/",
      /* url: "http://127.0.0.1:8000/auth/", */
      //timeout: 4000, // 4 segundos timeout
      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        cookies.set("mycookie", response.data.token);
        setToken(cookies.get("mycookie"));
        navigate("/");
        getToast(1);
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
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
