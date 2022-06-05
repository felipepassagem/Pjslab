import React, { useEffect, useState } from "react";
import {
  Row,
  Button,
  Table,
  Container,
} from "react-bootstrap";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ClientList() {
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const [dentists, setDentists] = useState([]);
  const navigate = useNavigate();

  const getToast = (n) => {
    if (n == 1) {
      return toast.success("Cadastro realizado com sucesso!");
    }
    if (n == 2) {
      return toast.error("Houve algum erro. Cadastro não realizado.");
    }
    if (n == 3) {
      return toast.info("Dentista deletado.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  });

  useEffect(() => {
    if (token !== undefined) {
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/dentists/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          setDentists(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  //updateclient
  const handleUpdate = (id) => {
    navigate(`/dentist/${id}`);
  };

  const handleDentistList = (name) => {
    navigate(`/${name}`);
  };
  /*
  const handleDentistQuote = (name) => {
    navigate(`/quote/${name}`)
  }
  */

  const handleNewJob = (name, id) => {
    navigate(`/job_reg/${name}/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir?")) {
      fetch(`http://localhost:8000/api/dentists/${id}/`, {
        method: "Delete",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((resp) => resp.json())
        .catch((error) => error)
        .then(
          fetch("http://localhost:8000/api/dentists/", {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${token}`,
            },
          })
            .then((resp) => resp.json())
            .then((resp) => setDentists(resp))
            .then(navigate(0))
            .then(() => {
              axios({
                method: "GET",
                url: "http://127.0.0.1:8000/api/dentists/",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Token ${token}`,
                },
              })
                .then((response) => {
                  console.log(response.data);
                  setDentists(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
        )
        .then(() => {
          getToast(3);
        });
    }
  };

  return (
    <div>
      <Container>
      <Button type='button' className='m-2' onClick={()=> navigate("/addDentist")}>Add</Button>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dentists.map((dentist, index) => {
                return (
                  <tr key={index}>
                    <td key={dentist.dentistName}>{dentist.dentistName}</td>
                    <td key={dentist.dentistPhone}>{dentist.dentistPhone}</td>
                    <td key={dentist.dentistCity}>{dentist.dentistCity}</td>
                    <td key={dentist.id}>
                      <button
                        className="btn btn-primary m-2"
                        onClick={() => handleDentistList(dentist.dentistName)}
                      >
                        Trabalhos
                      </button>
                      <button
                        className="btn btn-success m-2"
                        onClick={() =>
                          handleNewJob(dentist.dentistName, undefined)
                        }
                      >
                        Novo
                      </button>
                      <button
                        className="btn btn-info m-2"
                        onClick={() => handleUpdate(dentist.id)}
                      >
                        Atualizar
                      </button>
                      <button
                        className="btn btn-danger m-2"
                        onClick={() => handleDelete(dentist.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default ClientList;
