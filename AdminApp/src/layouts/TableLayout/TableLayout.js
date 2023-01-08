import "./TableLayout.css";

const TableLayout = ({ children, title, hasAdd, onAdd }) => {
  return (
    <div className="table-layout">
      <div className="table-layout__title-group">
        <div className="table-layout__title">{title}</div>
        {hasAdd && (
          <button className="btn-add" onClick={onAdd}>
            Add New
          </button>
        )}
      </div>
      <table className="table-layout__table">{children}</table>
    </div>
  );
};

export default TableLayout;
