import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';

import './App.css';
import './OrderHistory.css';

import logo from './imgs/mainLogo.png';

import Tteokbokki from './imgs/Tteokbokki.jpg';
import chicken from './imgs/chicken.jpeg';
import pizzaheaven from './imgs/pizzaheaven.jpg';
import Modal from "react-awesome-modal";

export default class MyShop extends Component {
  constructor(){
    super();
    this.state = {
      isTteokbokki : false,
      ischicken : false,
      ispizza : false,
      visible : false
    }
  }
  onMainLogoClick(){

  }
  onImageClick()
  {

  }
  onBlackBeanClick(){
    this.setState({
      visible : true,
      isTteokbokki:false,
      ischicken:false,
      ispizza :false
    });
    console.log("BlackBeanClick");
  }
  onTteokbokkiClick(){
    this.setState({
      visible : true,
      isTteokbokki:true,
      ischicken:false,
      ispizza :false
    });
    console.log("TteokbokkiClick");
  }
  onchickenClick(){
    this.setState({
      visible : true,
      isTteokbokki:false,
      ischicken:true,
      ispizza :false
    });
    console.log("chickenClick");
  }
  onpizzaClick(){
    this.setState({
      visible : true,
      isTteokbokki:false,
      ischicken:false,
      ispizza :true
    });
    console.log("PizzaClick");
  }

  openModal() {
    this.setState({
        visible : true

    });
}

closeModal() {
    this.setState({
        visible : false
    });
}
  render() {
    let switchedForUserType = null;

    if(this.state.isTteokbokki)
    {
      switchedForUserType = (

        <Modal visible={this.state.visible} width="400" height="800" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div>
                <br></br>
                <h3 className="dark-grey-text mb-5">
                    <strong>동대문엽기떡볶이 수원영통점</strong>
                </h3>

                <link rel="stylesheet" href="Myshop.css"></link>

                <hr color = "black"></hr>
                <h3 className="dark-grey-text mb-5">
                    <strong>주문내역</strong>
               </h3>
                <p>A set : 17,000원</p>
                <p>참숯 뼈없는 닭발 : 15,000원</p>
                <p>총 : 32,000원</p>

              <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
          </div>
        </Modal>
      )
    }

    else if(this.state.ischicken)
    {
      switchedForUserType = (

        <Modal visible={this.state.visible} width="400" height="800" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div>
                <br></br>
                <h3 className="dark-grey-text mb-5">
                    <strong>찜닭마루</strong>
                </h3>
                <link rel="stylesheet" href="Myshop.css"></link>

                <hr color = "black"></hr>
                <h3 className="dark-grey-text mb-5">
                    <strong>주문내역</strong>
               </h3>
                <p>전통안동찜닭 : 32,000원</p>
                <p>치즈순살찜닭 : 22,000원</p>
                <p>총 : 54,000원</p>

              <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
          </div>
        </Modal>
      )
    }
    else
    {
      switchedForUserType = (

        <Modal visible={this.state.visible} width="400" height="800" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <div>
                <br></br>
                <h3 className="dark-grey-text mb-5">
                    <strong>김준현의 피자헤븐 수원영통점</strong>
                </h3>
                <link rel="stylesheet" href="Myshop.css"></link>

                <hr color = "black"></hr>
                <h3 className="dark-grey-text mb-5">
                    <strong>주문내역</strong>
               </h3>
                <p>불닭 & 갈비치킨 : 18,900원</p>
                <p>눈꽃치즈 스테이크 피자 : 24,900원</p>
                <p>쉬림프디럭스 : 17,900원</p>
                <p>총 : 61,700원</p>

                <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
            </div>
        </Modal>
      )
    }

    return (

      <section id="home">
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
                    <strong>주문내역</strong>
                  </h3>
                </div>

                <div>
                  <p align = "left">
                    <strong>총 : 3개</strong>
                    </p>
                </div>

                <div>
                <input type = "image" className ="Tteokbokki" src={Tteokbokki}  width='100px' height='100px' align = "left" value="Open" onClick={() => this.onTteokbokkiClick()}/>
                <p align = "left" value="Open" onClick={() => this.onTteokbokkiClick()} ><strong>동대문엽기떡볶이 수원영통점</strong></p>
                <p align = "right"> 내 별점 : ★★★★★ 5.0</p>
                <p align = "left"> 주문일 : 2019/05/30</p>
                <p align = "right"> 총 주문액 : 32,000원</p>

                </div>
                <br></br>
                <hr color = "black"></hr>

                <div>
                <input type = "image" className ="chicken" src={chicken}  width='100px' height='100px' align = "left" value="Open" onClick={() => this.onchickenClick()}/>
                <p align = "left" value="Open" onClick={() => this.onchickenClick()}><strong>찜닭마루</strong></p>
                <p align = "right"> 내 별점 : ★★★✩✩ 3.0</p>
                <p align = "left"> 주문일 : 2019/05/21</p>
                <p align = "right"> 총 주문액 : 54,000원</p>

                </div>
                <br></br>
                <hr color = "black"></hr>

                <div>
                <input type = "image" className ="pizzaheaven" src={pizzaheaven}  width='100px' height='100px' align = "left" value="Open" onClick={() => this.onpizzaClick()}/>
                <p align = "left" value="Open" onClick={() => this.onpizzaClick()}><strong>김준현의피자헤븐 수원영통점</strong></p>
                <p align = "right"> 내 별점 : ★★★★✩ 4.3</p>
                <p align = "left"> 주문일 : 2019/05/02</p>
                <p align = "right"> 총 주문액 : 61,700원</p>

                </div>
              </MDBCardBody>

            </MDBCard>
          </MDBCol>
        </MDBRow>
        </MDBContainer>

        {switchedForUserType}
      </section>

    );
  }
}
