import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./authActions";
import { saveToSessionStorage } from "./SessionStorage"; // Implementa esta función
import { API_BASE_URL, API_AUDIT_URL } from "../../config";
// import API_AUDIT_URL from "../../config";

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
  ThemeProvider,
} from "@mui/material";

const theme = createTheme();

function Login({ onLogin }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Realiza la solicitud HTTP al servidor de autenticación y obtén los datos de autenticación
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataResponse = await response.json();
      console.log(dataResponse);

      if (dataResponse.success) {
        alert("Bienvenido");
        const data = dataResponse.data;
        const { token, functions, username, email } = data;

        // Almacena el token y las funciones en Redux
        dispatch(loginSuccess(token, functions));

        // hacer un JSON para almacenar en el session storage
        const dataSession = {
          token,
          functions,
          username,
          email,
        };

        // Almacena las funciones en el almacenamiento de sesión (si es necesario)
        saveToSessionStorage("responseLogin", dataSession);

        //Auditoria
        const responseLogin = JSON.parse(
          sessionStorage.getItem("responseLogin")
        );
        const username1 = responseLogin ? responseLogin.username : null;
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
        const responseAudit = await fetch(`${API_AUDIT_URL}/audit`, {
          method: "POST",
          body: JSON.stringify({
            action: "Sesion started",
            description: `User : ${username}`,
            ip: "192.168.0.102",
            date: formattedDate,
            functionName: "AR-LOGIN",
            observation: `${username} started session`,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });


        onLogin();
      } else {
        // Manejo de errores de inicio de sesión
        const errorData = await response.json(); // Si el servidor devuelve información de error
        const errorMessage =
          errorData.message || "Usuario o contraseña incorrectos";

        // Establece el mensaje de error para mostrarlo al usuario
        setError(errorMessage);
      }
    } catch (error) {
      // Manejo de errores en caso de problemas con la solicitud
      console.error("Error en la solicitud de inicio de sesión:", error);
      alert(
        "Error en la solicitud de inicio de sesión, verifique las credenciales ingresadas"
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#CDDDEF",
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            maxWidth: 500,
            padding: 4,
            backgroundColor: "#363D7E",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "white", marginBottom: 2 }}
              variant="h4"
              component="div"
            >
              Bienvenido
            </Typography>
            <Typography
              sx={{ color: "white", marginBottom: 3 }}
              variant="subtitle1"
            >
              Módulo: Cuentas por Cobrar
            </Typography>
            <TextField
              sx={{
                marginBottom: 2,
                input: { color: "white" },
                label: { color: "white" },
              }}
              fullWidth
              label="Email"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              sx={{
                marginBottom: 2,
                input: { color: "white" },
                label: { color: "white" },
              }}
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography sx={{ color: "red", marginTop: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              sx={{ marginTop: 3, bgcolor: "white", color: "black" }}
              variant="contained"
              onClick={handleLogin}
            >
              Iniciar Sesión
            </Button>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
