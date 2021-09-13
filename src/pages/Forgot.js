
import React, {Component} from "react";
import axios from "axios";

export default class Forgot extends Component{
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: this.email
    }
    axios.post('forgot.php', data)
    .then(res => {
      // localStorage.setItem('resertoken', res.data.token);
      console.log(res.data.token);
    })
    .catch(err =>{
      console.log(err);
    })
  };

  render (){

    return(
      <div class="container p-50">
      <div class="card col-md-4 mx-auto">
          <div class="card-body">
              <form onSubmit={this.handleSubmit} class="row g-3">
                  <h4>Reset Your Password</h4>
                  <div class="col-md-12">
                      <label for="email" class="form-label">Email Address</label>
                      <input type="text" class="form-control"  required
                      onChange={e => this.email = e.target.value}/>
                  </div>
                  <div class="col-12 d-grid">
                      <button class="btn btn-primary">Reset</button>
                      <br/>
                      <a href="/signin" className="text-warning">Remember password?</a>
                  </div>
              </form>
          </div>
      </div>
  </div>

    )
  };
  }
