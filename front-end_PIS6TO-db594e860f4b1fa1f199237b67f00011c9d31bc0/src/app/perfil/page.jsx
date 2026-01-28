'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { API_URL } from '@/constants';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 65px;
  background: linear-gradient(135deg, #f6f8fc, #eef1f5);
  min-height: 100vh;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #1e2a38;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 80%;
  max-width: 600px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 30px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const Value = styled.span`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 18px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 15px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const EditButton = styled(Button)`
  background-color: #28a745;
  &:hover {
    background-color: #218838;
  }
`;

export default function Perfil() {
  const [profileData, setProfileData] = useState({
    name: '',
    lastname: '',
    email: '',
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/account/fb042e31-a8de-4b5c-89cd-cc46b0ceb0a8`);
        const data = response.data;
        setProfileData({
          name: data.name,
          lastname: data.lastname,
          email: data.email,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/account/fb042e31-a8de-4b5c-89cd-cc46b0ceb0a8`, profileData);
      alert('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <Container>
      <Title>Perfil de Usuario</Title>
      <ProfileContainer>
        <ProfileImage src="https://via.placeholder.com/150" alt="Foto de Perfil" />
        {!editMode ? (
          <>
            <InfoBox>
              <Label>Nombre:</Label>
              <Value>{profileData.name}</Value>
            </InfoBox>
            <InfoBox>
              <Label>Apellido:</Label>
              <Value>{profileData.lastname}</Value>
            </InfoBox>
            <InfoBox>
              <Label>Correo Electrónico:</Label>
              <Value>{profileData.email}</Value>
            </InfoBox>
            <EditButton onClick={() => setEditMode(true)}>Editar Información</EditButton>
          </>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <Input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              placeholder="Nombre"
            />
            <Input
              type="text"
              name="lastname"
              value={profileData.lastname}
              onChange={handleInputChange}
              placeholder="Apellido"
            />
            <Input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              placeholder="Correo Electrónico"
            />
            <ButtonContainer>
            <Button type="submit">Guardar Cambios</Button>
            
            <Button type="button" onClick={() => setEditMode(false)}>Cancelar</Button>
            </ButtonContainer>
           
          </form>
        )}
      </ProfileContainer>
    </Container>
  );
}
