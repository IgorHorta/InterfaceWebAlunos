import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

const Login = () => {
    
    const [state, setState] = React.useState({
        email: '',
        password: ''
    });

    const validateForm = () => {
        console.log(state);
        return state.email.length > 0 && state.password.length > 0;
    };

    const handleChange = event => {
        console.log(event.target.value);
        setState({
            ...state,
            [event.target.id]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(state);
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
          </form>
        </div>
      );
}

export default Login;