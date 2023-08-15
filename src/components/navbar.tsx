"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

type Props = {};

const NavBar = (props: Props) => {
  const pathname = usePathname();
  return (
    <div>
      <Navbar
        bg="primary"
        variant="dark"
        sticky="top"
        expand="sm"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand href="/" as={Link}>
            NextJS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav>
              <Nav.Link
                href="/static"
                as={Link}
                active={pathname === "/static"}
              >
                Static
              </Nav.Link>
              <Nav.Link
                href="/dynamic"
                as={Link}
                active={pathname === "/dynamic"}
              >
                Dynamic
              </Nav.Link>
              <Nav.Link href="/isr" as={Link} active={pathname === "/isr"}>
                ISR
              </Nav.Link>
              <Nav.Link
                href="/search"
                as={Link}
                active={pathname === "/search"}
              >
                Search
              </Nav.Link>
              <NavDropdown title="Topics" id="topics-ddw">
                <NavDropdown.Item as={Link} href="/topics/health">
                  Health
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/topics/fitness">
                  Fitness
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/topics/coding">
                  Coding
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
