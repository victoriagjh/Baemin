import React, { Component } from 'react';
import { Link,Redirect } from "react-router-dom";

import './App.css';
import logo from './imgs/mainLogo.png';

import Table from 'react-bootstrap/Table';

import { MDBBtn } from "mdbreact";

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
      modalIsOpen: false,
      storeName:this.props.location.data,
      address:"",
      total:0,
      menus:"",
      orderSuccess:false
    }
    this.onMenuCheckBoxChange = this.onMenuCheckBoxChange.bind(this);
    this.onOrderClick = this.onOrderClick.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  };
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
  onOrderClick() {
    alert("주문 성공!");
    this.setState({orderSuccess:true});
  }
  onMenuCheckBoxChange = (changeEvent) => {
     let a = {
       18900: "불닭&갈비치킨",
       22900: "사대천왕",
       1500: "콘샐러드"
     }
     let ts=a[changeEvent.target.value];
     let t = this.state.menus + " , " + ts;
     this.setState({menus:t});

    if(changeEvent.target.checked) {
      let temp= this.state.total + changeEvent.target.value*1;
      this.setState({total:temp})
    } else {
      let temp= this.state.total - changeEvent.target.value*1;
      this.setState({total:temp})
    }
    console.log(this.state.total);
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
    this.setState({address:fullAddress});
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
    let searchLocation=null;
    if(this.state.orderSuccess == true) {
      return <Redirect to ={{ pathname: "/",  data: this.state.username }} />
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
      <section id="category">
        <div className="cover">
          <div className = "Headers">
          <Link to="/" onClick={this.onMainLogoClick.bind(this)}><img className ="logo" src={logo} width='150px'></img></Link>
          </div>
          <div>
            <h1>김준현의 피자헤븐 수원영통점</h1>
            <p class = 'star-point' >★★★★✩ 4.4</p>
            <h4 margin-left="auto" margin-right= "auto">최근리뷰 86 | 최근 사장님 댓글 </h4>
            <h4 margin-left="auto" margin-right= "auto">최소주문금액 : 15000</h4>
            <h4 margin-left="auto" margin-right= "auto">결제방법 : 바로결제, 만나서 결제</h4>
          </div>
          <br/>
          <div className="contents">
            <h2>{this.state.storeName}</h2>

            <h4 text-align="left">대표 메뉴</h4>
            <Table striped bordered hover>
              <tbody>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="18900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">불닭 & 갈비치킨   18900원</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="17900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">1988 피자   17900원</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="22900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">사대천왕   22900원</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="24900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">눈꽃치즈 스테이크 피자   24900</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="16900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">고구마 스위트   16900원</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="17900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">쉬림프 디럭스   17900원</h5>
                    </td>
                  </tr>
              </tbody>
            </Table>
            <br/>
            <h4 text-align="left">세트 메뉴</h4>
            <Table striped bordered hover>
              <tbody>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="32900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">빅라지 세트   32900원</h5>
                      <h6 margin-left="auto" margin-right= "auto" >빅라지 피자+ 사이드 디쉬 중 택1+ 콘 샐러드 + 콜라 1.25L</h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="32900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">빅라지 세트(하프 앤 하프)   32900원</h5>
                      <h6 margin-left="auto" margin-right= "auto" >빅라지 피자(반/반)+ 사이드 디쉬 중 택1+ 콘 샐러드 + 콜라 1.25L</h6>
                    </td>
                  </tr>
              </tbody>
            </Table>

            <h4 text-align="left">피자 Large 메뉴 </h4>
            <Table striped bordered hover>
              <tbody>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="21900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 1988 피자</h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   21,900원 </h6>

                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="27900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 크림 치즈 새우 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   27,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="28900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 눈꽃치즈 멕시카나 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   28,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="22900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 사대천왕 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   22,900원 </h6>
                    </td>
                  </tr>

                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="27900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 하와이안 폴드포크 피자 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   27,900원 </h6>
                    </td>
                  </tr>

                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="28900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 눈꽃치즈 스테이크 피자 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   28,900원 </h6>
                    </td>
                  </tr>

                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="18900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 더블치즈 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   18,900원 </h6>
                    </td>
                  </tr>

                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="18900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 페퍼로니 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   18,900원 </h6>
                    </td>
                  </tr>

                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="18900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 하와이안 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   18,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="19900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 더블치즈베이컨 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   19,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="19900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 슈퍼슈프림 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   19,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="19900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 아메리칸스페셜 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   19,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="19900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 헤븐스페셜 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   19,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="20900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 고구마스위트 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   20,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="19900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 불고기피자 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   19,900원 </h6>
                    </td>
                  </tr>

                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="19900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 포테이노피자</h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   19,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="20900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 핫앤스파이시 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   20,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="21900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 더블포테이토 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   21,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="21900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 레드핫치킨 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   21,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="21900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 쉬림프디럭스 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   21,900원 </h6>
                    </td>
                  </tr>

                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="21900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 치킨바베큐피자 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   21,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="21900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 쿼터드레싱포테이토 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   21,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="21900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 헤븐리 포 치즈 피자 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   21,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="22900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 그릴드포크밸리 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   22,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="25900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 미트 킹덤 피자 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   25,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="19900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 하프앤하프 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   19,900원 </h6>
                    </td>
                  </tr>
                </tbody>

            </Table>

            <h4 text-align="left">신메뉴</h4>
            <Table striped bordered hover>
              <tbody>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="18900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 불닭 볶음 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 M   18,900원 </h6>

                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="22900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 불닭 볶음 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   22,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="30900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 불닭 볶음 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 Big L   30,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="22900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 갈비 치킨 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 M   22,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="22900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 갈비 치킨 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   22,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="30900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 갈비 치킨 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 Big L   30,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="22900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 불닭 & 갈비 치킨 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 L   22,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="30900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 불닭 & 갈비 치킨 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 Big L   30,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="2000" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 핫도그 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 2,000원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="3500" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 김자 너겟 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 3,500원 </h6>
                    </td>
                  </tr>

              </tbody>
            </Table>



            <h4 text-align="left">음료 및 사이드메뉴</h4>
            <Table striped bordered hover>
              <tbody>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="7000" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 핫윙 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 8조각   7,000원 </h6>

                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="7800" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 순가슴살치킨 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 10조각   7,800원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="7000" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 새우 도넛 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 8조각   7,000원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="13900" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 치킨콤보 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 오리지널 M   13,900원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="7000" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 볼로네즈 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 7,000원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="1500" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 콘샐러드 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 1,500원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="300" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 피클 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 1개   300원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="200" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 갈릭소스 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 1개   200원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="100" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 핫소스 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 1개   100원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="100" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 허니 머스타드 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 1개   100원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="100" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 케찹 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 1개   100원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="2000" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h5 margin-left="auto" margin-right= "auto" font-weight= "bold"> 코카콜라 </h5>
                    <h6 margin-left="auto" margin-right= "auto" > 1.25L   2,000원 </h6>
                    <h6 margin-left="auto" margin-right= "auto" > 500mL   1,500원 </h6>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox" align = "left" value="2100" onChange={this.onMenuCheckBoxChange}/>
                    </td>
                    <td>
                    <h6 margin-left="auto" margin-right= "auto" > 1.25L   2,100원 </h6>
                    <h6 margin-left="auto" margin-right= "auto" > 500mL   1,500원 </h6>
                    </td>
                  </tr>


              </tbody>
            </Table>

          </div>
          <div>
            <br/>
            <p>주문 내역 : {this.state.menus}</p>
            <br/>
            <p>가격 : {this.state.total}</p>
            <br/>
          </div>
          <div>
          <p>
            <strong>배달 주소 입력</strong>
          </p>
          <InputGroup className="mb-3">
            <FormControl
            placeholder={this.state.address}
            aria-label="place"
            aria-describedby="basic-addon1"
            onClick={this.openModal}
            />
            <InputGroup.Append>
              <button id="search" onClick={this.openModal} style={{fontWeight: "bold" , color : "#36B8CF"}}>검색</button>
              {searchLocation}
              </InputGroup.Append>
          </InputGroup>
          </div>
            <p>결제 수단을 선택해주세요</p>
            <Table striped bordered hover>
              <tbody>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox"/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">네이버 페이</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox"/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">배민 페이</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox"/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">배민페이 계좌이체</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox"/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">신용카드 결제</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox"/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">휴대폰 결제</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox"/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">토스</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox"/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">카카오 페이</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox"/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">페이코</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox"/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">만나서 카드결제</h5>
                    </td>
                  </tr>
                  <tr vertical-align= "middle">
                    <td width = "100px">
                      <input type = "checkbox"/>
                    </td>
                    <td>
                      <h5 margin-left="auto" margin-right= "auto" font-weight= "bold">만나서 현금결제</h5>
                    </td>
                  </tr>
              </tbody>
            </Table>
          <div>
            <MDBBtn onClick ={this.onOrderClick}>주문하기!</MDBBtn>
          </div>

        </div>
      </section>
    );
  }
}
