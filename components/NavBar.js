import Link from "next/Link";
import Image from "next/Image";
import logo from "../public/logo.svg";

const NavBar = ({ account }) => {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <Link href="/">
          <Image src={logo} alt={"Disney Logo"} width={80} height={80} />
        </Link>
      </div>

      <div className="account-info">
        <p>Welcome {account.username}</p>
        <img className="avatar" src={account.avatar.url} />
      </div>
    </div>
  );
};

export default NavBar;
