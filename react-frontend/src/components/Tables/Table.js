import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { ColumnFilter } from "./ColumnFilter";
import { GlobalFilter } from "./GlobalFilter";
import StyledTable from './StyledTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';

import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  IconButton
} from '@mui/material';
const Table = ({ columns, data, onEditClick, onDeleteClick, onViewClick, onPrintClick, canEdit = true, canDelete = true, canView = true, canPrint }) => {

  // default column component
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: 5 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const totalPageCount = Math.ceil(rows.length / pageSize);
  const calculatedPageOptions = Array.from({ length: totalPageCount }, (_, index) => index + 1);

  return (
    <>
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <StyledTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const item = row.original; // Obtén el item actual

                  // Comprobación si la celda es para la columna de 'acciones'
                  if (cell.column.id === 'actions') {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {canEdit && (
                          <IconButton color="primary" onClick={() => onEditClick(item)}>
                            <EditIcon />
                          </IconButton>
                        )}
                        {canDelete && (
                          <IconButton color="error" onClick={() => onDeleteClick(item)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                        {canView && (
                          <IconButton onClick={() => onViewClick(item)}>
                            <VisibilityIcon />
                          </IconButton>
                        )}
                        {canPrint && (
                          <IconButton onClick={() => onPrintClick(item)}>
                            <PrintIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    );
                  }

                  // Renderiza la celda normalmente para otras columnas
                  return <TableCell {...cell.getCellProps()}>
                    {cell.column.format ? cell.column.format(cell.value) : cell.render("Cell")}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            style={{ marginRight: '10px', backgroundColor: '#0038a4', color: '#ffffff' }}
          >
            {"<<"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            style={{ marginRight: '10px', backgroundColor: '#0038a4', color: '#ffffff' }}
          >
            {"<"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => nextPage()}
            disabled={!canNextPage}
            style={{ marginRight: '10px', backgroundColor: '#0038a4', color: '#ffffff' }}
          >
            {">"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            style={{ backgroundColor: '#0038a4', color: '#ffffff' }}
          >
            {">>"}
          </Button>
        </div>
        <span style={{ marginLeft: '20px', marginRight: '10px', fontSize: '14px' }}>
          Página <strong>{pageIndex + 1}</strong> de {pageOptions.length}
        </span>
        <FormControl variant="outlined" size="small" style={{ marginRight: '10px', minWidth: '120px' }}>
          <InputLabel>Ir a la página:</InputLabel>
          <Select
            label="Ir a la página:"
            value={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          >
            {calculatedPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <InputLabel>Filas por página</InputLabel>
          <Select
            label="Filas por página"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 30].map((pageSizeOption) => (
              <MenuItem key={pageSizeOption} value={pageSizeOption}>
                {pageSizeOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default Table;
