import React,{ Component } from 'react'
import { Container,Form,Button } from 'react-bootstrap'
import axios from 'axios'
export default class loginComponent extends Component {
    constructor(props){
        super(props)
    
        this.state = {
             userInfo: {
                 'username': '',
                 'password': ''
        }
        }
    }
    
    handleChange = e => {
        const {id,value} = e.target
        this.setState(({userInfo})=>({
            userInfo: {...userInfo, [id]: value}
        }))
        // console.log(this.state.userInfo)
    }
    formSubmit = e =>{
        e.preventDefault()
        axios.post('https://20.185.223.116:5000/login',this.state.userInfo).then(resp=>{
            if(resp.status === 200){
                localStorage.setItem('currentUser',this.state.userInfo.username)
                window.location.reload();
            }
        }).catch(err=>console.log(err))
    }
    render(){

    
    return (

             <div className="login-div" style={{ marginTop: "%10vh" }}>
         <Container className="">
           <h2 className="m-3">OOO HGHG</h2>
           <Form onSubmit={this.formSubmit}>
             <Form.Group controlId="username" className="m-3">
               <Form.Control
                 type="text"
                 placeholder="Username ver bakm"
                 onChange={this.handleChange}
               />
             </Form.Group>

             <Form.Group controlId="password" className="m-3">
               <Form.Control
                 type="password"
                 placeholder="tamam yaz şifreni bakmıom"
                 onChange={this.handleChange}
               />
             </Form.Group>
             <Button variant="primary" type="submit" className="m-3">
               yukardakiler bittiyse tıkla
             </Button>
           </Form>
         </Container>
       </div>

    )}
}
