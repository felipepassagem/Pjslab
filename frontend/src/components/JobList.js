import React, { useState, useEffect, Fragment } from "react";
import Header from "./Header";
import Jobs from "./Job";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import axios from "axios";
import "../../src/custom.css";
import Pagination from "./Pagination";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Form,
  Container,
  FormControl,
  Button,
} from "react-bootstrap";

function JobList() {
  const { name } = useParams();

  var values = [];
  var price = 0;
  const [temp, setTemp] = useState([])
  const [sort, setSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(16);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [login, setLogin] = useState(false);
  const [userJobs, setUserJobs] = useState([]);
  const [amount, setamount] = useState("0.00");
  const [discount, setDiscount] = useState(0.0);
  const cookies = new Cookies();
  var token = cookies.get("mycookie");
  const navigate = useNavigate();

  //Ensure user is loged in
  useEffect(() => {
    if (token === undefined || token === "") {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (sort === true) {
      var element = document.getElementById("due-switch");
      element.setAttribute("checked", true);
    }
  });
  /*
  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir?")) {
      fetch(`http://localhost:8000/api/jobs/${id}/`, {
        method: "Delete",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }).catch((error) => {
        console.log(error);
      });
      
    }
  };
  */

  const handleNewJob = (name) => {
    var id = undefined;
    navigate(`/job_reg/${name}/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir?")) {
      fetch(`http://localhost:8000/api/jobs/${id}/`, {
        method: "Delete",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((resp) => resp.json())
        .catch((error) => error)
        .then(
          fetch("http://localhost:8000/api/jobs/", {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${token}`,
            },
          })
            .then((resp) => resp.json())
            .then((resp) => setJobs(resp))
            .then(navigate(0))
            .then(() => {
              axios({
                method: "GET",
                url: "http://127.0.0.1:8000/api/jobs/",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Token ${token}`,
                },
              })
                .then((response) => {
                  console.log(response.data);
                  setJobs(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
        )
        .then(() => {
          //getToast(3)
        });
    }
  };

  //Get all the jobs
  useEffect(() => {
    if (token !== undefined && sort == false) {
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/jobs/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          var amount = 0;
          setJobs([]);
          if (response.data.length > 0) {
            if (name != undefined) {
              response.data.map((job) => {
                if (job.dentist == name) {
                  setJobs((jobs) => [...jobs, job]);
                  if (job.isPayed == false) {
                    amount += parseFloat(job.price);
                  }
                }

                setamount(amount);
              });
            } else {
              setJobs(response.data);
            }
          }
          setLogin(true);
        })
        /*
        if (sort) {
          var jobsByDue;
          console.log("aqui");
          jobsByDue = jobs.sort((a, b) => b.due.localeCompare(a.due));
          console.log(jobs);
          setJobs(jobsByDue);
        }
        */
        .catch((error) => {});
    }
  }, [token, sort]);

  useEffect(() => {
    if (sort) {
      var arr = []
      jobs.map((job) => {
        if (job.isFinished == false) {
          arr.push(job)
        }
      });
      setJobs(arr.sort((a, b) => a.due.localeCompare(b.due)))
      console.log(jobs)
    } else {
      
    }
  }, [sort]);
  

  const handleShowCards = () => {
    if (show == true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const indexLast = currentPage * postsPerPage;
  const indexFirst = indexLast - postsPerPage;
  const current = jobs.slice(indexFirst, indexLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Container>
        <Header login={login}></Header>
        {name != undefined ? (
          <Card>
            <Row>
              <Col>
                <Card>
                  <Button
                    className="btn btn-light"
                    xs={3}
                    onClick={() => handleShowCards()}
                  >
                    {show ? "Esconder" : "Mostrar"}
                  </Button>
                </Card>
              </Col>

              {show ? (
                <Row className="pt-2">
                  <Col id="col1" >
                    <Card
                    className=""
                    //bg={success}
                    //key={variant}
                    //text={variant.toLowerCase() === "light" ? "dark" : "white"}
                    //style={{ width: "18rem" }}
                    //className="mb-2"
                    >
                      <Card.Header>Valor em aberto</Card.Header>
                      <Card.Body>
                        <Card.Title> {amount} </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                    //bg={success}
                    //key={variant}
                    //text={variant.toLowerCase() === "light" ? "dark" : "white"}
                    //style={{ width: "18rem" }}
                    //className="mb-2"
                    >
                      <Card.Header>Desconto</Card.Header>
                      <Card.Body>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <Form.Control
                              type="number"
                              min="0"
                              max="100"
                              step=".5"
                              value={discount}
                              onChange={(e) => setDiscount(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                    //bg={success}
                    //key={variant}
                    //text={variant.toLowerCase() === "light" ? "dark" : "white"}
                    //style={{ width: "18rem" }}
                    //className="mb-2"
                    >
                      <Card.Header>Total</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          {" "}
                          {parseFloat(
                            amount * ((100 - discount) * 0.01)
                          ).toFixed(2)}{" "}
                        </Card.Title>
                        <Card.Text></Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ) : (
                <Row></Row>
              )}
              <Row>
                <Col>
                  <Button
                    className="btn btn-primary m-2"
                    onClick={() => handleNewJob(name)}
                  >
                    Novo
                  </Button>
                </Col>
              </Row>
            </Row>
          </Card>
        ) : (
          <></>
        )}

        <Row className="justify-content-center">
          <Row>
            <Col>
              <Form.Group>
                {name != undefined ? (
                  ""
                ) : (
                  <div>
                    <Row>
                      <Form className="d-flex pt-2">
                        <FormControl
                          type="search"
                          placeholder="Nome do dentista"
                          className="me-2"
                          aria-label="Search"
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                      </Form>
                    </Row>
                    <Row>
                      <Form>
                        <Form.Check
                        className="mt-1"
                          type="switch"
                          id="due-switch"
                          label="Entrega próxima"
                          value = {sort}
                          onClick={()=> {
                            if(sort){
                              setSort(false)
                              
                            } else {
                              setSort(true)
                              
                            }
                          }}
                        />
                      </Form>
                    </Row>
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col></Col>
            <Col>
              {name != undefined ? (
                ""
              ) : (
                <Card
                //bg={success}
                //key={variant}
                //text={variant.toLowerCase() === "light" ? "dark" : "white"}
                //style={{ width: "18rem" }}
                //className="mb-2"
                >
                  <Card.Header>Total em aberto:</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {jobs.map((job) => {
                        //values.push(parseFloat(job.price).toFixed(2))
                        if (job.isPayed == false) {
                          var temp = parseFloat(job.price);
                          price += temp;
                        }
                      })}
                      {parseFloat(price).toFixed(2)}
                    </Card.Title>
                    <Card.Text></Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
          {jobs.length > 0 ? (
            current
              .filter((job) => {
                if (search == "") {
                  return job;
                } else if (
                  job.dentist.toLowerCase().includes(search.toLowerCase())
                ) {
                  return job;
                }
              })
              .map((job, index) => {
                
                return (
                  <Col
                    key={index}
                    /*sm={12} md={6} lg={4} xl={3}*/ className="pt-3"
                  >
                    <Jobs job={job} handleDelete={handleDelete}></Jobs>
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
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={jobs.length}
          paginate={paginate}
        />
      </Container>
    </div>
  );
}

export default JobList;

//
