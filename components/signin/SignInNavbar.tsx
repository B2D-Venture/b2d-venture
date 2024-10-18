import Link from "next/link";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

const SignInNavbar = () => {
  return (
    <section className="navbar">
      <nav className="flex flex-col gap-4">
        <div className="w-full h-[100px] bg-black shadow flex items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/logo/b2d-logo.png"
                  width={60}
                  height={60}
                  alt="b2d logo"
                  className="b2d-logo"
                />
                <div className="text-navbarTitle text-xl font-bold">
                  B2D Venture
                </div>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default SignInNavbar;
