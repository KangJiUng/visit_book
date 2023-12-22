import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./create.css";

const PostCreate = () => {
    const navigate = useNavigate();
    const [subject, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");

    const handleHome = () => {
        navigate("/list");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 비동기로 생성 요청을 보내는 코드

        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("content", content);
        formData.append("writer", writer);

        try {
            await axios.post("http://leaveeverything.kro.kr:8080/comments", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("방명록이 성공적으로 생성되었습니다.");
            handleHome();
        } catch (error) {
            alert("메모 생성에 실패했습니다.", error);
        }
    };


return (
    <div>
    <div className="App-header2">
        <h2>방명록 작성하기</h2>
        <form onSubmit={handleSubmit} className="card_create">
            <div className="form-group">
                <label className="card-title">제목</label>
                <input
                    type="text"
                    id="title"
                    value={subject}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label className="card-content">내용</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="writer">작성자</label>
                <input
                    type="text"
                    id="writer"
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                    required
                />
            </div>
            <div className="button2-container">
                <button className="button2" type="submit">
                    완료
                </button>
            </div>
        </form>
        <div>
                    <div className="button3-container">
                        <button className="button2" onClick={handleHome}>
                            돌아가기
                        </button>
                    </div>
                </div>
    </div>
    <div className="Copyright">
    Copyright © 2023 강지웅. All rights reserved.
  </div></div>
);
};

export default PostCreate;