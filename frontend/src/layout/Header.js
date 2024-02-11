import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import { navigationToggle, walletToggle } from "../redux/actions/siteSettings";
import { stickyNav } from "../utilits";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Header = ({ walletToggle, navigationToggle }) => {
  const { connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    stickyNav();
  }, []);

  return (
    <header id="header">
      <div className="header">
        <div className="header_in">
          <div className="trigger_logo">
            
            <div className="logo">
              <Link href="/">
                <a>
                  <img src="/img/logo_new.png" alt="" />
                </a>
              </Link>
            </div>
          </div>
          <div className="nav" style={{ opacity: 1 }}>
            <ul>
              <li>
                <Link href="/">
                  <a className="creative_link">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/sell">
                  <a className="creative_link">Sell</a>
                </Link>
              </li>
              <li>
                <Link href="/collection">
                  <a className="creative_link">All Collections</a>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <a className="creative_link">Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/update_profile">
                  <a className="creative_link">Update Profile</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="wallet">
            {!isConnected ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  walletToggle(true);
                }}
                className="metaportal_fn_button wallet_opener"
              >
                <span>Connect To Wallet</span>
              </a>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  disconnect();
                }}
                className="metaportal_fn_button wallet_opener"
              >
                <span>Disconnect</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { walletToggle, navigationToggle })(
  Header
);
