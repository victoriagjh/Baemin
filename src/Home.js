import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './App.css';
import './Home.css';
import logo from './imgs/mainLogo.png';

import { MDBBtn } from "mdbreact";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
}
};
Modal.setAppElement('body');

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
};

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
  // onSearchButtonClick() {
  //   this.setState({
  //     isSearchButton:true
  //   });
  // }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
  // references are now sync'd and can be accessed.
  this.subtitle.style.color = 'black';
  }

  closeModal() {
      this.setState({modalIsOpen: false});
  }

  handleAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  }

  render() {
    let searchLocation=null;
    if(this.state.modalIsOpen) {
      searchLocation=(
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <h2 ref={subtitle => this.subtitle = subtitle}>거리 찾기</h2>
          <DaumPostcode onComplete={this.handleAddress}/>
          <button onClick={this.closeModal}>close</button>
        </Modal>
  );
    }
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
              <button>GPS</button>
            </InputGroup.Prepend>
            <FormControl
            placeholder="Place"
            aria-label="place"
            aria-describedby="basic-addon1"
            onClick={this.openModal}
            />
            <InputGroup.Append>
              <button id="search" onClick={this.openModal}>검색</button>
              {searchLocation}
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
