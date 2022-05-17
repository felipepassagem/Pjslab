import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

function ProductForm() {
  const { id } = useParams();
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate();
  const [body, setBody] = useState({
    product: "",
    buyDate: "",
    quantity: "",
    price: "",
  });
  const getToast = (n) => {
    if (n == 1) {
      return toast.success("Produto atualizado!");
    }
    if (n == 2) {
      return toast.error("Houve algum erro...");
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
    if (id != undefined) {
      axios({
        method: "GET",
        url: `http://127.0.0.1:8000/api/products/${id}/`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          setBody({ ...body, 
            product: response.data.product,
            buyDate: response.data.buyDate,
            quantity: response.data.quantity,
            price: response.data.price, })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `http://127.0.0.1:8000/api/products/${id}/`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      //timeout: 4000, // 4 segundos timeout
      data: body,
    })
      .then((response) => {
        getToast(1)
      })
      .catch((error) => {
        console.log(error);
        getToast(2)
      });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/products/",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
      //timeout: 4000, // 4 segundos timeout
      data: body,
    })
      .then((response) => {
        navigate(-1);
        /*  getToast(1) */
      })
      .catch((error) => {
        console.log(error);
        /* getToast(2) */
      });
  };

  return (
    <div>
      <Header></Header>
      <Form onSubmit={id != undefined ? handleUpdateProduct : handleAddProduct}>
        <Form.Group className="mb-3">
          <Form.Label>Produto:</Form.Label>
          <Form.Control
            id="product"
            type="text"
            name="product"
            value={body.product}
            onChange={(e) => setBody({ ...body, product: e.target.value })}
            required
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
            onChange={(e) => setBody({ ...body, price: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantidade:</Form.Label>
          <Form.Control
            id="name"
            type="number"
            name="name"
            min="1"
            value={body.quantity}
            onChange={(e) => setBody({ ...body, quantity: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data da compra:</Form.Label>
          <Form.Control
            required
            type="date"
            name="buyDate"
            id="byDate"
            value={body.buyDate}
            onChange={(e) => setBody({ ...body, buyDate: e.target.value })}
          />
        </Form.Group>

        <Button className="mb-5" type="submit" variant="primary">
          {id != undefined ? "Atualizar" : "Adicionar"}
        </Button>
      </Form>
    </div>
  );
}

export default ProductForm;
