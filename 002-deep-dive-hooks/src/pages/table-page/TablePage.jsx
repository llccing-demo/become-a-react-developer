import { useState, useContext } from "react";
import Proptypes from "prop-types";
import TableContext from "./TableContext";

const headers = [
  { title: "Name", name: "name" },
  { title: "Status", name: "status", Cell: StatusCell },
  { title: "Action", name: "action", Cell: DeleteCell },
];
const dataList = [
  { name: "apple", status: true },
  { name: "banana", status: false },
  { name: "strawberry", status: true },
];

const TableHeader = () => {
  const { cols } = useContext(TableContext);
  return (
    <div className="grid grid-cols-3">
      {cols.map((item) => {
        return (
          <div className="bg-blue-200 px-4 py-2" key={"th" + item.title}>
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

function DefaultCell({ value }) {
  DefaultCell.propTypes = {
    value: Proptypes.string,
  };

  return <div>{value}</div>;
}

function StatusCell({ value }) {
  StatusCell.propTypes = {
    value: Proptypes.bool,
  };

  return <div>{value ? "Nice" : "OK"}</div>;
}

function DeleteCell() {
  const { row, rows, setRows } = useContext(TableContext);
  const handleDelete = () => {
    const res = rows.filter((item) => item.name !== row.name);
    setRows(res);
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

function ComboCell() {
  const { row } = useContext(TableContext);

  const str = row.status ? "Nice" : "OK";

  return (
    <div>
      {row.name}, {str}
    </div>
  );
}

const TableCell = ({ col, row }) => {
  TableCell.propTypes = {
    col: Proptypes.object,
    row: Proptypes.object,
  };

  const value = row[col.name];
  const Component = col.Cell || DefaultCell;

  return <Component value={value} />;
};

const TableRow = ({ row }) => {
  TableRow.propTypes = {
    row: Proptypes.object,
  };

  const table = useContext(TableContext);
  const value = { ...table, row };
  const cols = table.cols;

  return (
    <TableContext.Provider value={value}>
      <div className="grid grid-cols-3" key={"row" + row.name}>
        {cols.map((col) => (
          <div key={`cell-${col.name}`} className="px-4">
            <TableCell col={col} row={row} />
          </div>
        ))}
      </div>
    </TableContext.Provider>
  );
};

const Table = ({ rows, cols, setRows }) => {
  Table.propTypes = {
    rows: Proptypes.array,
    cols: Proptypes.array,
    setRows: Proptypes.func,
  };

  const value = { rows, cols, setRows };
  return (
    <TableContext.Provider value={value}>
      <div className="max-w-2xl">
        <TableHeader />
        <div>
          {rows.map((row) => (
            <TableRow row={row} key={`row-${row.name}`} />
          ))}
        </div>
      </div>
    </TableContext.Provider>
  );
};

function TablePage() {
  const [rows, setRows] = useState(dataList);

  return <Table rows={rows} setRows={setRows} cols={headers} />;
}

export default TablePage;
