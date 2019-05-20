import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './App.css';
import './Home.css';
import logo from './imgs/mainLogo.png';

import { MDBBtn } from "mdbreact";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';



export default class Home extends Component {

  onSignUpClick() {

  }
  onLoginClick() {

  }
  onMainLogoClick(){

  }
  onMyShopClick(){

  }
  onOrderHistoryClick(){

  }
  render() {
    return (

      <section id="home">
        <div className="cover">
          <div className = "Headers">
          <Link to="/" onClick={this.onMainLogoClick.bind(this)}><img className ="logo" src={logo} width='150px'></img></Link>
          <Link to="/login" onClick={this.onLoginClick.bind(this)}><MDBBtn>로그인</MDBBtn></Link>
          <Link to="/signup" onClick={this.onSignUpClick.bind(this)}><MDBBtn>회원가입</MDBBtn></Link>
          <Link to="/myshop" onClick={this.onMyShopClick.bind(this)}><MDBBtn>찜한 가게</MDBBtn></Link>
          <Link to="/orderHistory" onClick={this.onOrderHistoryClick.bind(this)}><MDBBtn>주문 내역</MDBBtn></Link>
          </div>
          <div className="contents">
            <h2 className="subtitle">메인화면</h2>
          </div>
        </div>
        <div className="description">
          <p>
            <strong>배달 주소 입력</strong>
          </p>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">GPS</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
            placeholder="Place"
            aria-label="place"
            aria-describedby="basic-addon1"
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">검색</InputGroup.Text>
            </InputGroup.Append>
            </InputGroup>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>배민라이더스</td>
                    <td>배민키친</td>
                    <td>1인분</td>
                    <td>테이크아웃</td>
                  </tr>
                  <tr>
                    <td>배민마켓</td>
                    <td>한식</td>
                    <td>분식</td>
                    <td>카페&디저트</td>
                  </tr>
                  <tr>
                    <td>돈까스*회*일식</td>
                    <td>치킨</td>
                    <td>피자</td>
                    <td>중국집</td>
                  </tr>
                  <tr>
                    <td>족발*보쌈</td>
                    <td>야식</td>
                    <td>찜*탕</td>
                    <td>도시락</td>
                  </tr>
                  <tr>
                    <td>패스트푸드</td>
                    <td>프랜차이즈</td>
                    <td>맛집랭킹</td>
                    <td></td>
                  </tr>
              </tbody>
          </Table>
        </div>
      </section>
    );
  }
}
