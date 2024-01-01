import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider
} from '@mui/material';

const theme = createTheme();

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de inicio de sesión aquí
    console.log(username, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          backgroundColor: '#CDDDEF',
        }}
      >
        <Card sx={{ minWidth: 275, maxWidth: 500, padding: 4, backgroundColor: '#363D7E' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography sx={{ color: 'white', marginBottom: 2 }} variant="h4" component="div">
              Bienvenido
            </Typography>
            <Typography sx={{ color: 'white', marginBottom: 3 }} variant="subtitle1">
              Módulo: Cuentas por Cobrar
            </Typography>
            <TextField
              sx={{ marginBottom: 2, input: { color: 'white' }, label: { color: 'white' } }}
              fullWidth
              label="Email"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              sx={{ marginBottom: 2, input: { color: 'white' }, label: { color: 'white' } }}
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button sx={{ marginTop: 3, bgcolor: 'white', color: 'black' }} variant="contained" onClick={handleLogin}>
              Iniciar Sesión
            </Button>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
