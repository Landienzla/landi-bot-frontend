import axios from "axios";
import React, { Component } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
export default class updateListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      followings: [],
      checkboxes: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(
        `https://20.185.223.116:5000/${localStorage.getItem(
          "currentUser"
        )}/followings`
      )
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({ followings: [resp.data] });
        //   console.log(
        //     this.state.followings.map((userData) => userData["checkboxes"])
        //   );
          this.setState({
            checkboxes: this.state.followings.map(
              (userData) => userData["checkboxes"]
            ),
          });
        //   console.log(this.state.checkboxes);
        }
      })
      .catch((err) => console.log(err));

    this.state.followings.map((userData) => {
      Object.entries(userData["checkboxes"]).map(([key, data]) => {
        if (data === true) {
          document.getElementById(key).click();
          
        }

      });
    });

    
   }
   
  
  checkCheckboxes = (e) => {
      
    // console.log(this.state.followings.map((userData) => userData["checkboxes"]))
    const { id, checked } = e.target;
    this.setState(({ checkboxes }) => ({
      checkboxes: { ...checkboxes, [id]: checked },
    }));
    this.state.followings.map((following) =>
      following["followerNicks"].map((nick, index) => {
        if (this.state.checkboxes[index] === undefined) {
          this.setState(({ checkboxes }) => ({
            checkboxes: { ...checkboxes, [index]: false },
          }));
        }
      })
    );
    // this.setState({
    //     checkboxes:[...this.state.checkboxes, {[id]:checked}]
    // })
    // console.log(this.state.checkboxes);
  };
  updateList = (e) => {
    e.preventDefault();
    this.state.followings.map((following) =>
      following["followerNicks"].map((nick, index) => {
        if (this.state.checkboxes[index] === undefined) {
          this.setState(({ checkboxes }) => ({
            checkboxes: { ...checkboxes, [index]: false },
          }));
        }
      })
    );
    axios
      .post(
        `https://20.185.223.116:5000/${localStorage.getItem(
          "currentUser"
        )}/updateList`,
        this.state.checkboxes
      )
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
    //   console.log(this.state.checkboxes)
  };
  render() {
    return (
      <div className="bg-dark">
        <Container style={{ color: "white" }} className="mt-5 bg-dark">
          <Row>
            <Table striped bordered hover size="sm" className="bg-light">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>username</th>
                  <th>Çeklişlere Etiketle</th>
                </tr>
              </thead>
              <tbody>
                {this.state.followings.map((userData) =>
                  userData["followerNicks"].map((data, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>
                        {this.state.followings.map(
                          (userData) => userData["followerNames"][index]
                        )}
                      </td>
                      <td>{data}</td>
                      <td>
                        <Form>
                          <Form.Group
                            onChange={this.checkCheckboxes}
                            className="mb-3"
                            controlId={index}
                          >
                            <Form.Check type="checkbox" label="" />
                          </Form.Group>
                        </Form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            <Button
              onClick={this.updateList}
              className="justify-content-end mb-5"
            >
              Çekiliş Listesini Güncelle
            </Button>
          </Row>
        </Container>
      </div>
    );
  }
}
