import React from 'react';
import Api from '../../Api'
import './styled.css';

function Login({onReceive}) {

    const hadlefacebookLogin = async () => {
        let result = await Api.fbPopup();
        if(result) {
            onReceive(result.user)
        }else {
            alert("Error!");
        }
    }

  return (
      <div className="login">
          <button onClick={hadlefacebookLogin} >Logar com Facebook</button>
      </div>
  )
}

export default Login;