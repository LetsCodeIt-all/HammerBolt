const Footer = () => {
  let footers = [
    {
      title: "Store Location",
      content: [
        "500 Terry Francine Street",
        "San Francisco, CA 94158",
        "info@mysite.com",
        "123-456-7890",
      ],
    },
    {
      title: "Shop",
      content: [
        "Shop All",
        "Computers",
        "Tablets",
        "Drones & Cameras",
        "Audio",
        "Mobiles",
        "T.V & Home Cinema",
        "Wearable Tech",
        "Sale",
      ],
    },
    {
      title: "Customer Support",
      content: ["Contact Us", "Help Center", "About Us", "Careers"],
    },
    {
      title: "Policy",
      content: [
        "Shipping & Returns ",
        "Terms & Conditions",
        "Payment Methods ",
        "FAQ",
      ],
    },
  ];
  let paymentOptions = [
    "https://static.wixstatic.com/media/84770f_27001c40036842889a78a72766ad4700~mv2.png/v1/fill/w_55,h_33,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Visa.png",
    "https://static.wixstatic.com/media/c837a6_e8798fcfdaf144478a5c7da1ba28ff2c~mv2.png/v1/fill/w_55,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/brand-mastercard%403x.png",
    "https://static.wixstatic.com/media/c837a6_2bd3e20d1e214eccb5e106fc6d1f535d~mv2.png/v1/fill/w_55,h_29,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/brand-amex%403x.png",
    "https://static.wixstatic.com/media/c837a6_52115f99af28419d95a951f226e32e2b~mv2.png/v1/fill/w_55,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/brand-chinaunionpay%403x.png",
    "https://static.wixstatic.com/media/c837a6_9378fbd3ef8c470bb89aee12ecbd2209~mv2.png/v1/fill/w_55,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/brand-jcb%403x.png",
    "https://static.wixstatic.com/media/84770f_70555dcb450a415d80322cb8d7e82a33~mv2.png/v1/fill/w_52,h_38,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Diners.png",
    "https://static.wixstatic.com/media/84770f_14f105815c3f47bf9001990706915501~mv2.png/v1/fill/w_55,h_35,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Discover.png",
    "https://static.wixstatic.com/media/84770f_8445424a46ca49f39359bf19d4a3e537~mv2.png/v1/fill/w_55,h_38,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/PayPal.png",
  ];

  return (
    <>
      <footer>
        <div
          className="Support"
          style={{
            display: "flex",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          {footers.map(({ title, content }, idx) => {
            return (
              <div key={idx} className="SupportBox">
                <div className="supportTitle">
                  <h1>{title}</h1>
                </div>
                <div className="supportContent">
                  {content.map((e, idx) => (
                    <p key={idx}>{e}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="line">
          <hr />
        </div>
        <div className="payments">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            We accept the following paying methods
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: "70%",
            }}
          >
            {paymentOptions.map((e, idx) => (
              <img src={e} alt="" key={idx} />
            ))}
          </div>
        </div>
        <div className="CopyRight">
          <p> © 2035 by AmpUp. Powered and secured by Krishna</p>
        </div>
      </footer>
      ;
    </>
  );
};

export default Footer;
