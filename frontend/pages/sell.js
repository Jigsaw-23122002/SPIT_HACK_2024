import { useEffect, useState } from "react";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { FileUploader } from "react-drag-drop-files";
import { useAccount } from "wagmi";
import {
  writeContract,
  readContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import axios from "axios";

import { wagmiContractConfig } from "../src/contract/artContractConfig";
import { config } from "../src/config";
import { data } from "isotope-layout";

const Sell = () => {
  //   const fileTypes = ["JPG", "PNG"];
  const [nft, setNft] = useState({
    title: "",
    price: "",
    genre: "",
    desc: "",
  });
  const [img, setImg] = useState([]);
  const [doc, setDoc] = useState([]);

  const { address } = useAccount();

  const handleChange = (uploadedfile) => {
    setImg(uploadedfile);
    console.log(uploadedfile);
  };

  const handleChange2 = (uploadedfile) => {
    setDoc(uploadedfile);
  };

  const pinFileToIPFS = async (selectedFile) => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();

    const file = new Blob([selectedFile], { type: selectedFile.type });
    formData.append("file", file, "file.png");

    const pinataMetadata = JSON.stringify({
      name: selectedFile.name,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`, // Replace with your JWT
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleinput = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);

    // const inputValue = type === "checkbox" ? checked : value;

    setNft((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(nft);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resImgUpload = await pinFileToIPFS(img);
    const imgCid = resImgUpload.IpfsHash;

    const resDocUpload = await pinFileToIPFS(doc);
    const docCid = resDocUpload.IpfsHash;

    const res = await writeContract(config, {
      ...wagmiContractConfig,
      functionName: "mint",
      args: ["Art NFT Mint", BigInt(nft.price * 10 ** 18)],
    });

    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash: res,
    });

    const result = await readContract(config, {
      ...wagmiContractConfig,
      functionName: "getLastTokenId",
    });

    console.log(result);

    insert_nft(docCid, imgCid, address, result);
  };

  const insert_nft = async (dataCid, imageCid, ownerAddress, tokenId) => {
    const query = JSON.stringify({
      query: `mutation MyMutation {
      insert_Nft(objects: {data: "${dataCid}", image: "${imageCid}", owner_address: "${ownerAddress}", token_id: ${tokenId}, description: "${nft.desc}", title: "${nft.title}", genre: "${nft.genre}"}) {
        returning {
          token_id
        }
      }
    }
    `,
    });

    const response = await fetch(
      "https://inspired-monster-62.hasura.app/v1/graphql",
      {
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
        method: "POST",
        body: query,
      }
    );

    const responseJson = await response.json();
    console.log(responseJson);
  };

  return (
    <Layout pageTitle={"Sell"}>
      <PageBanner pageName={"Mint your NFT"} />

      <div>
        {/* <!-- Create --> */}
        <section className="relative py-24">
          {/* <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture> */}
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="mx-auto max-w-[48.125rem]">
                {/* <!-- File Upload --> */}
                <div className="mb-6">
                  <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                    Image
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  {/* {file.length != 0 ? (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    successfully uploaded {file.length} files.
                  </p>
                ) : (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    Drag or choose your file to upload
                  </p>
                )} */}

                  <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-600 bg-transparent  text-center">
                    <div style={{ position: "absolute" }}>
                      <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                        {/* File type : JPG or PNG. */}
                        <br /> Max size: 10 MB
                      </p>
                    </div>
                    <FileUploader
                      handleChange={handleChange}
                      name="file"
                      //  types={fileTypes}
                      classes="drop_area"
                      maxSize={10}
                      minSize={0}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="item-genre"
                    className="font-display text-jacarta-700 mb-2 block dark:text-white"
                  >
                    Genre<span style={{ color: "red" }}>*</span>
                  </label>

                  <select
                    id="item-genre"
                    name="genre"
                    onChange={handleinput}
                    data-te-select-init
                    style={{backgroundColor : "transparent" , padding : "7px" , border: "2px solid #4f5a6e80"}}
                  >
                    <option value="Art" >Art</option>
                    <option value="Music">Music</option>
                    <option value="Literature">Literature</option>
                    <option value="Software">Software</option>
                  </select>
                </div>

                {/* <!-- Name --> */}
                <div className="mb-6">
                  <input
                    type="text"
                    id="item-name"
                    className="p-20 dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg dark:text-white"
                    placeholder="Enter the title of your asset"
                    required
                    name="title"
                    value={nft.title}
                    onChange={handleinput}
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    id="item-price"
                    className="p-20 dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg dark:text-white"
                    placeholder="Enter the expected base price of your asset"
                    required
                    name="price"
                    value={nft.price}
                    onChange={handleinput}
                  />
                </div>

                {/* <!-- Description --> */}
                <div className="mb-6">
                  <textarea
                    id="item-description"
                    className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3  dark:text-white"
                    rows="4"
                    name="desc"
                    value={nft.desc}
                    onChange={handleinput}
                    placeholder="Additional Information about your asset"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                    Asset
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  {/* {file.length != 0 ? (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    successfully uploaded extract.
                  </p>
                ) : (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    Drag or choose your file to upload
                  </p>
                )} */}

                  <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-600 bg-transparent  text-center">
                    <div style={{ position: "absolute" }}>
                      <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                        File type : JPG or PNG.
                        <br /> Max size: 10 MB
                      </p>
                    </div>
                    <FileUploader
                      handleChange={handleChange2}
                      name="file"
                      //   types={fileTypes}
                      classes="drop_area"
                      maxSize={10}
                      minSize={0}
                    />
                  </div>
                </div>

                {/* <!-- Submit --> */}
                <div className="p-8 w-full flex justify-center items-center">
                  <button className="metaportal_fn_button" type="submit">
                    Mint
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Sell;
