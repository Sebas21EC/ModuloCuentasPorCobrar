import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid
} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ pt: 8 }}>
      <Typography 
        variant="h2" 
        component="div" 
        gutterBottom 
        sx={{ 
          color: '#1976d2', 
          textTransform: 'uppercase', 
          fontWeight: 'bold', 
          mb: 4,
          textAlign: 'center'
        }}
      >
        Bienvenido al módulo de cuentas por cobrar
      </Typography>
      
      <Grid container spacing={4}>
        {/* Tarjeta de Resumen de Cuentas */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total de Cuentas
              </Typography>
              <Typography variant="body2">
                Resumen del total de cuentas por cobrar y su estado.
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              image="total-de-cuentas.png" // Reemplaza con la URL de tu imagen
              alt="Total de Cuentas"
            />
            <AccountBalanceWalletIcon sx={{ fontSize: 48, color: '#1976d2', p: 2 }} />
          </Card>
        </Grid>

        {/* Tarjeta de Últimas Actividades */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Últimas Actividades
              </Typography>
              <Typography variant="body2">
                Encuentra aquí las últimas transacciones realizadas.
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              image="ultimas-actividades.png" // Reemplaza con la URL de tu imagen
              alt="Últimas Actividades"
            />
            <AssessmentIcon sx={{ fontSize: 48, color: '#1976d2', p: 2 }} />
          </Card>
        </Grid>

        {/* Tarjeta de Gestión de Clientes */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Gestión de Clientes
              </Typography>
              <Typography variant="body2">
                Administra los datos de tus clientes y su historial de pagos.
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              image="clientes.png" // Reemplaza con la URL de tu imagen
              alt="Gestión de Clientes"
            />
            <PeopleIcon sx={{ fontSize: 48, color: '#1976d2', p: 2 }} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
