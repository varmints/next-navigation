"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import "./menu.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/", label: "Strona główna" },
  { path: "/work", label: "Prace" },
  { path: "/about", label: "O nas" },
  { path: "/contact", label: "Kontakt" },
  { path: "/lab", label: "Labolatorium" },
];

const Menu = () => {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const tl = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 120 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.3,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: {
            each: 0.1,
            onStart: () => {
              gsap.to(".menu-link-active", {
                backgroundSize: "100% 30px",
                duration: 0.4,
                ease: "power1.out",
                delay: 0.6,
              })
            },
          },
          ease: "power4.out",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={container}>
      {/* menu-bar */}
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href="/">Okej Studio</Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p>Menu</p>
        </div>
      </div>

      {/* menu-overlay */}
      <div className="menu-overlay">
        {/* menu-overlay-bar */}
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link href="/">Okej Studio</Link>
          </div>
          <div className="menu-close">
            <p onClick={toggleMenu}>Zamknij</p>
          </div>
        </div>

        {/* menu overlay items */}
        <div className="menu-close-icon" onClick={toggleMenu}>
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => {
              const isActive = pathname === link.path;
              return (
                <div key={index} className="menu-link-item">
                  <div className="menu-link-item-holder" onClick={toggleMenu}>
                    <Link className={isActive ? 'menu-link-active menu-link' : 'menu-link'} href={link.path}>
                      {link.label}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#">X &#8599;</a>
              <a href="#">Instagram &#8599;</a>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">Behance &#8599;</a>
              <a href="#">Dribbble &#8599;</a>
            </div>
            <div className="menu-info-col">
              <p>biuro@okej.studio</p>
              <p>+48 508 313 845</p>
            </div>
          </div>
        </div>
        <div className="menu-preview">
          <p>Zobacz więcej</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
