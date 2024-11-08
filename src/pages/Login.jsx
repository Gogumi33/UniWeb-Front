import React, { useState } from 'react';
import styled from 'styled-components';
import { login } from '../APIs/loginAPI';
import { useNavigate } from 'react-router-dom';

function SignInComponent({ toggleComponent, handleLogin }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 제출 폼 클릭 시 handleSubmit 함수 실행.
  const handleSubmit = async(event) => {
    event.preventDefault();

    const userData = {
      id,
      password
    };

    try {
      const response = await login(userData);

      console.log(userData); // { id: "입력된 아이디", password: "입력된 비밀번호" } test.
      console.log(response, "test"); // test2. 

      if (response.status >= 200 && response.status < 300) {
        const message = await response.data; // response.json -> data로 변경(수정)
        alert(message);
        handleLogin(); // 로그인 상태 true로 변경.
        navigate('/');  // 메인 페이지 리디렉션

      } else {
        const errorMessage = await response.data; // response.json -> data로 변경(수정)
        throw new Error(errorMessage);
      }

    } catch (error) {
      console.error('로그인 실패: ', error);
      alert('로그인에 실패했습니다');
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit}>
        <SignInHeader>🔒 로그인 🔒</SignInHeader>
        <div id="logincomp" style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <InputDiv className="loginId">
            <Input
              type="text"
              maxLength="30"
              id="username"
              value={id}
              autoComplete="new-password"
              onChange={(event) => setId(event.target.value)}
              placeholder='아이디'
            />
          </InputDiv>
        </div>
        <div id="passwordcomp" style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <InputDiv className="loginPassword">
            <Input
              type="password"
              id="password"
              value={password}
              autoComplete="new-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder='비밀번호'
            />
          </InputDiv>
        </div>
        <SignInButton type="submit">로그인</SignInButton>
        <SignUpButton type="button" onClick={() => navigate('/register')}>회원가입</SignUpButton>
      </LoginForm>
    </div>
  );
}

export default SignInComponent;

const SignInHeader = styled.div`
  margin-bottom: 30px;
`;

const LoginForm = styled.form`
  font-size: 15px;
  padding-top: 80px;
  padding-bottom: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #000;
  margin-bottom: 30px;
  padding-bottom: 15px;

  &:focus {
    outline: none;
  }
`;

const InputDiv = styled.div`
  width: 100%;
`;

const SignInButton = styled.button`
  width: 60%;
  height: 50px;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SignUpButton = styled.button`
  width: 60%;
  height: 50px;
  color: black;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
`;