import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div className="w-[1440px] h-[100px] bg-black shadow flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <div className="text-navbarTitle text-lg">B2D Venture</div>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/register-company">
            <div className="text-navbarTitle text-lg">Register as Company</div>
          </Link>
          <Link href="/investment">
            <div className="text-navbarTitle text-lg">Investment</div>
          </Link>
          <div className="w-[350px] h-[45px] pl-6 pr-[166.50px] pt-[7px] pb-[6.50px] bg-white rounded-[60px] border-2 border-black flex items-center justify-between">
            <span className="text-placeholder">Search</span>
          </div>
          <div className="w-[206px] h-[35px] bg-white rounded-[58px] flex items-center justify-center gap-[14.50px]">
            <div className="w-[21.75px] h-[21.75px] relative" />
            <div className="text-center text-black text-xs font-normal font-['Inter']">
              Sign in with Google
            </div>
            <div className="w-[29px] h-[29px] relative">
              <div className="w-[24.17px] h-[24.17px] left-[2.42px] top-[2.42px] absolute"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
