import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './App.css';
import './Home.css';

import logo from './imgs/mainLogo.png';
import rider from './homeicon/rider.png';
import korea_food from './homeicon/korea_food.png';
import cafe from './homeicon/cafe.png';
import snackbar from './homeicon/snackbar.png';
import japanese from './homeicon/japanese.png';
import chicken from './homeicon/chicken.png';
import chinese from './homeicon/chinese.png';
import pizza from './homeicon/pizza.png';
import pork from './homeicon/pork.png';
import night from './homeicon/night.png';
import soup from './homeicon/soup.png';
import lunchbox from './homeicon/lunchbox.png';
import fastfood from './homeicon/fastfood.png';
import franchise from './homeicon/franchise.png';
import rank from './homeicon/rank.png';
import kitchen from './homeicon/kitchen.png';
import one from './homeicon/one.png';
import takeout from './homeicon/takeout.png';
import market from './homeicon/market.png';
import { MDBBtn } from "mdbreact";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';

declare var daum:any;

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

var locationInfo = "";


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
      deliveryLocationX:"",
      deliveryLocationY:"",
      deliveryString:"",
      category:"",
      username:this.props.location.data
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
    this.setState({deliveryString:fullAddress});
    var geocoder = new daum.maps.services.Geocoder();
    var resultX="";
    var resultY="";
    var callback = function(result, status) {
        if (status === daum.maps.services.Status.OK) {
          resultX = result[0].x.toString();
          resultY = result[0].y.toString();
          console.log(result);
          locationInfo += "Address_name:" +result[0].address_name.toString() + ",";
          locationInfo += "Building_name:" +result[0].road_address.building_name.toString() + ",";
          locationInfo += "Main_building_no:" +result[0].road_address.main_building_no.toString() + ",";
          locationInfo += "Region_1depth_name:" +result[0].road_address.region_1depth_name.toString() + ",";
          locationInfo += "Region_2depth_name:" +result[0].road_address.region_2depth_name.toString() + ",";
          locationInfo += "Region_3depth_name:" +result[0].road_address.region_3depth_name.toString() + ",";
          locationInfo += "Road_name:" +result[0].road_address.road_name.toString() + ",";
          locationInfo += "Sub_building_no:" +result[0].road_address.sub_building_no.toString() + ",";
          locationInfo += "X:" +result[0].x.toString() + ",";
          locationInfo += "Y:" +result[0].y.toString() + ",";
          locationInfo += "Zone_no:" +result[0].road_address.zone_no.toString();
        }
    };
    geocoder.addressSearch(this.state.deliveryString, callback);
  }

  render() {
    console.log("유저의 ID " + this.state.username);

    let userInfo = null;
    if(this.state.username !== undefined) {
      userInfo=(<h5 style={{fontWeight: "bold" , color : "#36B8CF"}}> {this.state.username} 님 환영합니다!</h5>);
    } else {
      userInfo=(<h5 style={{fontWeight: "bold" , color : "#36B8CF"}}>로그인 해주세요</h5>);
    }

    let searchLocation=null;
    if(locationInfo!="") {
      console.log(locationInfo);
    }
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
          {userInfo}
          </div>

        </div>
        <div className="description">
          <p>
            <strong style={{fontWeight: "bold" , color : "#36B8CF"}}>배달 주소 입력</strong>
          </p>
          <InputGroup className="mb-3">
            <FormControl
            placeholder="Place"
            aria-label="place"
            aria-describedby="basic-addon1"
            onClick={this.openModal}
            />
            <InputGroup.Append>
              <button id="search" onClick={this.openModal} style={{fontWeight: "bold" , color : "#36B8CF"}}>검색</button>
              {searchLocation}
              </InputGroup.Append>
          </InputGroup>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'chicken' }}><img src={chicken} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'pizza' }}><img src={pizza} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'snackbar' }}><img src={snackbar} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'cafe' }}><img src={cafe} width = '100px' heigth = "200"/> <br></br></Link></td>
                </tr>
                <tr>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'japanese' }}><img src={japanese} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'baeminMarket' }}><img src={market} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'korean' }}><img src={korea_food} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'chinese' }}><img src={chinese} width = '100px' heigth = "200"/> <br></br></Link></td>
                </tr>
                <tr>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'pork' }}><img src={pork} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'nightFood' }}><img src={night} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'soup' }}><img src={soup} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'dosirak' }}><img src={lunchbox} width = '100px' heigth = "200"/> <br></br></Link></td>
                </tr>
                <tr>
                  <td ><Link to={{ pathname: "/choiceCategory",  data: 'baeminRiders' }}><img src={rider} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td ><Link to={{ pathname: "/choiceCategory",  data: 'baeminKitchen' }}><img src={kitchen} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td ><Link to={{ pathname: "/choiceCategory",  data: '1serving' }}><img src={one} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td ><Link to={{ pathname: "/choiceCategory",  data: 'takeOut' }}><img src={takeout} width = '100px' heigth = "200"/> <br></br></Link></td>
                </tr>
                <tr>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'fastfood' }}><img src={fastfood} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'franchise' }}><img src={franchise} width = '100px' heigth = "200"/> <br></br></Link></td>
                  <td><Link to={{ pathname: "/choiceCategory",  data: 'ranking' }}><img src={rank} width = '100px' heigth = "200"/> <br></br> </Link></td>
                  <td></td>
                </tr>
              </tbody>
          </Table>
        </div>
      </section>
    );
  }
}
