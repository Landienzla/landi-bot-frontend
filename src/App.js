import "./App.css";
import { useState } from "react";
import { Container,Navbar, Form, Button, Row, Col, Nav } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginComponent from "./loginComponent";
import UpdateListComponent from './updateListComponent'
import CommenterComponent from './commenterComponent'
function App() {
  // const [serviceStatus, updateStatus] = useState();
  // const [currentUser, updateUser] = useState(null);
  // const [username, usernameData] = useState();
  // const [password, passwordData] = useState();
  // const [loadingStatus, updateLoading] = useState();
  // const [loginStatus, updateloginStatus] = useState("loggedOut");
  // const [followings,updateFollowings] = useState([]);
  // const formSubmit = async (e) => {
  //   updateLoading("loading");
  //   e.preventDefault();
  //   await axios
  //     .post("http://127.0.0.1:5000/login", {
  //       username: username,
  //       password: password,
  //     })
  //     .then((resp) => {
  //       if (resp.status === 200) {
  //         updateloginStatus("loggedIn");
  //         updateLoading();
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const handleChange = (e) => {
  //   if (e.target.id === "username") {
  //     usernameData(e.target.value);
  //   } else if (e.target.id === "password") {
  //     passwordData(e.target.value);
  //   }
  // };
  // axios
  //   .get("http://127.0.0.1:5000/currentUser")
  //   .then((resp) => {
  //     updateUser(resp.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // axios
  //   .get("http://127.0.0.1:5000/serviceStatus")
  //   .then((resp) => {
  //     updateStatus(resp.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // var currentComponent = null;
  // if (
  //   serviceStatus === "IDLE" &&
  //   currentUser === "admin"
  // ) {
  //   currentComponent = (
  //     <div className="login-div" style={{ marginTop: "%10vh" }}>
  //       <Container className="">
  //         <h2 className="m-3">OOO HGHG</h2>
  //         <Form onSubmit={formSubmit}>
  //           <Form.Group controlId="username" className="m-3">
  //             <Form.Control
  //               type="text"
  //               placeholder="Username ver bakm"
  //               onChange={handleChange}
  //             />
  //           </Form.Group>

  //           <Form.Group controlId="password" className="m-3">
  //             <Form.Control
  //               type="password"
  //               placeholder="tamam yaz şifreni bakmıom"
  //               onChange={handleChange}
  //             />
  //           </Form.Group>
  //           <Button variant="primary" type="submit" className="m-3">
  //             yukardakiler bittiyse tıkla
  //           </Button>
  //         </Form>
  //       </Container>
  //     </div>
  //   );
  // } else if (
  //   serviceStatus === "BUSY" &&
  //   currentUser === username &&
  //   !loadingStatus &&
  //   loginStatus === "loggedIn"
  // ) {
  //   currentComponent = (
  //     <Container>
  //       <Row>
  //         <Col xs="10">
  //           <h2>Hoşgeldn {currentUser}</h2>
  //         </Col>
  //         <Col xs="2">
  //           <Button
  //             onClick={() => {
  //              updateloginStatus("loading")
  //               axios
  //                 .get("http://127.0.0.1:5000/logout")
  //                 .then((resp) => {
  //                   if (resp.status === 200) {
  //                     updateloginStatus("loggedOut");
  //                     updateloginStatus()
  //                   }
  //                 })
  //                 .catch((err) => console.log(err));
  //             }}
  //           >
  //             Log Out cnm
  //           </Button>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col>
  //         <Button onClick={()=>{
  //           axios.get(`http://localhost:5000/getFollowings`).then(resp=>{updateFollowings(resp.data);console.log(followings)}).catch(err=>console.log(err))
  //         }}>Get Followings</Button>
  //         {/* {followings.map((following)=>(<div>{following}</div>

  //         ))} */}
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
  // }
  // if(username === currentUser){
  //   currentComponent = (
  //     <div><h1>hg {currentUser}</h1></div>
  //   )
  // }
  return (
    <div className="App">
      {/* <h1>Service Status: {serviceStatus}</h1>
      <Container>{currentComponent}</Container>
      {loadingStatus && <h1>loading</h1>} */}
      {!localStorage.getItem('currentUser') && <LoginComponent/>}
      {localStorage.getItem('currentUser') && 
      <Container>
        <Navbar  expand="lg" variant="light" bg="dark">
          <Container>
          <Navbar.Collapse className="justify-content-start">
              <Navbar.Text style={{color:"white"}}>
                Hg <a  style={{color:"blue"}}>{localStorage.getItem('currentUser')}</a>
              </Navbar.Text>
            </Navbar.Collapse>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{color:"white"}}>
                <Button onClick={()=>{
                  axios.get(`https://20.185.223.116:5000/logout/${localStorage.getItem('currentUser')}`).then(resp=>{
                    if(resp.status === 200){
                      localStorage.removeItem('currentUser')
                      window.location.reload();
                    }
                  })}
                }>Çıkış Yap</Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <CommenterComponent/> 
        <UpdateListComponent/> 
        
      </Container>}
      
    </div>
  );
}

export default App;
