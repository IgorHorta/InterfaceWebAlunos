import React from 'react';
import { Button, FormGroup, FormControl, FormLabel, Alert } from 'react-bootstrap';
import { userService } from '../src/services/userService';

const Login = () => {
    
    const [state, setState] = React.useState({
        email: '',
        password: '',
        loginSucess: null,
        loginMessage: null
    });

    const validateForm = () => {
        return state.email.length > 0 && state.password.length > 0;
    };

    const handleChange = event => {
        setState({
            ...state,
            [event.target.id]: event.target.value
        });
    };

    const handleSubmit = event => {
        userService.login(state.email, state.password).then(mensagem => {
          setState({...state, loginSucess: true, loginMessage: mensagem})
        }).catch(erroMessage => {
          setState({...state, loginSucess: false, loginMessage: erroMessage})
        });
        event.preventDefault();
    };

    return (
        <div className="Login">
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="email">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={state.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={state.password}
                onChange={handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              disabled={!validateForm()}
              type="submit"
            >
              Login
            </Button>
            { state.loginMessage && 
              <Alert style={{marginTop: 20}} variant={state.loginSucess ? 'success' : 'danger'}>
                <Alert.Heading>{state.loginMessage}</Alert.Heading>
              </Alert>
            }
          </form>
        </div>
      );
}

export default Login;