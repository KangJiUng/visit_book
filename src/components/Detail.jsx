import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../App.css";
import axios from "axios";

function PostDetail() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function data() {
            try {
                let data = await axios.get(`http://leaveeverything.kro.kr:8080/comments/${postId}`);
                // 데이터 전송 후 원하는 작업 수행
                setPost(data.data);
                console.log("방명록을 불러왔습니다.");
            } catch (error) {
                console.error("실패했습니다.", error);
            }
        }
        data();
    }, [postId]);

    const handleHome = () => {
        navigate("/list");
    };

    const handleEdit = () => {
        // 수정 페이지로 이동
        navigate(`/edit/${postId}`);
    };

    // 삭제 코드
    const handleDelete = async () => {
        try {
            await axios.delete(`http://leaveeverything.kro.kr:8080/comments/${postId}`);
            alert("방명록을 삭제했습니다.");
            navigate("/list");
        } catch (error) {
            console.error("실패했습니다.", error);
        }
    };

    // 특정 글을 가져오는 비동기 코드 필요

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <div className="App-header2">
            <h1>방명록 상세페이지</h1>
            <div className="card-list2">
                <h2 className="title2">{post.subject}</h2>
                <p className="content">{post.content}</p>
                <p className="writer">작성자: {post.writer}</p>
            </div>
            <div className="button-container">
                <p className="button2" onClick={handleHome}>
                    돌아가기
                </p>
            </div>
        </div>
        <div className="Copyright">
        Copyright © 2023 강지웅. All rights reserved.
      </div></div>
    );
}

export default PostDetail;