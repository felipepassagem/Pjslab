import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Header({ login }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("mycookie");

  const nav = () => {
    navigate("/");
  };

  const getToast = (n) => {
    if (n === 1) {
      return toast.warning("Usuário deslogado.");
    }
    if (n === 2) {
      return toast.error("Logot error.");
    }
  };

  useEffect(() => {
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
          setId(response.data[0].id);
          setUsername(response.data[0].username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const logout = () => {
    console.log(token);
    cookies.remove("mycookie");
    navigate("/login");
    getToast(1);
  };

  const userButton = (id) => {
    navigate(`/user/${id}`);
  };

  if (token !== undefined && token !== "")
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Nav>
              <Nav.Link className="navbtn" onClick={() => nav()}>
                <Navbar.Brand>{username}</Navbar.Brand>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/dentist_list">Dentistas</Nav.Link>
              <Nav.Link href="/job_list">Trabalhos</Nav.Link>
              <Nav.Link href="/productlist">Produtos</Nav.Link>
              <Nav.Link href="/dashboard/">Dashboard</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => userButton(id)}>Usuário</Nav.Link>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
              </Navbar.Collapse>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  else
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Nav>
              <Nav.Link>
                <Navbar.Brand></Navbar.Brand>
              </Nav.Link>
            </Nav>

            <Nav>
              <LinkContainer to="/login">
                <Navbar.Brand
                  className="navbtn"
                  onClick={() => cookies.remove("mycookie")}
                >
                  Login
                </Navbar.Brand>
              </LinkContainer>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
}

export default Header;
