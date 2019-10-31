import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {Validation, PasswordCheck} from './validations.js'
import {userNameRegex, passwordRegex} from './constants.js';
import API from './api.js'
class ForgotPassword extends Component {
     state = {
       userName : "",
       password : "",
       validatePassword : false,
       validateUserName :false,
       error: false,
       Message : "",
       retypePassword : "",
       validateRetypePassword : false,
     }

handleChange =(e) => {
  this.setState({
    [e.target.name] : e.target.value
  }, () => {
    let {userName, password, retypePassword, email} = this.state
    this.setState({
    validatePassword :  password !== "" ? false : null,
    validateRetypePassword : retypePassword !== "" ? false : null,
    validateUserName : userName !== "" ? false : null,
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
    let {userName, password, retypePassword} = this.state;
    let value = await Validation(userNameRegex, userName);
    let pass = await Validation(passwordRegex, password);
    let passwordCheck = await PasswordCheck(retypePassword, password);
    if(value && pass && passwordCheck ){
      let apiLink = `https://kawlzrot5j.execute-api.ca-central-1.amazonaws.com/logincheckapi?username=${userName}&password=${password}`;
      let response = await API(apiLink);
      this.setState({
        error : response && response.statusCode && response.statusCode === 200 && response.body !== "unsuccessful" ? false : true,
        Message : response && response.body ? response.body : ""
      }, () => {
        let {error} = this.state
        this.handleLandingPage(error)
      })
    }else {
      if(userName === "" || password === "" || retypePassword === ""){
                 this.setState({
                  validateUserName : userName=== "" ? true : false,
                  validatePassword : password === "" ? true : false,
                  validateRetypePassword : retypePassword === "" ? true : false
                 })  
                
      }else {
        this.setState({
        error : true
              })
      }
    }
  }

  render() {
    let {retypePassword, password, error, Message, userName, validateUserName, validatePassword, validateRetypePassword} = this.state;
    console.log(validateRetypePassword, "statefrom");
    return (
       <div className="app flex-row align-items-center">
        <Container style ={{marginTop : "150px"}}>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <p>{error ? Message : null}</p>
                  <Form>
                    <h5 style= {{display : "flex",alignItems:"center", justifyContent:"center", marginBottom :"15px"}}>Forgot Password ?</h5>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="user Name" autoComplete="new-password" value = {userName}  name = "userName" onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {validateUserName ? 'block-example border border-danger' : ""}  />
                    </InputGroup>
                     <p style ={{color: "red", fontSize: 10}}>{validateUserName ? "* user name is required" : null}</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" value = {password}  name = "password" onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {validatePassword ? 'block-example border border-danger' : ""} />
                    </InputGroup>
                    <p style ={{color: "red", fontSize: 10}}>{validatePassword ? "* password is required" : null}</p>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" name = "retypePassword" value = {retypePassword} onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {validateRetypePassword ? 'block-example border border-danger' : ""}  />
                    </InputGroup>
                    <p style ={{color: "red", fontSize: 10}}>{validateRetypePassword ? "* retype-password is required" : null}</p>
                    <Button color="success" block  onClick = {this.handleSubmit}>Set Password</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                <h4>Must have</h4>
                  <h5>UserName:</h5>
                  <p>userName must have 2 digits and must be 8 character in length</p>
                  <h5>Password:</h5>
                  <p>password must have 1 digit and 1 specialCase character and must be 8 character in length</p>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);
