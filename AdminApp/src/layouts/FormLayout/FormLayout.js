import "./FormLayout.css";

const FormLayout = ({ children, title, onSubmit }) => {
  return (
    <div className="form-layout">
      <div className="form-layout__title">{title}</div>
      <form className="form-layout__form" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default FormLayout;
