import React, { useState, useEffect } from "react";
import axios from "../../axiosSettings";
import BankAccountTable from "./BankAccountTable";
import AddBankAccountModal from "./AddBankAccountModal";
import EditBankAccountModal from "./EditBankAccountModal";
import RowDetailsModal from "../Modals/RowDetailsModal";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TitleSection from '../Sidebar/TitleSection';
import { API_BASE_URL, API_AUDIT_URL } from "../../config";

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
      console.log(result);
      //Auditoria
      const responseLogin = JSON.parse(sessionStorage.getItem("responseLogin"));
      const username = responseLogin ? responseLogin.username : null;
      const token = responseLogin ? responseLogin.token : null;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString(); // Esto formateará la fecha como una cadena en formato ISO8601
      const responseAudit = await fetch(`${API_AUDIT_URL}/audit`, {
        method: "POST",
        body: JSON.stringify({
          action: "Read Bank Accounts",
          description: `User ${username} read data from Bank Accounts`,
          ip: "192.168.0.102",
          date: formattedDate,
          functionName: "AR-BANK-ACCOUNTS-READ",
          observation: ` ${username}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //     
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
