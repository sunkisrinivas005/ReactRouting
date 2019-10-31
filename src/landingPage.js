import React from 'react';
import {withRouter} from 'react-router-dom';

class LandingPage extends React.Component {
  componentWillMount = () => {
    let {history} = this.props;
      if(history.location && !history.location.params){
         history.push("login")
      }else {
        console.log("checking Auth.", history);
      }
  }
  render(){
    return (
      <div style = {{display : "flex", alignItems : "center", justifyContent: "center"}}>
     <h5 style ={{fontFamily :"Lato"}}>Oh..... u Successful logged In.</h5>
      </div>
    );
  }
}

export default withRouter(LandingPage);
