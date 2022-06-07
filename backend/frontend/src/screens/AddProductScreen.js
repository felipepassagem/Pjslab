import React from 'react'
import Header from '../components/Header'
import ProductForm from '../components/ProductForm'
import { Col, Row } from "react-bootstrap";

function AddProductScreen() {
  return (
    <div>
      <Header></Header>
      <Row>
      <Col md={4}></Col>
      <Col md={4}>
        <ProductForm />
      </Col>
      <Col md={4}></Col>
      </Row>
    </div>
  )
}

export default AddProductScreen