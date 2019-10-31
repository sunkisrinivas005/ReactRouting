import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Spinner } from 'reactstrap';
import {Validation} from './validations.js'
import {userNameRegex, passwordRegex} from './constants.js';
import API from './api.js'
class Login extends Component {
     state = {
       userName : "",
       password : "",
       error: false,
       Message : "", 
       validateUserName : false,
       validatePassword : false,
       loader :false
     }

handleChange =(e) => {
  this.setState({
    [e.target.name] : e.target.value
  }, () => {
    let {userName, password} = this.state
    this.setState({
       validateUserName : userName !== "" ? false : null,
       validatePassword : password !== "" ? false : null
    })
  })
}

handleLandingPage = (error) => {
  if(!error){
    let {history} = this.props;
    history.push({
      pathname: `LandingPage`,
      params: { auth : "Successful"}
    });
  }else {
    setTimeout(() => this.setState({
      error:false
    }), 3000)
  }
}

  handleSubmit = async () => {
    let {userName, password} = this.state;
    let validateUserName = await Validation(userNameRegex, userName);
    let validatePassword = await Validation(passwordRegex, password);
    if(validateUserName && validatePassword){
      this.setState({
        loader: true
      })
      let apiLink = `https://kawlzrot5j.execute-api.ca-central-1.amazonaws.com/logincheckapi?username=${userName}&password=${password}`;
      let response = await API(apiLink);
      this.setState({
        error : response && response.statusCode && response.statusCode === 200 && response.body !== "unsuccessful" ? false : true,
        Message : response && response.body ? response.body : "",
        loader :false
      }, () => {
        let {error} = this.state
        this.handleLandingPage(error)
      })
    }else {
      if(userName === "" || password === ""){
                 this.setState({
                  validateUserName : userName=== "" ? true : false,
                  validatePassword : password === "" ? true : false
                 })  
                
      }else {
       
        this.setState({
        error : true,
        validateUserName  :  validateUserName ? false : true,
        validatePassword : validatePassword ? false : true
              }, () => {
                setTimeout(() => this.setState({error:false}), 1500)
              })
      }
    }
  }

  render() {
    let {userName, password, error, Message, validatePassword, validateUserName, loader} = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container style ={{marginTop : "150px"}}>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name = "userName" value = {userName} onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {validateUserName ? 'block-example border border-danger' : ""} />
                      </InputGroup>
                      <p style ={{color: "red", fontSize: 10}}>{validateUserName && Message === "" ? "* user name is required" : validateUserName  && Message !== "" ? "please enter a valid userName" : null}</p>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name = "password"  value = {password}  onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {validatePassword ? 'block-example border border-danger' : ""} />
                      </InputGroup>
                      <p style ={{color: "red", fontSize: 10}}>{validatePassword && Message === "" ? "* password is required" :  validatePassword  && Message !== "" ? "please enter a valid userName" : null}</p>
                      <Row>
                        <Col xs="6">
                          <Button color="dark" className="px-8" onClick = {this.handleSubmit}>Login{loader ? <Spinner size="sm" color="light" style ={{marginTop: "10px", marginLeft: "10px"}} />  :null}</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                        <Link to="/forgotPassword">
                          <Button color="link" className="px-0">Forgot password?</Button>
                          </Link>
                        </Col>
                      </Row>
                            <Row>
                              <Col xs="10" className="text-right" style = {{marginTop: "25px"}}>
                           {
                                error ?
                                  <p style = {{color: "red", fontSize : "18"}}>{Message === "unsuccessful" ? "Please check the Credentials" : Message}</p>
                                :
                                null
                          }
                              </Col>
                          </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>No Account..?</p>
                      <p>Feel free to Create an Account its takes few Minutes.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
