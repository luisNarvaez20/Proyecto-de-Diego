'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
const { API_URL } = require("@/constants");
import { useRouter } from "next/navigation";
import mensajes from '@/app/components/Mensajes';

export default function RecoverPassword({ params }) {
    const [password, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [token, setToken] = useState('');
    const tokeni = params.token;
    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setToken(urlParams.get('token'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar contraseñas
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        // Enviar solicitud para actualizar la contraseña
        const response = await fetch(`${API_URL}/auth/recovery-password/${tokeni}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        const result = await response.json();

        if (response.ok) {
            setSuccess('Contraseña actualizada exitosamente.');
            setError('');
            mensajes("Contraseña Cambiada", "SuccesFul");
            router.push("/login");
        } else {
            setError(result.message);
            setSuccess('');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md="6" className="mx-auto">
                    <div className="p-4 border rounded shadow-sm bg-light">
                        <h2 className="text-center mb-4">Recuperar Contraseña</h2>
                        <Form onSubmit={handleSubmit}>
                            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
                            {success && <Alert variant="success" className="mb-3">{success}</Alert>}
                            <Form.Group controlId="newPassword">
                                <Form.Label>Nueva Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Ingrese su nueva contraseña"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirmar Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirme su nueva contraseña"
                                    required
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                className="mt-3 w-100"
                                style={{ backgroundColor: '#003366', borderColor: '#003366' }}
                            >
                                Actualizar Contraseña
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
