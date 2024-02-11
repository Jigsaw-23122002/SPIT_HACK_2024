import React, { useEffect, useState } from "react";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { FileUploader } from "react-drag-drop-files";
import SectionDivider from "../src/components/SectionDivider";

import { useDispatch } from "react-redux";

import { Image, Transformation } from "cloudinary-react";



const Update = () => {

    const [img, setImg] = useState("https://g2.img-dpreview.com/D7A1F2C5173F4D2C9BC7FC1ABFA6BC32.jpg");
    const [name, setname] = useState("XYZ")
    const fileTypes = ["JPG", "PNG"]

    const handleChange = (uploadedfile) => {
        console.log(uploadedfile)
        setImg(uploadedfile);
    };


    const handleinput = (e) => {
        setname(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)

    };

    return (

        <Layout pageTitle={"Update Profile"}>
            <PageBanner pageName={"Update your Profile"} />

            {/* current profile */}
            <br />
            <br />

            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

                <div className="blog__item" style={{ padding: "50px", marginBottom: "60px", display: "flex", justifyContent: "space-around", width: "80%" }}>
                    <div className="counter" style={{ width: "30%" }}>
                        <span className="cc" style={{ height: "200px", width: "200px", backgroundImage: `url(${img})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", borderRadius: "50%" }}>

                        </span>
                    </div>
                    <div style={{ width: "30%", display: "flex", alignItems: "center" }}>
                        <div className="title">
                            <h3>
                                {name}
                            </h3>
                            <div className="meta">
                                <p>Wallet address</p>
                            </div>
                        </div>

                    </div>
                    <div style={{ width: "30%", display: "flex", alignItems: "center" }}>
                        <div className="title">
                            <h3>
                                Earnings : 123
                            </h3>
                            <div className="meta">
                                <p>Profit/Loss : X%</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <SectionDivider />

            {/* update details below */}

            <div>

                {/* <!-- Create --> */}
                <section className="relative py-24">

                    <div className="container">

                        <form onSubmit={handleSubmit}>
                            <div className="mx-auto max-w-[48.125rem]">
                                {/* <!-- File Upload --> */}
                                <div className="mb-6">
                                    <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                                        New avatar upload
                                        <span style={{ color: "red" }}>*</span>
                                    </label>

                                    <div className= "dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-600 bg-transparent  text-center">
                                        <div style={{position : "absolute"}}>
                                            <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                                                File type : JPG or PNG.
                                                <br /> Max size: 10 MB
                                            </p>

                                        </div>
                                        <FileUploader
                                                handleChange={handleChange}
                                                name="file"
                                                types={fileTypes}
                                                maxSize={10}
                                                minSize={0}
                                                classes="drop_area"
                                            />
                                    </div>
                                </div>
                                
                                {/* <!-- Name --> */}
                                <div className="mb-6">

                                    <label
                                        htmlFor="item-genre"
                                        className="font-display text-jacarta-700 mb-2 block dark:text-white"
                                    >
                                        Enter the update name<span style={{ color: "red" }}>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        id="item-name"
                                        className="p-20 dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg dark:text-white"
                                        placeholder="Enter the title of your display art"
                                        required
                                        name="title"
                                        value={name}
                                        onChange={handleinput}
                                    />
                                </div>

                                {/* <!-- Submit --> */}
                                <div className="p-8 w-full flex justify-center items-center">
                                    <button
                                        className="metaportal_fn_button"
                                        type="submit"
                                    >
                                        Save
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

export default Update;
