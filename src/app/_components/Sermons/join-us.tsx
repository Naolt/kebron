import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function JoinUs() {
  return (
    <div className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">Support Our Church</h1>
      <p className="mt-4 text-center max-w-2xl text-gray-600">
        {`  Help us continue spreading God's word through our sermons and live
        broadcasts. Your support makes a difference in our community.`}
      </p>
      <div className="flex gap-4 mt-8">
        <Link href="/donate">
          <Button>Support Now</Button>
        </Link>
      </div>
    </div>
  );
}
