import css from "./Container.module.css";

const Container = ({ children }) => {
  // Array includes component classnames
  const classList = [css["container"]];
  // Generate classes string
  const classes = classList.join(" ").trim();

  return <div className={classes}>{children}</div>;
};

export default Container;
