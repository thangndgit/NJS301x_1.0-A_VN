import css from "./Button.module.css";

const Button = ({ type, design, children }) => {
  // Array includes component classnames
  const classList = [css["button"], css[`design-${design}`]];

  // Generate classes string
  const classes = classList.join(" ").trim();

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
