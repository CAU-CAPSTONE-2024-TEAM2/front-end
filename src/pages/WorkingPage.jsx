import React from "react";
import Footer from '../components/footer.jsx';
import Nav from '../components/nav.jsx';
import { useRecoilValue } from "recoil";
import { accessTokenState } from '../hooks/Auth';
import '../styles/WorkingPage.css';

const WorkingPage = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const isLoggedIn = Boolean(accessToken);

  return (
    <div className="working-page-container">
      <Nav />
      <div className="content">
        <h1>이 페이지는 아직 작업중입니다.</h1>
      </div>
      <Footer />
    </div>
  );
};

export default WorkingPage;
