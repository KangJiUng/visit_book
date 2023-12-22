import "./../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function data() {
      try {
        let data = await axios.get("http://leaveeverything.kro.kr:8080/comments");
        // 데이터 전송 후 원하는 작업 수행
        setPosts(data.data);
        console.log("방명록을 불러왔습니다.");
      } catch (error) {
        console.error("실패했습니다.", error);
      }
    }
    data();
  }, []);


  return (
    <div>
    <div className="App-header1">
      <h1>어서오세요!</h1>
      <h3>만드느라 수고한 강지웅에게 한 마디</h3>
      <div className="card-container">
        {posts.map((post) => (
          <div key={post.id} className="card-list1">
            <Link to={`/post/${post.id}`}>
              <div className="title">{post.subject}</div>
            </Link>
            <p className="writer">작성자: {post.writer}</p>
          </div>
        ))}
      </div>
      <Link className="button1" to="/write">
        방명록 작성 {/*to는 경로설정*/}
      </Link>
      <div className="mainlink">
        <Link to={"/"}>
          메인페이지</Link>
      </div>
    </div>
    <div className="Copyright">
    Copyright © 2023 강지웅. All rights reserved.
  </div></div>
  );

}

export default PostList;