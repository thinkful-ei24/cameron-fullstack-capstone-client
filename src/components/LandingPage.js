import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Info from './Info';
import './landing-page.css';

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formToShow: 'login'
    }
  }

  changeForm(){
    if(this.state.formToShow==='login'){
      this.setState({
        formToShow: 'signup'
      });
    } else{
      this.setState({
        formToShow: 'login'
      });
    }
  }
  render() {
    if (this.props.loggedIn) {
      return <Redirect to='/selection' />;
    }
    const formDisplay = this.state.formToShow === 'login' ? <LoginForm /> : <SignUpForm />;
    let anchorDisplay;
    if (this.state.formToShow === 'login') {
      anchorDisplay = <div>
        Don't have an account? <button className="switchSignUp" onClick={()=>this.changeForm()}>Sign up now!</button>
      </div>
    }else{
      anchorDisplay = <div>
      Already have an account? <button className="switchSignUp" onClick={()=>this.changeForm()}>Login now!</button>
    </div>
    }
    return (
      <main className='landing-page'>
        <section className='less-info'>
          <h2>Do you think you know who Becca will end up with?</h2>
          <h3>Now you can make your selections and see how your guesses stack up to Becca's real-life choices.</h3>
        </section>
        <section className='form-class'>
          {formDisplay}
          {anchorDisplay}
        </section>
      </main>
    )
  }
}


const mapStateToProps = (state) => {
  return ({
    error: state.authReducer.error,
    loggedIn: state.authReducer.currentUser !== null
  })
}

export default connect(mapStateToProps)(LandingPage);