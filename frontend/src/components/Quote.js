import React, { useState, useEffect } from "react";
import Header from "./Header";
import Jobs from "./Job";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIService from "../APIServices";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
} from "react-bootstrap";

function Quote() {
  return (
    <div>
        <Col md={3}></Col>
    </div>
  )
}

export default Quote