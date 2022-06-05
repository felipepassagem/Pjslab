import React, { useState, useEffect } from "react";
import {  Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import axios from "axios";

//fazer a função de mudança de senha///////////////////////////////////////////////////////////////////////////////////
import "../custom.css";

function User() {
  const { id } = useParams();
  //const [realId, setRealId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  //const [ body, setBody] = useState({
  //  username: '',
  //  email: '',
  //  password: '',
  //})
  const cookies = new Cookies();

  const [token, setToken] = useState(0);

  useEffect(() => {
    setToken(cookies.get("mycookie"));
  }, []);
  /*
  const [unique, setUnique] = useState(true);
  const [comp, setComp] = useState(false);
  const [special, setSpecial] = useState(false);
  const [userOk, setUserOk] = useState(false);
*/
  const [passLen, setPassLen] = useState(false);
  const [passUpper, setPassUpper] = useState(false);
  const [passLower, setPassLower] = useState(false);
  const [passNum, setPassNum] = useState(false);
  const [passOk, setPassOk] = useState(false);

  const getToast = (n) => {
    if (n == 1) {
      return toast.success("Cadastro realizado com sucesso!");
    }
    if (n == 2) {
      return toast.error("Houve algum erro. Cadastro não realizado.");
    }
    if (n == 3) {
      return toast.error("Faz isso não...");
    }
  };

  useEffect(() => {
    setToken(cookies.get("mycookie"));
    console.log(token)
    if (token !== undefined) {
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/users/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (response.data[0].id == id) {
            axios({
              method: "GET",
              url: `http://127.0.0.1:8000/api/users/${id}/`,
            })
              .then((response) => {
                var data = response.data;
                setUsername(data.username);
                setEmail(data.email);
              })
              .catch((error) => {
                console.log(error);
                getToast(2);
              });
          } else {
            getToast(3);
          }
        })
        .catch((error) => {});
    }
  }, [token]);

  //fetch user data
  /*
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8000/api/users/${id}/`,
    })
      .then((response) => {
        var data = response.data;
        setUsername(data.username);
        setEmail(data.email);
        //data1.map((user) =>{
        //  data.push(user.username.toLowerCase())
        //})
        //setUserList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  */

  /*const updateUser = ((e) => {
    setToken(cookies.get('mycookie'))
      axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/users/${id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        data: {
          username: username,
          epassword: newPassword,
          mail: email,
        }
      })
        .then((response) => {
          console.log("aquiiii")
        })
        .catch((error) => {
        });
  }, [token]);
  */

  //controll new password validity
  /*
  useEffect(() => {
    if (newPassword.match(/[a-z]/)) {
      setPassLower(true);
    } else {
      setPassLower(false);
    }

    if (newPassword.length < 6) {
      setPassLen(false);
    } else {
      setPassLen(true);
    }

    if (newPassword.match(/[A-Z]/)) {
      setPassUpper(true);
    } else {
      setPassUpper(false);
    }

    if (newPassword.match(/[0-9]/)) {
      setPassNum(true);
    } else {
      setPassNum(false);
    }

    if (
      passLen === false ||
      passUpper === false ||
      passLower === false ||
      passNum === false
    ) {
      document.getElementById("btn").setAttribute("disabled", "disabled");
      setPassOk(false);
    } else {
      setPassOk(true);
    }
  }, [newPassword, passLen, passUpper, passLower, passNum]);
  */

  //enable/disable submit button
  /*
  useEffect(() => {
    if (passOk === true && newPassword === confirmation) {
      document.getElementById("btn").removeAttribute("disabled");
    } else {
      document.getElementById("btn").setAttribute("disabled", "disabled");
    }
  }, [username, newPassword, passOk, confirmation]);
  */

  return (
    <div>
      <h2>Dados do usuário:</h2>
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
            value={username}
            readOnly
          />
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
            readOnly
          />
        </Form.Group>
        {/* 
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Nova senha:</Form.Label>
          <Form.Control
            id="confirm"
            type="password"
            name="confirmation"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Form.Text>
            <div>
              <ul id="list">
                <li>
                  <small className="">Senha deve:</small>
                </li>
                <li>
                  <small className={passLen ? "text-success " : "text-danger "}>
                    Ter mais que 6 caracteres
                  </small>
                </li>
                <li>
                  <small
                    className={passLower ? "text-success " : "text-danger "}
                  >
                    Ter ao menos uma letra minúscula
                  </small>
                </li>
                <li>
                  <small
                    className={passUpper ? "text-success " : "text-danger "}
                  >
                    Ter ao menos uma letra maiúscula
                  </small>
                </li>
                <li>
                  <small className={passNum ? "text-success " : "text-danger "}>
                    Ter ao menos um número
                  </small>
                </li>
              </ul>
            </div>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nova senha:</Form.Label>
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
        */}
      </Form>
      
    </div>
  );
}

export default User;
