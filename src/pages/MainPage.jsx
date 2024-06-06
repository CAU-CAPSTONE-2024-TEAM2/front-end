import React, { useState, useEffect } from "react";
import Footer from '../components/footer.jsx'
import ProfileCard from '../components/profileCard.jsx'
import Nav from '../components/nav.jsx'
import Carousel from '../components/carousel.jsx'
import Welcome from '../components/welcome.jsx'
import { useRecoilValue } from "recoil"
import { accessTokenState } from '../hooks/Auth';

const Main = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const isLoggedIn = Boolean(accessToken);

  return (
    <div>
      <Nav />
      <Carousel />
      {isLoggedIn ? <ProfileCard /> : null}
      <Footer />
    </div>
  );
};

export default Main;
