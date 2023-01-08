import SideBar from "../../components/SideBar/SideBar";

import "./PageLayout.css";

const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <div className="app-logo layout-top">Admin Page</div>
      <div className="layout-top"></div>
      <SideBar className="layout-bot" />
      <div className="layout-bot">{children}</div>
    </div>
  );
};

export default PageLayout;
