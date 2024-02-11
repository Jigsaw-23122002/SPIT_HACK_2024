import { Swiper, SwiperSlide } from "swiper/react";
import SectionDivider from "../src/components/SectionDivider";
import Layout from "../src/layout/Layout";
import ParticlesBackground from "../src/ParticlesBackground";
import { Hero4Slider } from "../src/sliderProps";
import Faq from "../src/components/Faq";
import News from "../src/components/News";

import FunFacts from "../src/components/FunFacts";
import data1 from "../public/static/nft1.json";
import data2 from "../public/static/nft2.json";
import { useAccount } from "wagmi";
import { useEffect } from "react";

const Index5 = () => {
  const { address } = useAccount();

  useEffect(() => {
    console.log(address);
    if (localStorage.getItem("myNFTs")) {
    } else {
      localStorage.setItem("myNFTs", JSON.stringify(data1));
      console.log(localStorage.getItem("myNFTs"));

      localStorage.setItem("othersNFTs", JSON.stringify(data2));
      console.log(localStorage.getItem("othersNFTs"));
    }
  }, []);
  return (
    <Layout pageTitle={"Home"}>
      <section id="hero4">
        <div
          className="fn_cs_hero_slider ripple"
          data-ratio="1.33"
          id="ripple"
          data-bg-img="/img/bg4.jpg"
        >
          <div className="bg_overlay"></div>
          <div className="left_part">
            <h3 className="fn__maintitle big" data-text="Artisan Vault">
              Artisan
              <br />
              Vault
            </h3>
            <p>Empowering Creativity with Secure NFTs</p>
            <a
              href="#collection-home"
              className="metaportal_fn_button"
              rel="noreferrer"
            >
              <span>Buy</span>
            </a>
          </div>
          <div className="slider_part">
            <Swiper {...Hero4Slider} className="swiper-container">
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="https://miro.medium.com/v2/resize:fit:670/0*iXFSD9fZ-AD73K3P.jpg"
                        style={{}}
                      />
                      <img
                        src="https://miro.medium.com/v2/resize:fit:670/0*iXFSD9fZ-AD73K3P.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="https://www.wallpapertip.com/wmimgs/180-1809855_live-dj.jpg"
                        style={{}}
                      />
                      <img
                        src="https://miro.medium.com/v2/resize:fit:670/0*iXFSD9fZ-AD73K3P.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="https://w.forfun.com/fetch/88/8858d288d75f5ffe72fa6d5f384d9f99.jpeg"
                        style={{}}
                      />
                      <img
                        src="https://miro.medium.com/v2/resize:fit:670/0*iXFSD9fZ-AD73K3P.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <div className="img_holder">
                      <div
                        className="abs_img"
                        data-bg-img="https://coolwallpapers.me/picsup/3115227-book-shelves_book-stack_bookcase_books_college_data_document_education_encyclopedia_indoors_knowledge_library_literature_order_read_reader_reading_research_study_wood.jpg"
                        style={{}}
                      />
                      <img
                        src="https://miro.medium.com/v2/resize:fit:670/0*iXFSD9fZ-AD73K3P.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
          <ParticlesBackground />
        </div>
      </section>

      <section
        id="about2"
        style={{ paddingTop: "100px", paddingBottom: "50px" }}
      >
        <div className="container small">
          <div
            className="fn_cs_collection_info"
            style={{ paddingTop: 0, paddingBottom: "50px" }}
          >
            <h3 className="fn__gradient_title">106</h3>
            <h3
              className="fn__maintitle upper"
              data-text="Total Items in Collection"
            >
              Total Items in Collection
            </h3>
          </div>
        </div>

        <FunFacts />

        <div id="collection-home" className="container">
          {/* Steps Shortcode */}
          <div
            className="fn_cs_steps gap"
            data-cols={4}
            data-gap={60}
            style={{ paddingTop: "100px" }}
          >
            <p
              className="fn__maintitle upper"
              data-text="Explore Collection"
              style={{
                textAlign: "center",
                paddingBottom: "100px",
                fontSize: "40px",
                color: "white",
                fontWeight: "300",
              }}
            >
              Explore Collection
            </p>
            <ul>
              <li>
                <div className="item">
                  <div className="item_in">
                    <h3 className="fn__gradient_title">01</h3>
                    <p style={{ fontSize: "20px" }}>Art</p>

                    <a
                      href={"/collection?query_filter=art"}
                      className="metaportal_fn_button"
                      rel="noreferrer"
                      style={{ marginTop: "30px", marginLeft: "30px" }}
                    >
                      <span>Buy</span>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="item">
                  <div className="item_in">
                    <h3 className="fn__gradient_title">02</h3>
                    <p style={{ fontSize: "20px" }}>Literature</p>

                    <a
                      href={"/collection?query_filter=literature"}
                      className="metaportal_fn_button"
                      rel="noreferrer"
                      style={{ marginTop: "30px", marginLeft: "30px" }}
                    >
                      <span>Buy</span>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="item">
                  <div className="item_in">
                    <h3 className="fn__gradient_title">03</h3>
                    <p style={{ fontSize: "20px" }}>Music</p>

                    <a
                      href={"/collection?query_filter=music"}
                      className="metaportal_fn_button"
                      rel="noreferrer"
                      style={{ marginTop: "30px", marginLeft: "30px" }}
                    >
                      <span>Buy</span>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="item">
                  <div className="item_in">
                    <h3 className="fn__gradient_title">04</h3>
                    <p style={{ fontSize: "20px" }}>Software</p>

                    <a
                      href={"/collection?query_filter=software"}
                      className="metaportal_fn_button"
                      rel="noreferrer"
                      style={{ marginTop: "30px", marginLeft: "30px" }}
                    >
                      <span>Buy</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* !Steps Shortcode */}
        </div>
      </section>

      <SectionDivider />
      <Faq />
      {/* !Section FAQ */}
      {/* Section Divider */}
      
      <SectionDivider />
      {/* !Section Divider */}
      {/* Section News */}
      <br />
      <br />
    </Layout>
  );
};
export default Index5;
