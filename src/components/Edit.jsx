import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './edit.css';
import axios from "axios";

const PostEdit = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [writer, setWriter] = useState('');

    // 기존 글 데이터를 불러오는 비동기 함수 호출

    useEffect(() => {
        async function data() {
            try {
                let data = await axios.get(`http://leaveeverything.kro.kr:8080/comments/${postId}`);
                // 데이터 전송 후 원하는 작업 수행
                setSubject(data.data.subject);
                setContent(data.data.content);
                setWriter(data.data.writer);
                console.log("방명록을 불러왔습니다.");
            } catch (error) {
                console.error("실패했습니다.", error);
            }
        }
        data();
    }, [postId]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("content", content);
        formData.append("writer", writer);
        try {
            await axios.put(`http://leaveeverything.kro.kr:8080/comments/${postId}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("방명록이 수정되었습니다.");
            handleCancel();
        } catch (error) {
            alert("방명록 수정에 실패했습니다.", error);
        }
    };

    const handleCancel = () => {
        // 수정 취소 후 글 상세 페이지로 이동
        navigate(`/post/${postId}`);
    };
    return (
        <div>
        <div className="App-header2">
            <h2>방명록 수정하기</h2>
            <form onSubmit={handleSubmit} className="card">
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>작성자</label>
                    <input
                        type="text"
                        value={writer}
                        onChange={(e) => setWriter(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <div className="button3-container">
                        <button className="button2" type="submit">수정 완료</button>
                        <button className="button2" onClick={handleCancel}>
                            돌아가기
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div className="Copyright">
        Copyright © 2023 강지웅. All rights reserved.
      </div></div>
    );
};

export default PostEdit;