import axios from "axios";
import React, {Component} from "react";
import {  Redirect} from "react-router-dom";

export default class Signin extends Component{
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: this.email,
      pass: this.pass
    }

    axios.post('login.php', data)
    .then(res => {
      if (res.data.token != null) {
        localStorage.setItem('token', res.data.token);
        this.setState({
          loggedIn: true,
          message: res.data.message,
          cls: 'success'
        });
        this.props.setUser(res.data);

      }else {
        this.setState({
          message: res.data.message,
          cls: 'warning'
        });
      }

    })
    .catch(err =>{
      console.log(err);
    })
  };


  render (){

    if (this.state.loggedIn === true) {
      return <Redirect to={'/app/'} />;    
    }

    let message= '';

    if (this.state.message) {
      const cls = 'alert alert-' + this.state.cls;
      message = (
        <div className={cls} role="alert">
        {this.state.message}
        </div>
      )
    }

    return(
      <div class="container p-50">
      <p class="mt-4 text-center">Sign In to your account</p>
      <div class="card col-md-4 mx-auto">
          <div class="card-body">
          {message}
              <form onSubmit={this.handleSubmit} class="row g-3">
                  <h4>Welcome Back</h4>
                  <div class="col-md-12">
                      <label for="email" class="form-label">Email Address</label>
                      <input type="text" class="form-control"  required
                      onChange={e => this.email = e.target.value}/>
                  </div>
                  <div class="col-md-12">
                      <label for="pass" class="form-label">Password</label>
                      <input type="password" class="form-control" required
                      onChange={e => this.pass = e.target.value}/>
                  </div>
                  <div class="col-12 d-flex justify-content-between">
                      <button class="btn btn-primary">SignIn</button>
                      <a href="/forgot">forgot password?</a>
                  </div>
              </form>
          </div>
      </div>
  </div>

    )
  };
  }
