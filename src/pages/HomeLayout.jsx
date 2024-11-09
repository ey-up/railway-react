import { React } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <Main />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
