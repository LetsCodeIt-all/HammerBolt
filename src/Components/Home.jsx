import React from "react";

function Home() {
  return (
    <div className="HeroSection">
      <div className="Banner">
        <div className="BannerBtns">
          <div>
            <h3> Best Prices</h3>
            <h1>Incredible Prices on All Your Favorite Items</h1>
            <p>Get more for less on selected brands</p>
            <button>Shop</button>
          </div>
        </div>
        <div className="BannerImg">
          <div>
            <img
              className="Img1"
              src="https://img.freepik.com/free-photo/woman-working-from-home-laptop_53876-132032.jpg"
              alt=""
            />
            <img
              className="Img2"
              src="https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039318.jpg"
              alt=""
            />
            <img
              className="Img3"
              src="https://img.freepik.com/free-photo/closeup-hand-holding-mobile-phone-red-bokeh-background_1409-3302.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="2Boxs">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;
