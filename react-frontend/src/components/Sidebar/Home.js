import React from "react";
import { Container, Typography } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="md" style={{ paddingTop: "64px" }}>
     
        <Typography variant="h4" component="div" gutterBottom>
          Bienvenido al módulo de cuentas por cobrar
        </Typography>
        <Typography variant="body1" gutterBottom>
          En este módulo, podrás administrar de manera eficiente tus cuentas por
          cobrar y llevar un registro detallado de tus transacciones
          financieras.
        </Typography>
        <img
          src="cuentas.jpg" // Reemplaza con la URL de tu imagen
          alt="Cuentas por cobrar"
          style={{ maxWidth: "100%", marginTop: "16px" , height:"50vh"}}
        />
      
    </Container>
  );
}

export default Home;
