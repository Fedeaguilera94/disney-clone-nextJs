import Link from "next/Link";
import Image from "next/Image";
import logo from "../public/disneylogo.webp";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link href="/">
        <Image src={logo} alt={"Disney Logo"} width={220} height={80} />
      </Link>
    </div>
  );
};

export default NavBar;
