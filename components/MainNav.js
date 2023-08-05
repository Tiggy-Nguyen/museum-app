import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import {  useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { SSRProvider } from '@react-aria/ssr';
import { addToHistory } from '../lib/userData';
import { readToken, removeToken } from '../lib/authenticate';

function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [searchQuery, setSearchQuery] = useState('');
  
  const router = useRouter();
  let token = readToken();

  const logout = () => {
    setIsExpanded(false); 
    removeToken(); 
    router.push('/'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    setSearchQuery(searchQuery);
    
    setSearchHistory(await addToHistory(`title=true&q=${searchQuery}`));
    router.push(`/artwork?title=true&q=${searchQuery}`);
    setIsExpanded(false);
  };
  
  console.log(token)
  return (
    
    <SSRProvider>
      <Navbar className="fixed-top navbar-dark bg-primary" id="navbar" expanded={isExpanded}>
        <Container fluid id="nav-container">
          <Navbar.Brand >Thy Nguyen</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll id="home-search"
            >
              {/* Home Link */}
              <Link href="/" passHref legacyBehavior className="home-link">              
                <Nav.Link className="link-style" active={router.pathname === "/" } onClick={() => setIsExpanded(false)}>Home</Nav.Link>
              </Link>  

              {/* Advanced Search Link */}
              {token?<Link href="/search" passHref legacyBehavior >
                <Nav.Link className="link-style" onClick={() => setIsExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link>
              </Link>:<></>}
              
                       
            </Nav>       


            {token? <div className="d-flex justify-content-end">
            &nbsp;  
            <Form className="d-flex" onSubmit={handleSubmit}>
              <FormControl
                type="text"
                name="search"
                placeholder="Search"
                className="me-2"
              />
              <Button type="submit" variant="success">Search</Button>
            </Form>
            &nbsp;

            <Nav className="ms-auto">
              
              <NavDropdown title={token.userName}>
              
                
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/favourites"} onClick={()=>setIsExpanded(false)}>Favourites</NavDropdown.Item>
                </Link>

                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/history"} onClick={()=>setIsExpanded(false)}>Search History</NavDropdown.Item>
                </Link>

                <Link href="/" passHref legacyBehavior>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </Link>
              </NavDropdown>

            </Nav>
          </div> : 
          <Nav className="ms-auto">
            <Button>
              <Link href="/login" passHref legacyBehavior>
                <NavDropdown.Item active={router.pathname === "/login"} onClick={()=>setIsExpanded(false)}>Login</NavDropdown.Item>
              </Link>
            </Button>
            &nbsp;
            <Button>
              <Link href="/register" passHref legacyBehavior>
                <NavDropdown.Item active={router.pathname === "/register"} onClick={()=>setIsExpanded(false)}>Register</NavDropdown.Item>
              </Link>
            </Button>
          </Nav>} 


          </Navbar.Collapse>
        </Container>
      </Navbar>
     
      <br />
      <br />
    </SSRProvider>
    
  );
}

export default MainNav;