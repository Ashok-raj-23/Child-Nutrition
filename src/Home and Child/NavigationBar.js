import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
    const nav = useNavigate()
    const handlelogout=()=>{
         localStorage.clear("parentid")
         alert("Logged out successfully !")
         nav('/')
     }
    return (
        <Navbar expand="lg" className="bg-primary navbar-dark py-3 shadow-sm">
            <Container>
                {/* <Navbar.Brand as={Link} to="/" className="fw-bold text-white fs-4">
                    Nutrition Management
                </Navbar.Brand> */}
                {/* <Navbar.Toggle aria-controls="navbar-nav" /> */}

            

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                    <Navbar.Text className="text">
               Child Nutrition 
          </Navbar.Text>
                        <Nav.Link as={Link} to="/home" className="text-white fs-5 mx-3">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about" className="text-white fs-5 mx-3">
                            About
                        </Nav.Link>
                        <Nav.Link as={Link} to="/profile" className="text-white fs-5 mx-3">
                            Profile
                        </Nav.Link>
                        <Nav.Link as={Link} to="/Food" className="text-white fs-5 mx-3">
                           Food
                        </Nav.Link>
                        <Nav.Link as={Link} to="/logout" className="text-white fs-5 mx-3" onClick={handlelogout}>
                           Logout
                        </Nav.Link>
                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
