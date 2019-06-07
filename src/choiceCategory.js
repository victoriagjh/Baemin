import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './App.css';

export default class ChoiceCategory extends Component {
  constructor(props){
    super(props);
    this.state = {
      category:this.props.location.data
    }
  }

  render() {
    console.log(this.state.category)
    let page_information = this.state.category
    return (
      <section id="home">
        <div className="cover">
          <div className="contents">
            <h2 className="subtitle">식당을 골라주세요</h2>
          </div>
        </div>
        <div className="signup">
        </div>
      </section>
    );
  }
}
