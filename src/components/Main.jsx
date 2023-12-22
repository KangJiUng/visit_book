import "./../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mainlogo from './image/Comment.png';

function Main() {   

  return (
    <div>
    <div className="App-header1">
      <div>
        <div className="main-content">
          <h1 className="Main-title">심심할 때<br/> 들러보세요.</h1>
          <h5 className="Sub-title">코스믹 멘토링의 강지웅&김민정,<br/> 
          벙커에서 열심히 만들었습니다.<br/> 
          하고 싶은 말이 있다면 남겨보세요.</h5>
        </div>
        <div className="button1-container">
          <Link className="button1" to="/list">
            방문하기 {/*to는 경로설정*/}
          </Link> 
        </div>
      </div>
      <div className="main-logo">
        <img src={mainlogo} alt="Mainlogo" />
      </div>
    </div> <div className="Copyright">
    Copyright © 2023 강지웅. All rights reserved.
  </div></div>
  );
}

export default Main;
