import { Fragment } from "react";
import { connect } from "react-redux";
import { walletToggle } from "../redux/actions/siteSettings";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const SEPOLIA_CHAIN_ID = 11155111;

const WalletPopUp = ({ walletToggle, wallet }) => {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, status, variables } = useConnect();
  const { disconnect } = useDisconnect();
  console.log(connectors);

  if (isConnected) {
    walletToggle(false);
  }

  return (
    <Fragment>
      <div
        className={`metaportal_fn_wallet_closer ${wallet ? "active" : ""}`}
        onClick={() => walletToggle(false)}
      />
      <div className={`metaportal_fn_walletbox ${wallet ? "active" : ""}`}>
        <a href="#" className="fn__closer" onClick={() => walletToggle(false)}>
          <span />
        </a>
        <div className="walletbox">
          <div className="title_holder">
            <h3>Connect Wallet</h3>
            <p>
              Connect with one of our available wallet providers or create a new
              one.
            </p>
          </div>
          <div className="list_holder">
            <ul className="metaportal_fn_items">
              <li>
                <div
                  className="item"
                  onClick={() =>
                    connect({
                      chainId: SEPOLIA_CHAIN_ID,
                      connector: connectors[1],
                    })
                  }
                >
                  <a href="#" />
                  <span className="icon">
                    <img src="/img/wallet/metamask.png" alt="" />
                  </span>
                  <span className="text">Metamask</span>
                </div>
              </li>
              <li>
                <div className="item">
                  <a href="#" />
                  <span className="icon">
                    <img src="/img/wallet/coinbase.png" alt="" />
                  </span>
                  <span className="text">Coinbase</span>
                </div>
              </li>
              <li>
                <div className="item">
                  <a href="#" />
                  <span className="icon">
                    <img src="/img/wallet/walletconnect.png" alt="" />
                  </span>
                  <span className="text">WalletConnect</span>
                </div>
              </li>
              <li>
                <div className="item">
                  <a href="#" />
                  <span className="icon">
                    <img src="/img/wallet/venly.png" alt="" />
                  </span>
                  <span className="text">Venly</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  wallet: state.site.wallet,
});

export default connect(mapStateToProps, { walletToggle })(WalletPopUp);
