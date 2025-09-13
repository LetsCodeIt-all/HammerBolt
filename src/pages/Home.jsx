import React from "react";
import MopedIcon from "@mui/icons-material/Moped";
import { Package } from "lucide-react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ScheduleIcon from "@mui/icons-material/Schedule";
function Home() {
  let categories = [
    {
      name: "Mobile",
      imgUrl:
        "https://static.wixstatic.com/media/c837a6_9c30b13d43264ebf888ab1e70eaf2daa~mv2.jpg/v1/fill/w_124,h_124,q_90,enc_avif,quality_auto/c837a6_9c30b13d43264ebf888ab1e70eaf2daa~mv2.jpg",
    },
    {
      name: "Computer",
      imgUrl:
        "https://static.wixstatic.com/media/c837a6_82b44061aa3e4ad6958d2a1ac317199c~mv2.jpg/v1/fill/w_124,h_124,enc_avif,quality_auto/c837a6_82b44061aa3e4ad6958d2a1ac317199c~mv2.jpg",
    },
    {
      name: "Tablets",
      imgUrl:
        "https://static.wixstatic.com/media/c837a6_6d6b2a5842f449539f528c501e5cc035~mv2.jpg/v1/fill/w_124,h_124,q_90,enc_avif,quality_auto/c837a6_6d6b2a5842f449539f528c501e5cc035~mv2.jpg",
    },
    {
      name: "Sale",
      imgUrl:
        "https://static.wixstatic.com/media/c837a6_3fae8a0f61fc49c0afe7217c479c8e16~mv2.png/v1/fill/w_124,h_124,q_90,enc_avif,quality_auto/c837a6_3fae8a0f61fc49c0afe7217c479c8e16~mv2.png",
    },
    {
      name: "EarWear",
      imgUrl:
        "https://static.wixstatic.com/media/c837a6_e0521967c9bb422abb3a3913f64d1eb5~mv2.jpg/v1/fill/w_124,h_124,q_90,enc_avif,quality_auto/c837a6_e0521967c9bb422abb3a3913f64d1eb5~mv2.jpg",
    },
    {
      name: "Wearables",
      imgUrl:
        "https://static.wixstatic.com/media/c837a6_71e3b067871a4b6a88c3b93a55ba2b00~mv2.jpg/v1/fill/w_124,h_124,q_90,enc_avif,quality_auto/c837a6_71e3b067871a4b6a88c3b93a55ba2b00~mv2.jpg",
    },

    {
      name: "Best Seller",
      imgUrl:
        "https://static.wixstatic.com/media/c837a6_fba39b02bd5c4f43ae6d4e1db77204c5~mv2.png/v1/fill/w_124,h_124,q_90,enc_avif,quality_auto/c837a6_fba39b02bd5c4f43ae6d4e1db77204c5~mv2.png",
    },
    {
      name: "TV & Home Cinema",
      imgUrl:
        "https://static.wixstatic.com/media/c837a6_7a28e7356d6d4e9dbc6e0b1dfb2ac9b6~mv2.jpg/v1/fill/w_124,h_124,q_90,enc_avif,quality_auto/c837a6_7a28e7356d6d4e9dbc6e0b1dfb2ac9b6~mv2.jpg",
    },
  ];
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
      <div className="Boxs2">
        <div>
          <div className="BoxBtns">
            <div>
              <h3>Holiday Deals</h3>
              <h1>Up to 30% off</h1>
              <p>Selected Smartphone Brands </p>
              <button>Shop</button>
            </div>
          </div>
          <img
            src="https://static.wixstatic.com/media/c22c23_e140bfa8cd6f4cb2ac5ee6e204f64073~mv2.jpg/v1/fill/w_608,h_468,al_t,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c22c23_e140bfa8cd6f4cb2ac5ee6e204f64073~mv2.jpg"
            alt=""
          />
        </div>
        <div>
          <div className="BoxBtns">
            <div>
              <h3>Just In</h3>
              <h1>Take Your Sound Anywhere</h1>
              <p>Top Headphone Brands </p>
              <button>Shop</button>
            </div>
          </div>
          <img
            src="https://static.wixstatic.com/media/c837a6_d84a631864a442a496670bc2d787c6a0~mv2.jpg/v1/fill/w_608,h_468,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_d84a631864a442a496670bc2d787c6a0~mv2.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="SpecialFeatures">
        <div>
          <div>
            <MopedIcon style={{ fontSize: "40px" }} />
            <h3> Curb-side pickup</h3>
          </div>
          <div>
            <Package size={"60px"} />
            <h3>Free shipping on orders over $50</h3>
          </div>
          <div>
            <CurrencyRupeeIcon style={{ fontSize: "40px" }} />
            <h3>Low prices guaranteed</h3>
          </div>
          <div>
            <ScheduleIcon style={{ fontSize: "40px" }} />
            <h3>Available to you 24/7 </h3>
          </div>
        </div>
      </div>

      <div className="Category">
        <div id="shopByCategoryText">Shop by Category</div>
        <div>
          {categories.map(({ name, imgUrl }, idx) => {
            return (
              <div key={idx}>
                <div className="ImgDiv">
                  <img src={imgUrl} alt="" />
                </div>
                <div className="text">{name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
