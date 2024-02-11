import { useState } from "react";

const Faq = () => {
  const faqs1 = [
    {
      title: "What is ArtisanVault?",
      dec: "Our product is an innovative NFT marketplace, revolutionizing the way you buy and sell digital assets. From music to software, explore a diverse range of unique and valuable creations in our platform.",
    },
    {
      title: "WHAT IS NFT?      ",
      dec: "A handcrafted collection of 10,000 characters developed by artist Frenify. In its purest form, RENGA is art and the art of storytelling.",
    },
    {
      title: "What products can be sold here ?",
      dec: "A handcrafted collection of 10,000 characters developed by artist Frenify. In its purest form, RENGA is art and the art of storytelling.",
    },
    {
      title: "WHich cryptocurrency is used ?",
      dec: "A handcrafted collection of 10,000 characters developed by artist Frenify. In its purest form, RENGA is art and the art of storytelling.",
    },
  ];
  const faqs2 = [
    {
      title: "How can I sell my product?",
      dec: "A handcrafted collection of 10,000 characters developed by artist Frenify. In its purest form, RENGA is art and the art of storytelling.",
    },
    {
      title: "Can i remove my product from sale ?",
      dec: "A handcrafted collection of 10,000 characters developed by artist Frenify. In its purest form, RENGA is art and the art of storytelling.",
    },
    {
      title: "WHEN IS THE SALE DATE?",
      dec: "A handcrafted collection of 10,000 characters developed by artist Frenify. In its purest form, RENGA is art and the art of storytelling.",
    },
    {
      title: "Contact us",
      dec: "A handcrafted collection of 10,000 characters developed by artist Frenify. In its purest form, RENGA is art and the art of storytelling.",
    },
  ];
  const [active, setActive] = useState(`a0`);
  const faqMap = (arr, index) => {
    return arr.map((data, i) => (
      <div className="fn_cs_accordion" key={i}>
        <div className={`acc_item ${index + i === active ? "active" : ""}`}>
          <div
            className="acc_header"
            onClick={() =>
              setActive(`${index + i}` === active ? null : `${index + i}`)
            }
          >
            <h3 className="fn__maintitle" data-text={data.title}>
              {data.title}
            </h3>
            <span className="icon">
              <span />
            </span>
          </div>
          <div
            className="acc_content"
            style={{
              display: `${index + i === active ? "block" : "none"}`,
            }}
          >
            <p>{data.dec}</p>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <section id="faq">
      <div className="container">
        <div className="fn_cs_faq">
          <div className="faq_col">
            <h3 className="fn__maintitle" data-text="FAQ">
              FAQ
            </h3>
            <div className="fn_cs_divider">
              <div className="divider">
                <span />
                <span />
              </div>
            </div>
            <div className="desc">
              <p>
              Explore our FAQ section to find answers to common questions about our products and services. 
              We strive to provide clear and concise answers to make your experience with us seamless. 
              </p>
              <p>
              Your satisfaction is our priority, and we're here to ensure you have all the information you need. 
              Browse our FAQ to enhance your understanding of our offerings and make the most out of your experience with us.
              </p>
            </div>
          </div>
          <div className="faq_col">
            <div className="fn_cs_accordion">{faqMap(faqs1, "a")}</div>
          </div>
          <div className="faq_col">
            <div className="fn_cs_accordion">{faqMap(faqs2, "b")}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Faq;
