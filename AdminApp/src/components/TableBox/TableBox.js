import "./TableBox.css";

const TableBox = ({ children, hasAdd, onAdd }) => {
  return (
    <div className="table-box">
      <div className="table-box__title-group">
        <div className="table-box__title">Rooms List</div>
        {hasAdd && (
          <button className="btn-add" onClick={onAdd}>
            Add New
          </button>
        )}
      </div>
      <table className="table-box__table styled-table">{children}</table>
    </div>
  );
};

export default TableBox;
