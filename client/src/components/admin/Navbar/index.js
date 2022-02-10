import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { logOut, getIsAuthenticatedAdmin } from "features/admin/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export default function NavbarHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getIsAuthenticatedAdmin);
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/admin/login");
  };
  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand href='#home'>Fashion Shop</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link to='/admin/dashboard' as={Link}>
              Dashboard
            </Nav.Link>
            <Nav.Link to='/admin/product' as={Link}>
              Sản phẩm
            </Nav.Link>
            <Nav.Link to='/admin/order' as={Link}>
              Đơn hàng
            </Nav.Link>
          </Nav>

          <Nav>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
            ) : (
              <Nav.Link to='/admin/login' as={Link}>
                Đăng nhập
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
