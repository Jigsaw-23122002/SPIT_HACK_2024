import Link from "next/link";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer">
          <div className="left_part">
            <p>
              Designed &amp; Developed by{" "}
              <a
                href=""
                target="_blank"
                rel="noreferrer"
              >
                Senate
              </a>
            </p>
          </div>
          <div className="right_part">
            <ul>
              <li>
                <Link href="/policy">
                  <a className="creative_link">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <a className="creative_link">Cookies</a>
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions">
                  <a className="creative_link">Terms &amp; Conditions</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
