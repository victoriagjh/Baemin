import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './App.css';
import logo from './imgs/mainLogo.png';

import Table from 'react-bootstrap/Table';


import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';

import chicken from './imgs/chicken.png';


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
var locationInfo = "";

Modal.setAppElement('body');
export default class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

  }
  onMainLogoClick(){

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
    console.log(this.state.category)
    let page_information = this.state.category
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
    let storeTable = null;
    if(searchLocation=null) {
      alert("위치를 지정해주세요!");
    }
    if(this.state.category != null) {
      if(this.state.category === "chicken") {
        storeTable = (
          <Table striped bordered hover>
              <tbody>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "image"  src={chicken}  width='100px' align = "left" value="Open"/>
                    </td>
                    <td>
                      <h5   margin-left="auto" margin-right= "auto">밀라노텐 치킨</h5>
                      <h5   className="btn-block z-depth-1a" margin-left="auto" margin-right= "auto"> ✩ 4.1  |  최근리뷰 100+</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "image"  src={chicken}  width='100px' align = "left" value="Open"/>
                    </td>
                    <td>
                      <h5   margin-left="auto" margin-right= "auto">네네치킨 서천점</h5>
                      <h5   className="btn-block z-depth-1a" margin-left="auto" margin-right= "auto"> ✩ 4.3  |  최근리뷰 100+</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "image"  src={chicken}  width='100px' align = "left" value="Open"/>
                    </td>
                    <td>
                      <h5   margin-left="auto" margin-right= "auto">KFC 영통 씨네마점</h5>
                      <h5   className="btn-block z-depth-1a" margin-left="auto" margin-right= "auto"> ✩ 4.1  |  최근리뷰 10+</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "image"  src={chicken}  width='100px' align = "left" value="Open"/>
                    </td>
                    <td>
                      <h5   margin-left="auto" margin-right= "auto">올레치킨피자 본점</h5>
                      <h5   className="btn-block z-depth-1a" margin-left="auto" margin-right= "auto"> ✩ 4.6  |  최근리뷰 100+</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "image"  src={chicken}  width='100px' align = "left" value="Open"/>
                    </td>
                    <td>
                      <h5   margin-left="auto" margin-right= "auto">호식이 두마리 치킨 신영통점</h5>
                      <h5   className="btn-block z-depth-1a" margin-left="auto" margin-right= "auto"> ✩ 4.0  |  최근리뷰 100+</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "image"  src={chicken}  width='100px' align = "left" value="Open"/>
                    </td>
                    <td>
                      <h5   margin-left="auto" margin-right= "auto">치킨마루 수원영통경희대점</h5>
                      <h5   className="btn-block z-depth-1a" margin-left="auto" margin-right= "auto"> ✩ 4.7 |  최근리뷰 100+</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "image"  src={chicken}  width='100px' align = "left" value="Open"/>
                    </td>
                    <td>
                      <h5   margin-left="auto" margin-right= "auto">처갓집 양념치킨 영통점</h5>
                      <h5   className="btn-block z-depth-1a" margin-left="auto" margin-right= "auto"> ✩ 4.4 |  최근리뷰 100+</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "image"  src={chicken}  width='100px' align = "left" value="Open"/>
                    </td>
                    <td>
                      <h5   margin-left="auto" margin-right= "auto">치킨플러스 수원 영통점</h5>
                      <h5   className="btn-block z-depth-1a" margin-left="auto" margin-right= "auto"> ✩ 4.8  |  최근리뷰 100+</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "image"  src={chicken}  width='100px' align = "left" value="Open"/>
                    </td>
                    <td>
                      <h5   margin-left="auto" margin-right= "auto">칰칰 펍펍</h5>
                      <h5   className="btn-block z-depth-1a" margin-left="auto" margin-right= "auto"> ✩ 4.8  |  최근리뷰 100+</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "image"  src={chicken}  width='100px' align = "left" value="Open"/>
                    </td>
                    <td>
                      <h5   margin-left="auto" margin-right= "auto">쌀쌀맞은 닭 수원 경희대점</h5>
                      <h5   className="btn-block z-depth-1a" margin-left="auto" margin-right= "auto"> ✩ 4.6  |  최근리뷰 100+</h5>
                    </td>
                  </tr>
              </tbody>
          </Table>
        );
      }
      }

    return (
      <section id="category">
        <div className="cover">
          <div className = "Headers">
          <Link to="/" onClick={this.onMainLogoClick.bind(this)}><img className ="logo" src={logo} width='150px'></img></Link>
          </div>
          <div>
          <p>
            <strong>배달 주소 입력</strong>
          </p>
          <InputGroup className="mb-3">
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
        </div>
          <div className="contents">
            <h2 className="subtitle">식당을 골라주세요</h2>
              {storeTable}
          </div>
        </div>
      </section>
    );
  }
}
