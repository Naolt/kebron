"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <Button
      className="fixed bottom-8 right-8 rounded-full p-3 shadow-lg transition-all duration-300 hover:transform hover:scale-110"
      onClick={scrollToTop}
      size="icon"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
