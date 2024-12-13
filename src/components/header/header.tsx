/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import "./header.scss";

// Define the props type using React.PropsWithChildren
type HeaderProps = React.PropsWithChildren<{}>;

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <header className="header">{children}</header>;
};

export default Header;

