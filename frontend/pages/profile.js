import Layout from "../../src/layout/Layout";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAccount, useReadContracts } from "wagmi";
import { stringify, parseEther } from "viem";
import data1 from "../public/static/nft1.json";
import data2 from "../public/static/nft2.json";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";

ChartJS.register(PieController, ArcElement, Tooltip, Legend, Title);

const Profile = () => {
  const { address } = useAccount();
  const [datas, setData] = useState(null);
  const { data, isIdle, status, isError, sendTransaction } =
    useSendTransaction();
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  useEffect(() => {
    console.log(address);
    if (address === "0xC7cc983FCD339B1020a48D6f473a5DE663461148") {
      setData(JSON.parse(localStorage.getItem("myNFTs")));
    } else {
      setData(JSON.parse(localStorage.getItem("othersNFTs")));
    }
  }, []);
  useEffect(() => {
    console.log(address);
    const fn_cs_slider = document.querySelectorAll(".fn_cs_slider");
    fn_cs_slider.forEach((element) => {
      let sliderTop = element.getElementsByClassName("slider_top")[0],
        sliderBottom = element.getElementsByClassName("slider_content"),
        activeIndex = 2,
        speed = 6000;

      let myInterval = setInterval(function () {
        activeIndex++;
        activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
      }, speed);
      const prev = document.querySelector(".slider_nav .prev"),
        next = document.querySelector(".slider_nav .next"),
        li = element.getElementsByTagName("li");
      prev.addEventListener("click", function (e) {
        e.preventDefault();
        clearInterval(myInterval);
        activeIndex--;
        activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        myInterval = setInterval(function () {
          activeIndex++;
          activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        }, speed);
        return false;
      });
      next.addEventListener("click", (e) => {
        e.preventDefault();
        clearInterval(myInterval);
        activeIndex++;
        activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        myInterval = setInterval(function () {
          activeIndex--;
          activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        }, speed);
        return false;
      });
      for (let i = 0; i < li.length; i++) {
        const liElement = li[i];
        const getClass = liElement.getAttribute("class");
        if (getClass === "next") {
          activeIndex++;
        } else if (getClass === "prev") {
          activeIndex--;
        } else {
          return false;
        }
        clearInterval(myInterval);
        activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        myInterval = setInterval(function () {
          activeIndex++;
          activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        }, speed);
        return false;
      }
    });
  }, []);

  const getSplitData = (type) => {
    return type.split(" ").join("-");
  };

  const sliderDo = (sliderTop, sliderBottom, activeIndex) => {
    var topLength = sliderTop.getElementsByTagName("li").length;
    if (activeIndex > topLength) {
      activeIndex -= topLength;
    }
    var indexPrev = activeIndex - 1;
    var indexPrev2 = activeIndex - 2;
    var indexNext = activeIndex + 1;
    var indexNext2 = activeIndex + 2;
    if (indexPrev > topLength) {
      indexPrev -= topLength;
    }
    if (indexPrev2 > topLength) {
      indexPrev2 -= topLength;
    }
    if (indexNext > topLength) {
      indexNext -= topLength;
    }
    if (indexNext2 > topLength) {
      indexNext2 -= topLength;
    }
    if (indexPrev < 1) {
      indexPrev += topLength;
    }
    if (indexPrev2 < 1) {
      indexPrev2 += topLength;
    }
    if (activeIndex < 1) {
      activeIndex += topLength;
    }
    if (indexNext < 1) {
      indexNext += topLength;
    }
    if (indexNext2 < 1) {
      indexNext2 += topLength;
    }
    let li = sliderTop.getElementsByTagName("li");
    for (let i = 0; i < datas.length; i++) {
      const element = li[i];
      element.classList.remove("prev", "prev2", "active", "next", "next2");
      // element.setAttribute(`data-index${indexNext}`);
    }
    sliderTop
      .querySelector('li[data-index="' + indexPrev2 + '"]')
      .classList.add("prev2");
    sliderTop
      .querySelector('li[data-index="' + indexPrev + '"]')
      .classList.add("prev");
    sliderTop
      .querySelector('li[data-index="' + activeIndex + '"]')
      .classList.add("active");
    sliderTop
      .querySelector('li[data-index="' + indexNext + '"]')
      .classList.add("next");
    sliderTop
      .querySelector('li[data-index="' + indexNext2 + '"]')
      .classList.add("next2");
    return activeIndex;
  };

  const putOnSale = (id) => {
    if (datas[id].onSale === 1) {
      return;
    } else {
      if (address === "0xC7cc983FCD339B1020a48D6f473a5DE663461148") {
        const t = datas;
        t[id].onSale = 1;
        localStorage.setItem("myNFTs", JSON.stringify(t));
        setData(JSON.parse(localStorage.getItem("myNFTs")));
        sendTransaction({
          to: "0x1D2D1CB4B42eB93473c3D960609d341745De142f",
          value: parseEther(datas[id].price.toString()), // 0.0001 ETH
        });
      } else {
        const t = datas;
        t[id].onSale = 1;
        localStorage.setItem("othersNFTs", JSON.stringify(t));
        setData(JSON.parse(localStorage.getItem("othersNFTs")));
        sendTransaction({
          to: "0x1D2D1CB4B42eB93473c3D960609d341745De142f",
          value: parseEther("0.0001"), // 0.0001 ETH
        });
      }
    }
  };

  return (
    <Layout pageTitle={"Profile"}>
      <section id="news">
        <div className="container">
          <h3
            className="fn__maintitle big"
            data-text="Profile"
            data-align="center"
            style={{ marginBottom: "60px" }}
          >
            Profile
          </h3>

          {/* Upper part */}

          <div
            className="blog__item"
            style={{
              padding: "50px",
              marginBottom: "60px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div className="counter" style={{ width: "30%" }}>
              <span
                className="cc"
                style={{
                  height: "200px",
                  width: "200px",
                  backgroundImage:
                    "url('https://amaranth-adjacent-boa-161.mypinata.cloud/ipfs/QmP4RGksjAhuD2CKQzLzabLKgwqhYqLJWiXJjTRBLpnFbY')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                }}
              ></span>
            </div>
            <div
              style={{ width: "30%", display: "flex", alignItems: "center" }}
            >
              <div className="title">
                <h3>Harsh</h3>
                <div className="meta">
                  <p>
                    Wallet address : {address && address.substring(0, 6)}....
                    {address && address.substring(address.length - 3)}
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{ width: "30%", display: "flex", alignItems: "center" }}
            >
              <div className="title">
                <h3>Earnings : 4.96 ETH</h3>
                <div className="meta">
                  <p>Profit/Loss : 27.5%</p>
                </div>
              </div>
            </div>
          </div>

          {/* News Shotcode */}
          <div className="fn_cs_news">
            <div className="news_part">
              <div className="left_items">
                <div className="blog__item">
                  <div className="counter">
                    <span className="cc">
                      <span>01</span>
                    </span>
                  </div>
                  {/* <div className="meta">
                                        <p>August 09, 2022 / MetaVerse / 4 Comments</p>
                                    </div> */}
                  <div className="title">
                    <h3>
                      <a>Representation of Top 5 assets</a>
                    </h3>
                  </div>
                  <div className="image" style={{ height: "400px" }}>
                    <Pie
                      data={{
                        labels: ["1", "2", "3", "4", "5"],
                        datasets: [
                          {
                            label: "Donations",
                            data: [100, 200, 400, 40, 600],
                            backgroundColor: [
                              "rgba(255, 99, 132, 0.2)",
                              "rgba(54, 162, 235, 0.2)",
                              "rgba(255, 206, 86, 0.2)",
                              "rgba(75, 192, 192, 0.2)",
                              "rgba(153, 102, 255, 0.2)",
                            ],
                            borderColor: [
                              "rgba(255, 99, 132, 1)",
                              "rgba(54, 162, 235, 1)",
                              "rgba(255, 206, 86, 1)",
                              "rgba(75, 192, 192, 1)",
                              "rgba(153, 102, 255, 1)",
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          title: {
                            display: true,
                            text: "These are the top 5 assets contributing to the major earnings.",
                            font: {
                              size: 23,
                            },
                          },
                        },
                        maintainAspectRatio: false,
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                              },
                            },
                          ],
                          xAxes: [
                            {
                              type: "category",
                              labels: ["1", "2", "3", "4", "5"],
                              ticks: {
                                beginAtZero: true,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  </div>
                  <div className="meta">
                    <p>
                      Click on the boxes for categorization of specific NFTs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="right_items">
                <div className="blog__item" style={{ padding: "20px" }}>
                  <div className="counter">
                    <span className="cc">
                      <span>02</span>
                    </span>
                  </div>
                  <div className="meta">
                    <p>Total Number of NFTs available</p>
                  </div>
                  <div className="title">
                    <h3>
                      <a>22</a>
                    </h3>
                  </div>
                </div>
                <div className="blog__item" style={{ padding: "20px" }}>
                  <div className="counter">
                    <span className="cc">
                      <span>03</span>
                    </span>
                  </div>
                  <div className="meta">
                    <p>Total Volume of Transactions</p>
                  </div>
                  <div className="title">
                    <h3>
                      <a>103</a>
                    </h3>
                  </div>
                </div>
                <div className="blog__item" style={{ padding: "20px" }}>
                  <div className="counter">
                    <span className="cc">
                      <span>04</span>
                    </span>
                  </div>
                  <div className="meta">
                    <p>Total Number of Likes</p>
                  </div>
                  <div className="title">
                    <h3>
                      <a>13</a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* !News Shotcode */}
        </div>
      </section>

      <section id="home" style={{ paddingTop: "0" }}>
        <div className="container">
          <h3
            className="fn__maintitle big"
            data-text="My NFTs"
            data-align="center"
          >
            My NFTs
          </h3>
          <br />
          <br />
          <div className="metaportal_fn_result_list">
            <div className="metaportal_fn_drops">
              <ul className="grid">
                {datas &&
                  datas.map((nft, i) => (
                    <li className={getSplitData(nft.genre)} key={i}>
                      <div className="nft__item">
                        <div
                          className="img_holder"
                          style={{
                            width: "350px",
                            height: "300px",
                            objectFit: "fill",
                          }}
                        >
                          <img src={nft.image} alt="" />
                        </div>
                        <div className="title_holder">
                          <h3 className="fn_title">
                            {/* <Link href={`/nft/${nft.id}`}>{nft.title}</Link> */}
                          </h3>
                          {nft.price} ETH
                        </div>
                        <div className="p-5 w-full flex justify-center items-center">
                          <button
                            className="metaportal_fn_button"
                            onClick={() => {
                              putOnSale(i, nft.onSale);
                            }}
                          >
                            {nft.onSale === 1 ? `On Sale` : `Put On Sale`}
                          </button>
                        </div>
                      </div>
                      <div></div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
