import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { GlobalFilter } from "../Tables/GlobalFilter"; // Importa el componente GlobalFilter

const CustomerModal = ({ isOpen, onRequestClose, onSelectCustomer }) => {
    const [customers, setCustomers] = useState([]);
    const [allCustomers, setAllCustomers] = useState([]); // Guardar la lista completa de clientes
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchText, setSearchText] = useState("");
    

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/Customer`);
                setCustomers(response.data.data);
                setAllCustomers(response.data.data); // Guardar la lista completa en el estado
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };

        fetchCustomers();
    }, []);

    useEffect(() => {
        // Filtrar los clientes en tiempo real cada vez que el searchText cambie
        const filteredCustomers = allCustomers.filter((customer) =>
            customer.customerName?.toLowerCase().includes(searchText?.toLowerCase() || "") ||
            customer.customerId?.toString().includes(searchText) // Agregar filtro por ID
        );
        setCustomers(filteredCustomers);
    }, [searchText, allCustomers]);

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleConfirm = () => {
        if (selectedCustomer) {
            onSelectCustomer(selectedCustomer.customerId, selectedCustomer.customerName);
        }
        onRequestClose(); // Cierra el modal después de la selección
    };

    return (
        <Dialog open={isOpen} onClose={onRequestClose} fullWidth>
            <DialogTitle>Lista de Clientes</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Seleccione un cliente de la lista:
                </DialogContentText>
                <GlobalFilter
                    globalFilter={searchText}
                    setGlobalFilter={setSearchText} // Esto establece el texto de búsqueda en tiempo real
                />
                <List>
                    {customers.map((customer) => (
                        <ListItem
                        key={customer.customerId}
                        button
                        onClick={() => handleCustomerClick(customer)}
                        selected={selectedCustomer && selectedCustomer.customerId === customer.customerId}
                        style={{
                          backgroundColor: selectedCustomer && selectedCustomer.customerId === customer.customerId ? '#b6d7a8' : '', // Este es un color de ejemplo para el fondo
                          '&:hover': {
                            backgroundColor: '#a9db9e', // Un color ligeramente más claro para el efecto hover
                          },
                        }}
                      >
                            <ListItemText
                                primary={`${customer.customerName} - ${customer.customerId}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <Button
                variant="contained"
                color="primary"
                onClick={handleConfirm}
                style={{ margin: "16px" }}
            >
                Confirmar
            </Button>
        </Dialog>
    );
};

export default CustomerModal;