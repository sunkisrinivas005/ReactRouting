import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Spinner } from 'reactstrap';
import {LoginApi, isAuthenticated} from './Auth.js';
import {Validation, PasswordCheck} from './validations';
import {userNameRegex, passwordRegex, emailRegex} from './constants';

class Login extends Component {
  state = {
       userName : "",
       password : "",
       error: false,
       Message : "", 
       validateUserName : false,
       validatePassword : false,
       loader :false,
       nouserName : false,
       noPassword : false
     }

handleChange =(e) => {
  this.setState({
    [e.target.name] : e.target.value
  }, () => {
    let {userName, password} = this.state
    this.setState({
       validateUserName : userName !== "" ? false : null,
       validatePassword : password !== "" ? false : null,
       noPassword : password !== "" ? false : null,
       nouserName : userName !== "" ? false : null
    })
  })
}

componentWillMount = async () => {
    let Authenticated = await isAuthenticated();
    console.log(Authenticated, "ddddd")
    this.setState({
      Authenticated : Authenticated
    })
    if(Authenticated){
    this.props.history.push('/landingPage')
  }
}

handleLandingPage = (error) => {
  if(!error){
    let {history} = this.props;
    history.push({
      pathname: `/landingPage`,
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
      let response = await LoginApi({userName, password});
      this.setState({
        error : response && response.statusCode && response.statusCode === 200 && response.body !== "unsuccessful" ? false : true,
        Message : response && response.body ? response.body  : "",
        loader :false
      }, () => {
        let {error} = this.state
        this.handleLandingPage(error)
      })
    }else {
      if(userName === "" || password === ""){
                 this.setState({
                  validateUserName : userName=== "" ? true : false,
                  validatePassword : password === "" ? true : false,
                 })  
                
      }else {
        this.setState({
        error : true,
        nouserName  :  validateUserName ? false : true,
        noPassword : validatePassword ? false : true,
              }, () => {
                setTimeout(() => this.setState({error:false}), 1500)
              })
      }
    }
  }
  render() {
    let {userName, password, error, Message, validatePassword, validateUserName, loader, nouserName, noPassword} = this.state;
    return (
<div className="app flex-row align-items-center" style ={{paddingTop: "200px"}}>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h3>Login</h3>
                      <p className="text-muted" style = {{fontFamily :"Lato", marginTop: '5px', marginBottom : "15px"}}>Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name = "userName" value = {userName} onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {validateUserName || nouserName ? 'block-example border border-danger' : ""} />
                      </InputGroup>
                      <p style ={{color: "red", fontSize: 10, fontFamily : "Lato", marginBottom :"15px"}}>{nouserName ? "please enter a valid userName" : validateUserName  ? "* user name is required" : null}</p>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name = "password"  value = {password}  onChange = {(e) => this.handleChange(e)} onKeyPress ={(e) => {if (e.key === 'Enter') e.preventDefault()}} className = {validatePassword  || noPassword ? 'block-example border border-danger' : ""} />
                      </InputGroup>
                      <p style ={{color: "red", fontSize: 10, fontFamily : "Lato", marginBottom :"15px"}}>{noPassword  ? "* please enter a valid password" :  validatePassword  ? "* password is required" : null}</p>
                      <Row>
                        <Col xs="6">
                          <Button color="dark" className="px-8" onClick = {() => this.handleSubmit()}><span style = {{color: "white"}}>Login</span>{loader ? <Spinner size="sm" color="light" style ={{marginTop: "10px", marginLeft: "10px", fontSize: "10px"}} />  :null}</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0"  style = {{fontSize:16, fontFamily : "Lato"}}>Forgot password?</Button>
                        </Col>
                      </Row>
                            <Row>
                              <Col xs="10" className="text-right" style = {{marginTop: "25px"}}>
                           {
                                error ?
                                  <p style = {{color: "red", fontSize : "18", marginRight: "25px"}}>{Message === "unsuccessful" ? "Please check the Credentials" : Message}</p>
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
                      <div style = {{marginTop: "10px"}}>
                      <h6 style = {{fontFamily : "Lato", color: "white"}}>No Account..?</h6>
                      <h6 style = {{fontFamily : "Lato", color: "white"}}>Feel free to Create an Account its takes few Minutes.</h6>
                      </div>
                        <Button color="primary" className="mt-3" active tabIndex={-1} style = {{fontFamily : "Lato"}}>Register Now!</Button>
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

export default Login;