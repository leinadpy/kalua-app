import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import BotonCerrarSesion from "./../elements/BotonCerrarSesion";

const Menu = () => {
  
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{ marginBottom: "20px" }}
    >
      <Navbar.Brand>Kalua App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Inicio
          </Nav.Link>
          <NavDropdown title="Productos" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/products/new-product">
              Nuevo producto
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/products">
              Lista de productos
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/categories/new-category">
              Nueva categoría
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/categories">
              Lista de categorías
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/lines/new-line">
              Nueva línea
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/lines">
              Lista de líneas
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Clientes" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/clients/new-client">
              Nuevo cliente
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/clients">
              Lista de Clientes
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Movimiento" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/purchases/new-purchase">
              Nueva compra
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/purchases">
              Lista de compras
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/sales/new-sales">
              Nueva venta
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/sales">
              Lista de ventas
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/refunds/new-refund">
              Nueva devolución
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/refunds">
              Lista de devolución
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Reportes" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/purchasesreports">
              Reporte de compras
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/salesreports">
              Reporte de ventas
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/stock">
              Productos en stock
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <BotonCerrarSesion />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
