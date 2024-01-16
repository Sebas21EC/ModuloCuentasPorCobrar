import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#4753A0', // Adjust the hover color as needed
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'white', // Icon color
        },
      },
    },
    MuiCollapse: {
      styleOverrides: {
        root: {
          color: 'white', // Icon color
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: 'white', // Text color
          fontFamily: 'Montserrat, sans-serif', // Font family
        },
      },
    },
  },
});


const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    backgroundColor: '#0038a4',
    widht: '25%',
    color: 'white',
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
    '& .MuiListItemText-primary': {
      color: 'white',
    },
  },
});
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      
      <List sx={{
          width: '250px',
          height: '100vh',
          bgcolor: '#001e58',
          padding: 0,
    
          '& .MuiListItem-root': {
            marginBottom: '10px',
            marginTop:'20px' // Ajusta el espaciado como desees
          },
        }}>
        {/* Otros elementos del menú aquí */}
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button component={Link} to="/estado-de-cuenta">
          <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
          <ListItemText primary="Estado de cuenta" />
        </ListItem>

        {/* Elemento desplegable */}
        <ListItem button onClick={handleClick}>
        <ListItemIcon><PaymentsIcon /></ListItemIcon>
          <ListItemText primary="Pagos" />
          {open ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItem button component={Link} to="/todos-los-pagos">
          <ListItemIcon><ReceiptIcon /></ListItemIcon>
          <ListItemText primary="Todos los Pagos" />
        </ListItem>

          <ListItem button component={Link} to="/agregar-pagos">
          <ListItemIcon><ReceiptIcon /></ListItemIcon>
          <ListItemText primary="Agregar Pagos" />
        </ListItem>
          <ListItem button component={Link} to="/detalles-pagos">
          <ListItemIcon><ReceiptIcon /></ListItemIcon>
          <ListItemText primary="Detalles de Pagos" />
        </ListItem>
            {/* Más subelementos aquí */}

            
          </List>
        </Collapse>
        <ListItem button component={Link} to="/cuentas-bancarias">
          <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
          <ListItemText primary="Cuentas Bancarias" />
        </ListItem>
        <ListItem button >
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary="Cerrar sesión" />
      </ListItem>
      </List>
    </ThemeProvider>
  );
};

export default Sidebar;
