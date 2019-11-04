import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Spinner } from 'reactstrap';
import {Validation, PasswordCheck} from './validations.js'
import {userNameRegex, passwordRegex, emailRegex} from './constants.js';
import API from './api.js'

class Register extends Component {
  state = {
    userName : "",
    password : "",
    error: false,
    Message : "", 
    email : "",
    retypePassword : "",
    validateEmail : false,
    validateUserName : false,
    ValidateRetypePassword : false,
    validatePassword : false,
    loader : false,
     redUserName : false,
    redPassword : false,
    redEmail : false,
    redValidatePassword : false,
  }

handleChange =(e) => {
this.setState({
 [e.target.name] : e.target.value
}, () => {
    let {userName, password, retypePassword, email} = this.state
    this.setState({
    validateEmail :  email !== "" ? false : null,
    validatePassword :  password !== "" ? false : null,
    ValidateRetypePassword : retypePassword !== "" ? false : null,
    validateUserName : userName !== "" ? false : null,
    redUserName : userName !== "" ? false : null,
    redPassword :  password !== "" ? false : null,
    redEmail : email !== "" ? false : null,
    redValidatePassword : retypePassword !== "" ? false : null,
    })
  })
}

handleLandingPage = (value) => {
  if(!value){
    let {history} = this.props;
    this.props.history.push({
      pathname: `Login`,
    });
  }else {
    setTimeout(() => this.setState({
      error:false
    }), 3000)
  }
}

  handleSubmit = async () => {
    let {userName, password, retypePassword, email} = this.state;
    let validateUserName = await Validation(userNameRegex, userName);
     let validatePassword = await Validation(passwordRegex, password)
     let passwordChecking = await PasswordCheck(password, retypePassword);
     let validateEmail = await Validation(emailRegex, email);
    if(validateUserName && validatePassword && validateEmail && passwordChecking){
      this.setState({
        loader: true
      })
      let url = `https://6wigsfvq8a.execute-api.ca-central-1.amazonaws.com/registrationapistage?username=${userName}&email=${email}.com&password=${password}`;
       const method = 'GET';
      let response = await API({url, method});
      this.setState({
        error : response && response.statusCode && response.statusCode === 200  && response.body === "user already exists"? true : false,
        Message : response && response.body ? response.body : "",
        loader: false
      }, () => {
        let {error} = this.state
        this.handleLandingPage(error)
      })
    }else {
      if(userName === "" || password === "" || retypePassword === "" || email === ""){
         this.setState({
        redUserName  :  userName === "" ? true : false,
        redPassword :  password === "" ? true : false,
        redEmail :  email === "" ? true : false,
        redValidatePassword : retypePassword === "" ? true : false

      })
      }else {
           this.setState({
                  error : true,
                  validateUserName : validateUserName ? false : true,
                  validatePassword : validatePassword ? false : true,
                  validateEmail : validateEmail ? false : true,
                  ValidateRetypePassword :PasswordCheck ? false  : true
                 })  
                
      }
    }
  }
  render() {
    let {userName, password, email, retypePassword, Message, error, ValidateRetypePassword, validateEmail, validatePassword, validateUserName, loader, redUserName, redPassword, redEmail, redValidatePassword  } = this.state;
    console.log(redValidatePassword, redUserName, redPassword, "dfdf")
    return (
      <div className="app flex-row align-items-center">
        <Container style ={{marginTop : "150px"}}>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <p  style ={{color: "red", fontSize: 16, marginLeft : "25px"}} >{error ? Message : null}</p>
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" name = "userName"  value = {userName} onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {validateUserName || redUserName ? 'block-example border border-danger' : ""} />
                    </InputGroup>
                     <p style ={{color: "red", fontSize: 10}}>{redUserName ? "* user name is required" : validateUserName  ? "please enter a valid userName" : null}</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" name = "email"  value = {email} onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {validateEmail || redEmail ? 'block-example border border-danger' : ""} />
                    </InputGroup>
                     <p style ={{color: "red", fontSize: 10}}>{redEmail ? "* email-id is required" : validateEmail  ? "* please enter a valid email-id" : null}</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password"  name = "password" value = {password} onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {validatePassword || redPassword ? 'block-example border border-danger' : ""} />
                    </InputGroup>
                     <p style ={{color: "red", fontSize: 10}}>{redPassword  ? "* password is required" : validatePassword ? "* please enter a valid password " : null}</p>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" value = {retypePassword} name = "retypePassword" onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {ValidateRetypePassword || redValidatePassword ? 'block-example border border-danger' : ""} />
                    </InputGroup>
                     <p style ={{color: "red", fontSize: 10}}>{redValidatePassword  ? "* password is required" : ValidateRetypePassword   ? "* password doesnt match   " : null }</p>
                      <Button color="dark" block onClick = {this.handleSubmit}>Create Account{loader ? <Spinner size="sm" color="light" style ={{marginTop: "10px", marginLeft: "10px"}} />  :null}</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-12">
                 <div>
                  <h5>Social-Login</h5>
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                  </div>
           
                <h5 style ={{marginTop: "25px"}}>Must have</h5>
                  <h6>UserName:</h6>
                  <p>userName must have 2 digits and must be 8 character in length</p>
                  <h6>Password:</h6>
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

export default Register;
