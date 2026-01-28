// pages/recover-password.js
"use client";
import { useState } from "react";
import axios from "axios";
import { Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
const { API_URL } = require("@/constants");

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      if (response.data.status === 400) {
        setError(response.data.message);
        setMessage("");
      } else {
        setMessage(response.data.message);
        setError("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error en la solicitud");
      setMessage("");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md="6" className="mx-auto">
          <div className="p-4 border rounded shadow-sm bg-light">
            <h2 className="text-center mb-4">Recuperar Contraseña</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese su email"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 w-100"
              style={{ backgroundColor: '#003366', borderColor: '#003366' }}>
                Enviar
              </Button>
            </Form>
            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
