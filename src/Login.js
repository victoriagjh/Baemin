import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';

import './App.css';

import logo from './imgs/mainLogo.png';

export default class Login extends Component {
  constructor(){
    super();
    this.state = {

    }

  }
  onMainLogoClick(){

  }
  render() {
    return (
      <section id="Login">
        <div className="cover">
          <div className="Headers">
            <Link to="/" onClick={this.onMainLogoClick.bind(this)}><img className ="logo" src={logo} width='150px'></img></Link>
          </div>
        </div>
        <MDBContainer>
    <MDBRow>
      <MDBCol md="12">
        <MDBCard>
          <MDBCardBody className="mx-4">
            <div className="text-center">
              <h3 className="dark-grey-text mb-5">
                <strong>Login</strong>
              </h3>
            </div>
            <MDBInput
              label="ID"
              group
              validate
              error="wrong"
              success="right"
            />
            <MDBInput
              label="Your password"
              group
              type="password"
              validate
              containerClass="mb-0"
            />
            <p className="font-small blue-text d-flex justify-content-end pb-3">
              Forgot
              <a href="#!" className="blue-text ml-1">

                Password?
              </a>
            </p>
            <div className="text-center mb-3">
              <MDBBtn
                type="button"
                rounded
                className="btn-block z-depth-1a"
              >
                Sign in
              </MDBBtn>
            </div>
            <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

              or Sign in with:
            </p>
            <div className="row my-3 d-flex justify-content-center">
              <MDBBtn
                type="button"
                color="white"
                rounded
                className="mr-md-3 z-depth-1a"
              >
                <MDBIcon fab icon="facebook-f" className="blue-text text-center" />
              </MDBBtn>
              <MDBBtn
                type="button"
                color="white"
                rounded
                className="mr-md-3 z-depth-1a"
              >
                <MDBIcon fab icon="instagram" className="red-text" />
              </MDBBtn>
              <MDBBtn
                type="button"
                color="white"
                rounded
                className="z-depth-1a"
              >
                <MDBIcon fab icon="google-plus-g" className="red-text" />
              </MDBBtn>
            </div>
          </MDBCardBody>
          <MDBModalFooter className="mx-5 pt-3 mb-1">
            <p className="font-small grey-text d-flex justify-content-end">
              Not a member?
              <a href="#!" className="blue-text ml-1">

                Sign Up
              </a>
            </p>
          </MDBModalFooter>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
      </section>
    );
  }
}
