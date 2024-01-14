import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { ColumnFilter } from "./ColumnFilter";
import { GlobalFilter } from "./GlobalFilter";
import StyledTable from './StyledTable'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
    IconButton
  } from '@mui/material';
const Table = ({ columns, data , onEditClick, onDeleteClick, onViewClick,canEdit = true, canDelete = true , canView=true}) => {
    

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
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

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
              </TableCell>
            );
          }

          // Renderiza la celda normalmente para otras columnas
          return <TableCell {...cell.getCellProps()}>
          {cell.column.format ? cell.column.format(item[cell.column.accessor]) : cell.render("Cell")}</TableCell>;
        })}
      </TableRow>
    );
  })}
</TableBody>
</StyledTable>

      <div className="pagination" style={{ marginTop: "1rem" }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;