import React from 'react'
import { connect } from 'react-redux'
import { login } from './store'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: {}
    }
  }
  //TO DO: DISPLAY WHEN THERE IS ERROR
  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password
    })
      .catch(error => this.setState({ error }, () => console.log(this.state)))
  }
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    }, () => console.log(this.state));
  }
  render() {
    const { email, password, error } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div className='h100 w100 flex column align-items-center justify-center'>
        <h1>Let's Loggin'!</h1>
        <div className='flex w50'>
          <img src='/loggin.png' />
          <form className='grow1' onSubmit={handleSubmit}>
            <div className='flex column'>
              <div className='flex column m1'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' className='input' value={email} onChange={handleChange} />
              </div>
              <div className='flex column m1'>
                <label htmlFor='email'>Password</label>
                <input type='password' name='password' className='input' value={password} onChange={handleChange} />
              </div>
              <div className='m1'>
                <button type='submit' className='btn bg-blue white p1 rounded'>Submit</button>
                {error.message ? <div><em>There was an error with your email or password!</em></div> : ''}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user))
  };
}

export default connect(null, mapDispatchToProps)(Login)
