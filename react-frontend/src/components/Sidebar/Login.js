import React, { useState,useContext } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./authActions";
import { saveToSessionStorage } from "./SessionStorage"; // Implementa esta función
import { API_BASE_URL, API_AUDIT_URL } from "../../config";
import { IPContext } from '../../IPContext';
// import API_AUDIT_URL from "../../config";

import {
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

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0", // un tono de azul
    },
    secondary: {
      main: "#2e7d32", // un tono de verde
    },
    background: {
      default: "#e8f5e9", // un tono de verde claro para el fondo
    },
    text: {
      primary: "#ffffff", // texto blanco para que resalte sobre el fondo oscuro
      secondary: "#000000", // texto negro para botones y entradas
    },
  },
  // Puedes añadir más personalizaciones aquí
});

function Login({ onLogin }) {
  const clientIP = useContext(IPContext);
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
     

      if (dataResponse.success) {
        //alert("Bienvenido");
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
                
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
       var response =  await fetch(`${API_AUDIT_URL}/audit`, {
          method: "POST",
          body: JSON.stringify({
            action: "Sesion started",
            description: `User : ${username}`,
            ip: clientIP,
            date: formattedDate,
            functionName: "AR-LOGIN",
            observation: `${username} started session`,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
         console.log("Sebas");

 console.log(response);
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
      
      setError(
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
          "::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: "url(/backgroud.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1, // Asegúrate de que la capa esté detrás del contenido
          },
          backgroundColor: "rgba(255, 255, 255, 0.4)", // Esto proporcionará la opacidad blanca
        }}
      >
        <Card
          sx={{
            minWidth: 600,
            maxWidth: 720,
            padding: 4,
            //backgroundColor: "#363D7E",
            backgroundColor: "rgba(54, 61, 126, 0.9)", // Opacidad aplicada al color azul
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
              sx={{
                color: "white",
                marginBottom: 2,
                fontWeight: "bold", // Peso de la fuente
                letterSpacing: 1, // Espaciado de letras
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Sombra del texto
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Tamaño de fuente responsivo
              }}
              variant="h4"
              component="div"
            >
              Bienvenido
            </Typography>
            <Typography
              sx={{
                color: "white",
                marginBottom: 3,
                fontWeight: "lighter", // Peso de la fuente más ligero para el subtítulo
                letterSpacing: 0.5, // Espaciado de letras para el subtítulo
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.5rem" }, // Tamaño de fuente responsivo para el subtítulo
              }}
              variant="subtitle1"
            >
              Módulo: Cuentas por Cobrar
            </Typography>
            <TextField
              sx={{
                marginBottom: 4,
                // Aplicar estilos al texto dentro del TextField
                input: { color: "white" },
                // Estilos para la etiqueta del TextField cuando está en estado "shrink"
                "& .MuiInputLabel-shrink": {
                  transform: "translate(18px, -15px) scale(0.75)", // Ajusta estos valores según sea necesario
                },
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
                marginBottom: 4,
                input: { color: "white" },

                // Estilos para la etiqueta del TextField cuando está en estado "shrink"
                "& .MuiInputLabel-shrink": {
                  transform: "translate(18px, -15px) scale(0.75)", // Ajusta estos valores según sea necesario
                },
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
  sx={{
    marginTop: 3,
    bgcolor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    padding: '10px 20px', // Aumentar el relleno para un aspecto más grande
    fontSize: '1rem', // Tamaño de fuente legible
    fontWeight: 'bold', // Fuente en negrita para que destaque
    textTransform: 'none', // Evitar la transformación de texto en mayúsculas
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Sombra para efecto 3D
    '&:hover': {
      bgcolor: theme.palette.primary.dark, // Oscurecer el botón al pasar el mouse
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.35)', // Sombra más profunda al pasar el mouse
      transform: 'translateY(-2px)', // Mover ligeramente el botón hacia arriba para efecto 3D
    },
    '&:active': {
      boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)', // Sombra más pequeña al hacer click
      transform: 'translateY(-1px)', // Mover ligeramente hacia abajo al hacer click
    },
    transition: 'all 0.3s ease', // Transición suave para todos los cambios de estado
  }}
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
