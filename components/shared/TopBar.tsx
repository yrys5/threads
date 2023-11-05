"use client";

import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { dark } from "@clerk/themes";

function TopBar() {
  const router = useRouter();
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        {/* <Image src="/assets/logo.svg" alt="logo" width={28} height={28} /> */}
        <Image src="/assets/logo-3.png" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1">Thrinks</p>
      </Link>
      <div className="flex items-center gap-1 ">
        <div className="block md:hidden">
          {/* <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                ></Image>
              </div>
            </SignOutButton>
          </SignedIn> */}
        </div>
        <SignedOut>
          <Link
            href="/sign-in"
            key="/sign-in"
            className={`flex justify-start gap-2 rounded-lg p-2 bg-primary-500`}
            shallow={true}
          >
            <Image src="/assets/login.png" alt="login" width={24} height={24} />
            <p className="text-light-1 max-lg:hidden">Sign in</p>
          </Link>
        </SignedOut>
        <UserButton
          appearance={{
            baseTheme: dark,
            elements: { organizationSwitcherTrigger: "py-2 px-4" },
          }}
        />
      </div>
    </nav>
  );
}

export default TopBar;
