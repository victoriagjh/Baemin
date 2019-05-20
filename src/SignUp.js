import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter} from 'mdbreact';
import Select from 'react-select';

import logo from './imgs/mainLogo.png';
import './App.css';


export default class SignUp extends Component {
  constructor(){
    super();
    this.state = {
      isCustomer:false,
      isBoss : false,
      isRider : false,
      genders: [
        {
          label: "Male",
          value: "1"
        },
        {
          label: "Female",
          value: "2"
        }]
    }
  }
  onMainLogoClick(){

  }
  onCustomerClick(){
    this.setState({
      isCustomer: true,
      isBoss:false,
      isRider:false
    });
    console.log("CustomerClick");
  }
  onBossClick(){
    this.setState({
      isCustomer:false,
      isBoss:true,
      isRider:false
    });
    console.log("BossClick");
  }
  onRiderClick(){
    this.setState({
      isCustomer:false,
      isBoss:false,
      isRider:true
    });
    console.log("RiderClick");
  }
  render() {
    let switchedForUserType = null;
    if(this.state.isBoss) {
      switchedForUserType =   (
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <MDBCard>
                  <MDBCardBody className="mx-4">
                    <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                    <strong>Sign Up</strong>
                    </h3>
                    </div>
                    <div className="input-group">
                    <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon">
                    <i className="fa fa-user prefix"></i>
                    </span>
                    </div>
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" />
                    </div>
              <MDBInput
                label="ID"
                group
                validate
                error="wrong"
                success="right"
              />
              <MDBBtn href="#!" className="white ml-1">
                중복확인
              </MDBBtn>
              <MDBInput
                label="Your password"
                group
                type="password"
                validate
                containerClass="mb-0"
              />
              <Select
                options={this.state.genders}
                selected="Choose your Gender"/>
                <p/>
              <MDBInput
                label="가게 이름"
                group
                validate
                containerClass="mb-0"
              />
              <MDBInput
                label="Business Number"
                group
                validate
                containerClass="mb-0"
              />
              <MDBInput
                label="운영 시간 및 휴무일"
                group
                validate
                containerClass="mb-0"
              />
              <div className="text-center mb-3">
                <MDBBtn
                  type="button"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  Sign Up
                </MDBBtn>
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
            <p className="font-small grey-text d-flex justify-content-end">
              If you are our member, Already?
              <a href="#!" className="blue-text ml-1">
                Login
              </a>
            </p>
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      </MDBContainer>
        );
    } else if(this.state.isRider){
      switchedForUserType = <p>Rider USER</p>
    } else {
      switchedForUserType =   (
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <MDBCard>
                  <MDBCardBody className="mx-4">
                    <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                    <strong>Sign Up</strong>
                    </h3>
                    </div>
                    <div className="input-group">
                    <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon">
                    <i className="fa fa-user prefix"></i>
                    </span>
                    </div>
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" />
                    </div>
              <MDBInput
                label="ID"
                group
                validate
                error="wrong"
                success="right"
              />
              <MDBBtn href="#!" className="white ml-1">
                중복확인
              </MDBBtn>
              <MDBInput
                label="Your password"
                group
                type="password"
                validate
                containerClass="mb-0"
              />
              <Select
                options={this.state.genders}
                selected="Choose your Gender"/>
                <p/>
              <div className="text-center mb-3">
                <MDBBtn
                  type="button"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  Sign Up
                </MDBBtn>
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
            <p className="font-small grey-text d-flex justify-content-end">
              If you are our member, Already?
              <a href="#!" className="blue-text ml-1">
                Login
              </a>
            </p>
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      </MDBContainer>
        );
    }

    return (
      <section id="SignUp">
        <div className="cover">
          <div className="Headers">
            <Link to="/" onClick={this.onMainLogoClick.bind(this)}><img className ="logo" src={logo} width='150px'></img></Link>
          </div>
        </div>
            <div className="row my-3 d-flex justify-content-center">
          <MDBBtn
            type="button"
            color="white"
            rounded
            className="mr-md-3 z-depth-1a"
            onClick = {this.onCustomerClick.bind(this)}
          >
          고객 SignUp
          </MDBBtn>
          <MDBBtn
            type="button"
            color="white"
            rounded
            className="mr-md-3 z-depth-1a"
            onClick = {this.onBossClick.bind(this)}
          >
          사장님 SignUp
          </MDBBtn>
          <MDBBtn
            type="button"
            color="white"
            rounded
            className="z-depth-1a"
            onClick = {this.onRiderClick.bind(this)}
          >
          배달원 SignUp
          </MDBBtn>
        </div>
        {switchedForUserType}
      </section>
    );
  }
}
