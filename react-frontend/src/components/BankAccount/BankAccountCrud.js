import React, { useState, useEffect } from "react";
import axios from "axios";
import BankAccountTable from "./BankAccountTable";
import AddBankAccountModal from "./AddBankAccountModal";
import EditBankAccountModal from "./EditBankAccountModal";
import DeleteBankAccountModal from "./DeleteBankAccountModal";
import RowDetailsModal from "../Modals/RowDetailsModal";
import API_BASE_URL from "../../config";
import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
  Box,
} from "@mui/material";

function BankAccountCrud() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  

  useEffect(() => {
    Load();
  }, []);

  const Load = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/BankAccount`);
      setBankAccounts(result.data.data);
    } catch (err) {
      alert(err);
    }
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setShowEditModal(true);
  };

  const handleDeleteClick = (account) => {
    setSelectedAccount(account);
    setShowDeleteModal(true);
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = (item) => {
    setSelectedRow(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSearch = async (searchText) => {
    try {
      // Obtén el valor del campo de búsqueda
      const bankAccountIdToSearch = searchText.trim().toUpperCase().trim(); // Elimina espacios en blanco alrededor
  
      // Verifica si el campo de búsqueda está vacío
      if (!bankAccountIdToSearch) {
        // Si está vacío, carga todas las cuentas bancarias
        Load();
        return;
      }
  
      // Realiza la solicitud GET con el ID de cuenta bancaria en la URL
      const result = await axios.get(
        `${API_BASE_URL}/BankAccount/${bankAccountIdToSearch}`
      );
  
      // Verifica si se encontraron datos
      if (result.data) {
        // Actualiza el estado con los datos encontrados
        setBankAccounts([result.data.data]);
      } else {
        alert("La cuenta bancaria no fue encontrada.");
      }
    } catch (err) {
      
      console.error(err);
    }
  };
  
  // Manejar cambios en el campo de búsqueda
  const handleSearchTextChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    handleSearch(searchText);
  };
  

  return (
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between">
          <Grid item>
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
              Cuentas Bancarias Existentes
            </Typography>
          </Grid>
         
        </Grid>
      </Box>
      <Box my={2}>
  <Grid container spacing={2}>
    <Grid item xs={6}> {/* Cambiado a xs={9} para 3/4 del ancho */}
    <TextField
          fullWidth
          label="Buscar por código de cuenta bancaria"
          variant="outlined"
          value={searchText}
          onChange={handleSearchTextChange} 
        />
    </Grid>
    <Grid item xs={3}> {/* Cambiado a xs={3} para 1/4 del ancho */}
      <Button
        fullWidth
        variant="contained"
        onClick={Load}
      >
         TODAS LAS CUENTAS BANCARIAS
      </Button>
    </Grid>
    <Grid item xs={3}>
      <Button
        variant="contained"
        color="success"
        onClick={handleAddClick}
      >
       Agregar Cuenta Bancaria
      </Button>
    </Grid>
    
  </Grid>
</Box>

      <BankAccountTable
        bankAccounts={bankAccounts}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onViewClick={handleViewClick}
      />
      <AddBankAccountModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onLoad={Load}
      />
      <EditBankAccountModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        account={selectedAccount}
        onLoad={Load}
      />
      <RowDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        rowDetails={selectedRow}
      />
      {/* <DeleteBankAccountModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        account={selectedAccount}
        onLoad={Load}
      /> */}
    </Container>
  );
}

export default BankAccountCrud;
