import Link from "next/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { getNfts } from "../src/redux/actions/nfts";
import Searchbox from "../src/layout/Searchbox";
import SearchButton from "../src/layout/SearchButton";

import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const Collection = ({ getNfts, nfts }) => {
  const { address } = useAccount();
  useEffect(() => {
    getNfts();
  }, []);

  const router = useRouter();
  const query_filter = router.query.query_filter;

  const [nfts_list, setNfts_list] = useState(nfts);

  const [minPrice, setMinprice] = useState(0);
  const [maxPrice, setMaxprice] = useState(0);

  const handleMin = (e) => {
    setMinprice(parseInt(e.target.value));
    if (query_filter) {
      setNfts_list(
        nfts.filter((nft) => {
          return (
            nft.price * 1000 <= maxPrice &&
            nft.price * 1000 >= minPrice &&
            nft.genre == query_filter
          );
        })
      );
    } else {
      setNfts_list(
        nfts.filter((nft) => {
          return nft.price * 1000 <= maxPrice && nft.price * 1000 >= minPrice;
        })
      );
    }
  };

  const handleMax = (e) => {
    setMaxprice(parseInt(e.target.value));

    if (query_filter) {
      setNfts_list(
        nfts.filter((nft) => {
          return (
            nft.price * 1000 <= maxPrice &&
            nft.price * 1000 >= minPrice &&
            nft.genre == query_filter
          );
        })
      );
    } else {
      setNfts_list(
        nfts.filter((nft) => {
          return nft.price * 1000 <= maxPrice && nft.price * 1000 >= minPrice;
        })
      );
    }
  };

  const [search, setSearch] = useState("");
  const handleSearch = (e) => setSearch(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (search !== "") {
      const filteredNfts = nfts.filter((nft) =>
        nft.title.toLowerCase().includes(search.toLowerCase())
      );
      setNfts_list(filteredNfts);
    } else {
      setNfts_list(nfts);
    }
  };

  const getSplitData = (type) => {
    return type.split(" ").join("-");
  };

  useEffect(() => {
    if (address === "0xC7cc983FCD339B1020a48D6f473a5DE663461148") {
      setNfts_list(JSON.parse(localStorage.getItem("othersNFTs")));
    } else {
      setNfts_list(JSON.parse(localStorage.getItem("myNFTs")));
    }
  }, []);

  return (
    <Layout pageTitle={"Collection"}>
      <PageBanner pageName={"Collection"} />

      <div className="metaportal_fn_collectionpage">
        <div className="mb-3">
          <div className="px-96  relative mb-4 flex flex-wrap">
            <input
              type="search"
              className="p-30 relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-xl border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none focus:ring-accent dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
              value={search}
              onChange={handleSearch}
            />

            <button
              className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={handleSearchSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="container">
          <div className="p-10" style={{ paddingLeft: "280px" }}>
            <label
              for="min-price"
              class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            >
              Min range
            </label>
            <br />
            <input
              type="range"
              class="transparent h-[4px] w-7/12 cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
              id="min-price"
              onChange={handleMin}
              value={minPrice}
            />
          </div>

          <div className="p-10" style={{ paddingLeft: "280px" }}>
            <label
              for="max-price"
              class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            >
              Max range
            </label>
            <br />
            <input
              type="range"
              class="transparent h-[4px] w-7/12 cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
              id="max-price"
              onChange={handleMax}
              value={maxPrice}
            />
          </div>

          <br />
          <br />

          <div className="metaportal_fn_collection">
            {/* Filters */}

            {/* !Filters */}
            <div className="metaportal_fn_clist">
              {/* Result Box */}

              {/* !Result Box */}
              {/* Result List */}
              <div className="metaportal_fn_result_list">
                <div className="metaportal_fn_drops">
                  <ul className="grid">
                    {nfts_list &&
                      nfts_list.map((nft, i) => {
                        return (
                          nft.onSale === 1 && (
                            <li key={i}>
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
                                  <Link href={`/nft/${nft.id}`}>
                                    <a className="full_link" />
                                  </Link>
                                </div>
                                <div className="title_holder">
                                  <h3 className="fn_title">
                                    <div>{nft.title}</div>
                                  </h3>
                                  {nft.price} ETH
                                </div>
                                {/* <div className="w-full flex flex-row items-center justify-center">
                                  <button
                                    className="metaportal_fn_button m-5"
                                    onClick={() => {
                                      buyNFTFunction(i);
                                    }}
                                  >
                                    Buy
                                  </button>
                                </div> */}
                              </div>
                            </li>
                          )
                        );
                      })}
                  </ul>
                </div>
              </div>
              {/* !Result List */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  nfts: state.nfts.data,
});

export default connect(mapStateToProps, { getNfts })(Collection);
