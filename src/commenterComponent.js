import axios from "axios";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
export default class commenterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      giveawayInfo: {
        giveawayURL: "",
        tagCount: "",
      },
      currentStatus : "Anne Bittii"
    };
  }
  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState(({ giveawayInfo }) => ({
      giveawayInfo: { ...giveawayInfo, [id]: value },
    }));
    console.log(this.state.giveawayInfo);
  };
  gobrr = (e) => {
    e.preventDefault();
    this.setState({currentStatus: ""})
    axios.post(
      `http://20.185.223.116:5000/${localStorage.getItem("currentUser")}/giveaway`,this.state.giveawayInfo
    ).then(resp=>{
        if(resp.status===200){
            this.setState({currentStatus: ""})
        }
        console.log(resp)
    });
  };
  render() {
    return (
      <div className="mt-2">
          {this.state.currentStatus ? <h1>Göreve Hazırım</h1>: <h1>Yorumluyom Kank</h1>}
        <Form>
          <Form.Group
            className="mb-3"
            onChange={this.handleChange}
            controlId="giveawayURL"
          >
            <Form.Control
              type="text"
              placeholder="Çekiliş Linkini Yapıştır Bakim"
            />
            <Form.Text className="text-danger">
              Çekiliş Linki " https://www.instagram.com/p/CQbT33BqqJL/ " gibi
              olmalı
            </Form.Text>
          </Form.Group>
          <Form.Group
            className="mb-3"
            onChange={this.handleChange}
            controlId="tagCount"
          >
            <Form.Control
              type="text"
              placeholder="Kaçar Kişilik Gruplar Halinde Etiketleyim"
            />
          </Form.Group>
          <Button onClick={this.gobrr}>Çekilişin Anasını Sik</Button>
        </Form>
      </div>
    );
  }
}
