import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DentistForm() {
  const [dentist, setDentist] = useState("");
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phone_number, setPhone] = useState("+55");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate();

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
    if (n == 4) {
      return toast.success("Atualização realizada!");
    }
    if (n == 5) {
      return toast.warning("Não foi possível atualizar os dados do dentista.");
    }
  };

  useEffect(() => {
    if (!token || token === "undefined") {
      navigate("/login");
    }
  });

  //const regClient = () => {
  //  APIService.AddClient({ name, phone_number, email, description, address, city}, token)
  //  .catch(error => console.log(error))
  //};
  useEffect(() => {
    if (id != undefined) {
      if (token !== undefined) {
        axios({
          method: "GET",
          url: `http://127.0.0.1:8000/api/dentists/`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
          .then((response) => {
            response.data.map((dentist) => {
              if (dentist.id == id) {
                setName(dentist.dentistName);
                setPhone(dentist.dentistPhone);
                setEmail(dentist.dentistEmail);
                setCity(dentist.dentistCity);
                setAddress(dentist.dentistAddress);
                setDescription(dentist.dentistDescription);
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/dentists/${id}/`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleAddDentist = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/dentists/",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      //timeout: 4000, // 4 segundos timeout
      data: {
        dentistName: name,
        dentistPhone: phone_number,
        dentistEmail: email,
        dentistDescription: description,
        dentistAddress: address,
        dentistCity: city,
      },
    })
      .then((response) => {
        navigate(-1);
        getToast(1);
      })
      .catch((error) => {
        console.log(error);
        getToast(2);
      });
  };

  const handleAUpdateDentist = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `http://127.0.0.1:8000/api/dentists/${id}/`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      //timeout: 4000, // 4 segundos timeout
      data: {
        dentistName: name,
        dentistPhone: phone_number,
        dentistEmail: email,
        dentistDescription: description,
        dentistAddress: address,
        dentistCity: city,
      },
    })
      .then((response) => {
        navigate(-1);
        getToast(4);
      })
      .catch((error) => {
        console.log(error);
        getToast(5);
      });
  };

  return (
    <div>
      
      <Card className="p-4">
        <Card.Title><h2>Dr(a)</h2></Card.Title>
        <Form
          onSubmit={id != undefined ? handleAUpdateDentist : handleAddDentist}
        >
          <Form.Group className="mb-3">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefone:</Form.Label>
            <Form.Control
              id="phone"
              type="phone"
              name="phone"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Form.Text className="text-muted">
              Formato: +55 55 5 5555-5555
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cidade:</Form.Label>
            <Form.Control
              id="city"
              type="text"
              name="city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Endereço:</Form.Label>
            <Form.Control
              id="address"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Obs:</Form.Label>
            <Form.Control
              id="desc"
              as="textarea"
              rows={5}
              name="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {id ? "Atualizar" : "Adicionar"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default DentistForm;
