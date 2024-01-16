import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Topbar = () => {
  const location = useLocation();
  let title;

  switch (location.pathname) {
    case '/':
      title = 'BIENVENIDO';
      break;
    // case '/estado-de-cuenta':
    //   title = 'Estado de Cuenta';
    //   break;
    // case '/pagos':
    //   title = 'Pagos';
    //   break;
    // Agrega más rutas y títulos según sea necesario
    default:
      title = 'MÓDULO DE CUENTAS POR COBRAR';
  }

  return (
    <AppBar position="static" style={{ backgroundColor: '#000d25', height:'50px', width:'100%'}}>
      <Toolbar>
        <Typography variant="h6" style={{ color: '#FFF', textAlign:'center' }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
