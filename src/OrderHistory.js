import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './App.css';

export default class OrderHistory extends Component {
  constructor(){
    super();
    this.state = {

    }

  }
  render() {
    return (

      <section id="home">
        <div className="cover">
          <div className="contents">
            <h2 className="subtitle">Order으로 이동했어요</h2>
          </div>
        </div>
        <div className="signup">
        </div>
      </section>
    );
  }
}