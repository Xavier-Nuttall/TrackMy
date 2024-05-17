import React from "react";
import { Link } from 'react-router-dom';
import { useMainContent, useMenuOpen, useFloor } from './CustomHooks';


function NotifPage() {
  const [menuOpen, setMenuOpen] = useMenuOpen(true);

  const toggleFilter = () => {
    setMenuOpen(!menuOpen);
  };



  return (
    <>

    </>
  );
}

export default NotifPage;