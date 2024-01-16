import React, { useState, useEffect } from "react";
import axios from "axios";
import BankAccountTable from "./BankAccountTable";
import AddBankAccountModal from "./AddBankAccountModal";
import EditBankAccountModal from "./EditBankAccountModal";
import RowDetailsModal from "../Modals/RowDetailsModal";
import API_BASE_URL from "../../config";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TitleSection from '../Sidebar/TitleSection';
import {
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";

function BankAccountCrud() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [columns] = useState("");
  


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

  
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = (item) => {
    setSelectedRow(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between">
          <Grid item>
          {/* <Typography 
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
            </Typography> */}
            <TitleSection title="Listado de Cuentas Bancarias" IconComponent={AccountBalanceIcon} />
          </Grid>
         
        </Grid>
      </Box>
      <Box my={2}>
  <Grid container spacing={2}>
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
        onViewClick={handleViewClick}
        columns={columns} 
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
        columns={BankAccountTable.columns} 
      />
      
    </Container>
  );
}

export default BankAccountCrud;
