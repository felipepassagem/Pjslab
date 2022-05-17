import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  Card,
  Table,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import moment from "moment";

function ProductList() {
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate();
  const [products, setProducts] = useState("");
  const [data, setData] = useState([]);
  const [mprice, setMprice] = useState(0);
  const [monthYearListw, setMonthYearList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  });

  useEffect(() => {
    if (token !== undefined) {
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/products/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          setProducts(response.data);
          var monthYearList = [];
          var listList = [];
          var temp = [];
          var totalPrice = 0;
          var priceList = [];
          var month;
          var year;
          var x;
          var len = products.length;
          for (var i = 0; i < len; i++) {
            month = products[i].buyDate.split("-");
            x = month[1] + month[0];
            monthYearList.push(x);
          }
          for (var i = 0; i < len; i++) {
            month = products[i].buyDate.split("-")[1];
            year = products[i].buyDate.split("-")[0];
            var date = month + year;
            if (date == monthYearList[i + 1]) {
              temp.push(products[i]);
            } else {
              temp.push(products[i]);
              listList.push(temp);
              temp = [];
            }
          }
          for (var i = 0; i < listList.length; i++) {
            for (var l = 0; l < listList[i].length; l++) {
              totalPrice += parseFloat(
                listList[i][l].price * listList[i][l].quantity
              ).toFixed(2);
            }
            priceList.push(totalPrice);
            totalPrice = 0;
          }
          setMprice(priceList);
          setData(listList);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoading, deleted]);

  const handleHideTables = (id) => {
    if (document.getElementById(id).hidden) {
      document.getElementById(id).hidden = false;
    } else {
      document.getElementById(id).hidden = true;
    }
  };

  const EditBtn = (id) => {
    navigate(`/editproduct/${id}`, { replace: true });
  };

  const DelBtn = (id) => {
    if (window.confirm("Deseja realmente excluir?")) {
      fetch(`http://localhost:8000/api/products/${id}/`, {
        method: "Delete",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          setProducts(response.data);
          var monthYearList = [];
          var listList = [];
          var temp = [];
          var totalPrice = 0;
          var priceList = [];
          var month;
          var year;
          var x;
          var len = products.length;
          for (var i = 0; i < len; i++) {
            month = products[i].buyDate.split("-");
            x = month[1] + month[0];
            monthYearList.push(x);
          }
          for (var i = 0; i < len; i++) {
            month = products[i].buyDate.split("-")[1];
            year = products[i].buyDate.split("-")[0];
            var date = month + year;
            if (date == monthYearList[i + 1]) {
              temp.push(products[i]);
            } else {
              temp.push(products[i]);
              listList.push(temp);
              temp = [];
            }
          }
          for (var i = 0; i < listList.length; i++) {
            for (var l = 0; l < listList[i].length; l++) {
              totalPrice += parseFloat(
                listList[i][l].price * listList[i][l].quantity
              ).toFixed(2);
            }
            priceList.push(totalPrice);
            totalPrice = 0;
          }
          setMprice(priceList);
          setData(listList);
          setIsLoading(false);
          navigate(0)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Container>
        {products != [] ? (
          <div>
            {data.map((item, index) => (
              <div>
                <Card
                  onClick={() => handleHideTables(index)}
                  className="p-2 mt-3"
                >
                  <Card.Text>
                    {moment(item[0].buyDate).format("MM/YYYY")}
                  </Card.Text>
                </Card>
                <div>
                  <Table
                    id={index}
                    striped
                    bordered
                    hover
                    responsive
                    className="tables p-3"
                  >
                    <thead>
                      <tr key={item + index}>
                        <th>Produto</th>
                        <th>Data da compra</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data[index].map((product) => {
                        return (
                          <tr key={product.product}>
                            <td key={product.product}>{product.product}</td>
                            <td key={product.buyDate}>
                              {moment(product.buyDate).format("DD/MM/YY")}
                            </td>
                            <td key={product.quantity}>{product.quantity}</td>
                            <td key={product.price}>{product.price}</td>
                            <td>
                              {parseFloat(
                                parseFloat(
                                  product.price * product.quantity
                                ).toFixed(2)
                              )}
                            </td>
                            <td>
                              <Button
                                className="btn btn-primary m-1"
                                onClick={() => EditBtn(product.id)}
                              >
                                Edit
                              </Button>
                              <Button
                                className="btn btn-danger m-1"
                                onClick={() => DelBtn(product.id)}
                              >
                                Del
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td key={mprice[index]}>
                          Total: {parseFloat(mprice[index]).toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Card>
              <Card.Text>Ainda não há prdutos cadastrados.</Card.Text>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ProductList;

/* var monthYearList = [];
          var listList = [];
          var temp = [];
          var month;
          var year;
          var len = products.length;
          for (var i = 0; i < len; i++) {
            month = products[i].buyDate.split("-");
            monthYearList.push(month[1] + month[0]);
          }

          for (var i = 0; i < len; i++) {
            month = products[i].buyDate.split("-")[1];
            year = products[i].buyDate.split("-")[0];
            var date = month + year;
            if (date == monthYearList[i + 1]) {
              temp.push(products[i]);
            }
            if (date != monthYearList[i + 1]) {
              
              temp.push(products[i]);
              listList.push(temp);


              temp = [];
              temp.push(products[i]);
            }
          }
          
          setData(listList);
           */
