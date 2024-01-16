import { useState } from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
  Búsqueda Global:{" "}
  <input
    type="text"
    value={value || ""}
    onChange={(e) => {
      setValue(e.target.value);
      onChange(e.target.value);
    }}
    placeholder="Ingrese un valor..."
    style={{
      fontSize: "1.1rem",
      margin: "1rem 0",
      width: "25%", // Ancho ajustado al 25%
    }}
  />
</span>

  
  );
};