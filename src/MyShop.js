import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';

import './App.css';
import './Myshop.css';

import logo from './imgs/mainLogo.png';

import black from './imgs/blackbean.jpg';
import Tteokbokki from './imgs/Tteokbokki.jpg';
import chicken from './imgs/chicken.jpeg';
import pizzaheaven from './imgs/pizzaheaven.jpg';
import Modal from "react-awesome-modal";

export default class MyShop extends Component {
  constructor(){
    super();
    this.state = {
      isblackbean : false,
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
      isblackbean: true,
      isTteokbokki:false,
      ischicken:false,
      ispizza :false
    });
    console.log("BlackBeanClick");
  }
  onTteokbokkiClick(){
    this.setState({
      visible : true,
      isblackbean: false,
      isTteokbokki:true,
      ischicken:false,
      ispizza :false
    });
    console.log("TteokbokkiClick");
  }
  onchickenClick(){
    this.setState({
      visible : true,
      isblackbean: false,
      isTteokbokki:false,
      ischicken:true,
      ispizza :false
    });
    console.log("chickenClick");
  }
  onpizzaClick(){
    this.setState({
      visible : true,
      isblackbean: false,
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
    if(this.state.isblackbean)
    {
      switchedForUserType = (

        <Modal visible={this.state.visible} width="400" height="800" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div>
                <br></br>
                <h3 className="dark-grey-text mb-5">
                    <strong>미챠이</strong>
                </h3>
                <link rel="stylesheet" href="Myshop.css"></link>
                <p class = 'star-point' >★★★★✩ 4.1</p>
                <p>최근 리뷰 129 | 최근 사장님 댓글 0</p>
                <hr color = "black"></hr>
                <p> 최소 주문금액 : 10000원 </p>
                <p> 결제 방법 : 바로결제, 만나서 결제</p>

                <hr color = "black"></hr>
                <h3 className="dark-grey-text mb-5">
                    <strong>대표메뉴</strong>
               </h3>
                <p>짜장면 : 5,000원</p>
                <p>삼선짬뽕 : 8,500원</p>
                <p>과일탕수육 : 16,000원 ~ 26,000원</p>
                <p>세트5 : 20,000원</p>
                <p>삼겹제육덮밥 : 7,500원</p>
                <p>고추잡채밥 : 7,500원</p>

              <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
          </div>
        </Modal>
      )
    }

    else if(this.state.isTteokbokki)
    {
      switchedForUserType = (

        <Modal visible={this.state.visible} width="400" height="800" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div>
                <br></br>
                <h3 className="dark-grey-text mb-5">
                    <strong>동대문엽기떡볶이 수원영통점</strong>
                </h3>

                <link rel="stylesheet" href="Myshop.css"></link>
                <p class = 'star-point' >★★★✩✩ 3.4</p>
                <p>최근 리뷰 167 | 최근 사장님 댓글 63</p>
                <hr color = "black"></hr>
                <p> 최소 주문금액 : 15000원 </p>
                <p> 결제 방법 : 바로결제, 만나서 결제</p>

                <hr color = "black"></hr>
                <h3 className="dark-grey-text mb-5">
                    <strong>대표메뉴</strong>
               </h3>
                <p>A set : 17,000원</p>
                <p>B set : 19,000원</p>
                <p>엽기떡볶이 : 14,000원</p>
                <p>엽기오뎅 : 14,000원</p>
                <p>엽기닭볶음탕 : 24,000원</p>
                <p>참숯 뼈없는 닭발 : 15,000원</p>

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
                <p class = 'star-point' >★★★★✩ 4.6</p>
                <p>최근 리뷰 872 | 최근 사장님 댓글 729</p>
                <hr color = "black"></hr>
                <p> 최소 주문금액 : 10000원 </p>
                <p> 결제 방법 : 바로결제, 만나서 결제</p>

                <hr color = "black"></hr>
                <h3 className="dark-grey-text mb-5">
                    <strong>대표메뉴</strong>
               </h3>
                <p>전통안동찜닭 : 17,000원 ~ 32,000원</p>
                <p>얼큰이안동찜닭 : 18,000원 ~ 33,000원</p>
                <p>순살찜닭 : 19,000원 ~ 34,000원</p>
                <p>치즈순살찜닭 : 22,000원 ~ 39,000원</p>


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
                <p class = 'star-point' >★★★★✩ 4.4</p>
                <p>최근 리뷰 88 | 최근 사장님 댓글 0</p>
                <hr color = "black"></hr>
                <p> 최소 주문금액 : 15000원 </p>
                <p> 결제 방법 : 바로결제</p>

                <hr color = "black"></hr>
                <h3 className="dark-grey-text mb-5">
                    <strong>대표메뉴</strong>
               </h3>
                <p>불닭 & 갈비치킨 : 18,900원</p>
                <p>1988 피자 : 17,900원</p>
                <p>사대천왕 : 22,900원</p>
                <p>눈꽃치즈 스테이크 피자 : 24,900원</p>
                <p>쉬림프디럭스 : 17,900원</p>
                <p>고구마스위트 : 16,900원</p>


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
                    <strong>찜한가게</strong>
                  </h3>
                </div>

                <div>
                  <p align = "left">
                    <strong>총 : 4개</strong>
                    </p>
                </div>

                <div >
                <input type = "image" className ="black" src={black}  width='100px' align = "left" value="Open" onClick={() => this.onBlackBeanClick()}/>
                <p align = "left"value="Open" onClick={() => this.onBlackBeanClick()}><strong>미챠이</strong></p>
                <p align = "left"> ★ 4.1 | 최근리뷰 100+</p>
                </div>
                <br></br>
                <hr color = "black"></hr>

                <div>
                <input type = "image" className ="Tteokbokki" src={Tteokbokki}  width='100px' align = "left" value="Open" onClick={() => this.onTteokbokkiClick()}/>
                <p align = "left" value="Open" onClick={() => this.onTteokbokkiClick()} ><strong>동대문엽기떡볶이 수원영통점</strong></p>
                <p align = "left"> ★ 3.4 | 최근리뷰 100+</p>
                </div>
                <br></br>
                <hr color = "black"></hr>

                <div>
                <input type = "image" className ="chicken" src={chicken}  width='100px' align = "left" value="Open" onClick={() => this.onchickenClick()}/>
                <p align = "left" value="Open" onClick={() => this.onchickenClick()}><strong>찜닭마루</strong></p>
                <p align = "left"> ★ 4.6 | 최근리뷰 100+</p>
                </div>
                <br></br>
                <hr color = "black"></hr>

                <div>
                <input type = "image" className ="pizzaheaven" src={pizzaheaven}  width='100px' align = "left" value="Open" onClick={() => this.onpizzaClick()}/>
                <p align = "left" value="Open" onClick={() => this.onpizzaClick()}><strong>김준현의피자헤븐 수원영통점</strong></p>
                <p align = "left"> ★ 4.4 | 최근리뷰 50+</p>
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
