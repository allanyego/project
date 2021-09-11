
import React, {Component} from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Reset extends Component{
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      token: this.props.match.params.id,
      pass: this.pass,
      cpass: this.cpass
    }
    axios.post('reset.php', data)
    .then(res => {
      console.log(res.data.token);
      this.setState({
        reset: true
      });
    })
    .catch(err =>{
      console.log(err);
      this.setState({
        reset: false
      });
    })
  };

  render (){
    if (this.state.reset) {
      return <Redirect to={'/signin'} />;
    }
    return(
      <div class="container p-50">
      <div class="card col-md-4 mx-auto">
          <div class="card-body">
              <form onSubmit={this.handleSubmit} class="row g-3">
                  <h4>Reset Your Password</h4>
                  <div class="col-md-12">
                      <label for="pass" class="form-label">Password</label>
                      <input type="password" class="form-control" required
                      onChange={e => this.pass = e.target.value}/>
                  </div>
                  <div class="col-md-12">
                      <label for="cpass" class="form-label">Confirm Password</label>
                      <input type="password" class="form-control" required
                      onChange={e => this.cpass = e.target.value}/>
                  </div>
                  <div class="col-12 d-grid">
                      <button class="btn btn-primary">Update Password</button>
                      <br/>
                  </div>
              </form>
          </div>
      </div>
  </div>

    )
  };
  }
