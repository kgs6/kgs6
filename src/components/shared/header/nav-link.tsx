"use client";

import Link from "next/link";

interface NavLinkProps {
  href: string;
  pathname: string;
  linkText: string;
}

const NavLink = ({href, pathname, linkText}: NavLinkProps) => {
  const isActive =
    pathname === href || pathname.startsWith(href + "/");
    
  return (
    <Link href={href} className={isActive ? "text-foreground" : "text-foreground/60"}>
      {linkText}
    </Link>
  );
};

export default NavLink;