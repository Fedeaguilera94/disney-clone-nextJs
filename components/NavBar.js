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
      <ul className="menu">
        <li>
          <a
            target="_blank"
            className="menu-ref"
            href="mailto:aguilerafederico94@gmail.com"
          >
            Mail
          </a>
        </li>

        <li>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/federicoaguilera/"
          >
            Linkedin
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Fedeaguilera94">
            GitHub
          </a>
        </li>
      </ul>
      <div className="account-info">
        <p>Welcome {account.username}</p>
        <img className="avatar" src={account.avatar.url} />
      </div>
    </div>
  );
};

export default NavBar;
