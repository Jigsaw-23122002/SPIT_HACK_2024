import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../../src/layout/Layout";
import { stringify, parseEther } from "viem";
import { getNfts, getSingleNft } from "../../../src/redux/actions/nfts";
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";

const Nft = ({ getSingleNft, nft, getNfts, nfts }) => {
  const { address } = useAccount();
  const router = useRouter();
  const { id } = router.query;
  const [similarItem, setSimilarItem] = useState([]);
  const { data, isIdle, status, isError, sendTransaction } =
    useSendTransaction();
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  useEffect(() => {
    getSingleNft(id);
    getNfts();
  }, [id]);
  useEffect(() => {
    if (nfts && nft) {
      setSimilarItem(
        nfts.filter(
          (nft_) =>
            nft_.type === nft.type ||
            nft.special === nft_.special ||
            nft.clothing == nft_.clothing
        )
      );
    }
    console.log(nft);
  }, [nfts]);

  const [quantity, setQuantity] = useState(nft ? nft.quantity : 0);

  const updateQuantity = (type) => {
    if (type == "+") {
      setQuantity((nft.quantity = nft.quantity + 1));
    } else {
      setQuantity((nft.quantity = nft.quantity == 1 ? 1 : nft.quantity - 1));
    }
  };

  const buyNFTFunction = () => {
    if (address === "0xC7cc983FCD339B1020a48D6f473a5DE663461148") {
      let othersNFTs = JSON.parse(localStorage.getItem("othersNFTs"));
      let myNFTs = JSON.parse(localStorage.getItem("myNFTs"));

      for (let i = 0; i < othersNFTs.length; i++) {
        if (othersNFTs[i].id === nft.id) {
          othersNFTs[i].onSale = 0;
          myNFTs.push(othersNFTs[i]);
          othersNFTs[i] = othersNFTs[othersNFTs.length - 1];
          othersNFTs.pop();
          localStorage.setItem("myNFTs", JSON.stringify(myNFTs));
          localStorage.setItem("othersNFTs", JSON.stringify(othersNFTs));
          sendTransaction({
            to: "0x1D2D1CB4B42eB93473c3D960609d341745De142f",
            value: parseEther(nft.price.toString()), // 0.0001 ETH
          });
          break;
        }
      }
    }
  };

  return (
    <Layout pageTitle={"Minting"}>
      <div className="metaportal_fn_mintpage">
        <div className="container small">
          {/* Mint Top */}
          <div className="metaportal_fn_mint_top">
            <div className="mint_left">
              <div className="img">
                <div
                  className="img_in"
                  style={{ backgroundImage: `url(${nft && nft.image})` }}
                >
                  <img src="/img/1x1.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="mint_right">
              <div className="metaportal_fn_share">
                <h5 className="label">Share:</h5>
                <ul>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/twitter-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/facebook-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/instagram-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/pinterest-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/behance-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="metaportal_fn_breadcrumbs">
                <p>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                  <span className="separator">/</span>
                  <Link href="/collection">
                    <a>Collection</a>
                  </Link>
                  <span className="separator">/</span>
                  <span className="current">{nft && nft.title}</span>
                </p>
              </div>
              <h3
                className="fn__maintitle"
                data-text={nft && nft.title}
                data-align="left"
              >
                {nft && nft.title}
              </h3>
              <h3
                className="fn__maintitle"
                data-text={nft && nft.creator}
                data-align="left"
              >
                {nft && nft.creator}
              </h3>
              <div className="desc">
                <p>{nft && nft.description}</p>
              </div>
            </div>
          </div>
          {/* !Mint Top */}
          {/* Mint Box */}

          {/* !Mint Box */}
          {/* NFT Categories */}
          <div className="metaportal_fn_nft_cats">
            <ul>
              <li>
                <div className="item">
                  <h4 className="parent_category">Type</h4>
                  <h3 className="child_category" title="Black Yukata">
                    {nft && nft.genre}
                  </h3>
                </div>
              </li>
              <li>
                <div className="item">
                  <h4 className="parent_category">Price</h4>
                  <h3 className="child_category" title="Daydreaming">
                    {nft && nft.price} ETH
                  </h3>
                </div>
              </li>
              <li>
                <div>
                  <button
                    className="metaportal_fn_button"
                    onClick={() => {
                      buyNFTFunction();
                    }}
                  >
                    Buy
                  </button>
                </div>
              </li>
            </ul>
          </div>
          {/* !NFT Categories */}
          {/* Similar Items */}
          <div className="metaportal_fn_similar">
            <h3 className="fn__maintitle" data-text="Similar Items">
              Similar Items
            </h3>
            <div className="fn_cs_divider">
              <div className="divider">
                <span />
                <span />
              </div>
            </div>
            <div className="metaportal_fn_drops">
              <ul className="grid">
                {nfts &&
                  similarItem.map(
                    (nft, i) =>
                      nft.id < 8 && (
                        <li key={nft.id}>
                          <div className="nft__item">
                            <div
                              className="img_holder"
                              style={{
                                width: "330px",
                                height: "300px",
                                objectFit: "fill",
                              }}
                            >
                              <div className="img_holder">
                                <img src={nft.image} alt="" />
                                <Link href={`/nft/${nft.id}`}>
                                  <a className="full_link"></a>
                                </Link>
                              </div>
                            </div>
                            <div className="title_holder">
                              <h3 className="fn_title">
                                <a href="#">{nft.title}</a>
                              </h3>
                            </div>
                          </div>
                        </li>
                      )
                  )}
              </ul>
            </div>
          </div>
          {/* !Similar Items */}

          <div className="container small">
            <div className="metaportal_fn_comments">
              <div className="comment-title">
                <h3 className="fn_title">Comments</h3>
              </div>
              <div className="comment-list">
                <ul className="list">
                  <li className="comment">
                    <div className="comment-body">
                      {/* <div className="comment-avatar">
                      <img src="/img/blog/comment-author1.jpg" alt="" />
                    </div> */}
                      <div className="comment-text-wrap">
                        <div className="comment-data">
                          <h3 className="author">Alex Brandon</h3>
                          {/* <p className="date">May 9, 2022 at 9:03 pm</p> */}
                        </div>
                        <div className="comment-text">
                          <div className="desc">
                            <p>
                              Nam et malesuada ante, in convallis libero. Aenean
                              sollicitudin egestas ante, eget porttitor leo
                              fringilla sit amet. Nam cursus neque ligula, in
                              egestas elit porttitor vel. Vestibulum ultricies
                              tempus orci a auctor.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="comment">
                    <div className="comment-body">
                      {/* <div className="comment-avatar">
                      <img src="/img/blog/comment-author2.jpg" alt="" />
                    </div> */}
                      <div className="comment-text-wrap">
                        <div className="comment-data">
                          <h3 className="author">Meera</h3>
                          {/* <p className="date">May 9, 2022 at 9:03 pm</p> */}
                        </div>
                        <div className="comment-text">
                          <div className="desc">
                            <p>
                              Proin ac leo non est imperdiet commodo. Donec
                              dictum augue ut odio feugiat vulputate.
                              Pellentesque ultricies augue in posuere ornare.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="comment">
                    <div className="comment-body">
                      {/* <div className="comment-avatar">
                      <img src="/img/blog/comment-author3.jpg" alt="" />
                    </div> */}
                      <div className="comment-text-wrap">
                        <div className="comment-data">
                          <h3 className="author">Rachel Perry</h3>
                          {/* <p className="date">May 9, 2022 at 9:03 pm</p> */}
                        </div>
                        <div className="comment-text">
                          <div className="desc">
                            <p>
                              Cras sed velit vitae velit tincidunt venenatis nec
                              in felis. Proin blandit elementum risus, sed
                              mattis dui rhoncus vel. Sed maximus mauris
                              fringilla purus auctor, eget convallis nulla
                              facilisis.
                            </p>
                            <p>
                              Morbi et lacinia ligula, id pharetra lorem.
                              Phasellus posuere nibh et sem dapibus, ut eleifend
                              ipsum eleifend. Pellentesque vel nibh aliquam leo
                              efficitur bibendum vel sed mi. Ut pulvinar rutrum
                              ante, at ultrices leo tincidunt eget.
                            </p>
                            <p>
                              Suspendisse eget dui ac turpis consectetur
                              sollicitudin. Lorem ipsum dolor sit amet,
                              consectetur adipiscing elit.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="comment-respond">
                <div className="respond-title">
                  <h3 className="fn_title">Leave a reply</h3>
                </div>
                <div className="respond-log">
                  <p>
                    Logged in as admin. <a href="#">Log out?</a>
                  </p>
                </div>
                <form className="comment-form">
                  <ul className="input-items">
                    <li className="input-item">
                      <div className="input_item">
                        <textarea
                          name="comment"
                          placeholder="Comment"
                          defaultValue={""}
                        />
                      </div>
                    </li>
                    <li className="input-item half-item">
                      <div className="input_item">
                        <input type="text" name="name" placeholder="Name" />
                      </div>
                    </li>
                    <li className="input-item half-item">
                      <div className="input_item">
                        <input type="text" name="email" placeholder="Email" />
                      </div>
                    </li>
                  </ul>
                  <div className="clearfix" />
                  <a href="#" className="metaportal_fn_button full">
                    <span>Post Comment</span>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  nft: state.nfts.nft,
  nfts: state.nfts.data,
});

export default connect(mapStateToProps, { getSingleNft, getNfts })(Nft);
