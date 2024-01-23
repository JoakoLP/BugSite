"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { GoBug } from "react-icons/go";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex w-full space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link rel="stylesheet" href="/">
        <GoBug size={20} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          return (
            <li key={link.href}>
              <Link
                key={link.href}
                className={classnames({
                  "text-zinc-900": currentPath === link.href,
                  "text-zinc-500": currentPath !== link.href,
                  "hover:text-zinc-800 transition-colors": true,
                })}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
