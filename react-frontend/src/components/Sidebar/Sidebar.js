// src/components/Sidebar/Sidebar.js
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define your custom theme
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

const Sidebar = ({onLogout}) => {
  return (
    <ThemeProvider theme={theme}>
      <List sx={{
        width: '250px',
        height: '100vh',
        bgcolor: '#363D7E',
        padding: 0,
      }}>
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/estado-de-cuenta">
          <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
          <ListItemText primary="Estado de cuenta" />
        </ListItem>
        <ListItem button component={Link} to="/pagos">
          <ListItemIcon><PaymentsIcon /></ListItemIcon>
          <ListItemText primary="Pagos" />
        </ListItem>
        <ListItem button component={Link} to="/cuentas-bancarias">
          <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
          <ListItemText primary="Cuentas Bancarias" />
        </ListItem>
        <ListItem button onClick={onLogout}>
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary="Cerrar sesión" />
      </ListItem>

      </List>
    </ThemeProvider>
  );
};

export default Sidebar;
