import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import { useEffect, useState } from "react";

const NavBar = ({ account }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        setScroll(true);
      } else setScroll(false);
    });
  }, []);

  return (
    <div className={`navbar ${scroll && "nav-black"}`}>
      <div className="logo-wrapper">
        <Link href="/">
          <a>
            <Image src={logo} alt={"Disney Logo"} width={80} height={80} />
          </a>
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
