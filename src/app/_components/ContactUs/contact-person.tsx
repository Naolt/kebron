"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FadeInView } from "@/components/animations/motion-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Contact } from "@/models/contact";
import { Skeleton } from "@/components/ui/skeleton";

async function getContact() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
      {
        next: {
          tags: ["contact"],
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch contact");
    return response.json();
  } catch (error) {
    console.error("Error fetching contact:", error);
    return null;
  }
}

function ContactPerson() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setIsLoading(true);
        const contact = await getContact();
        setContact(contact);
      } catch (error) {
        console.error("Error fetching contact:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContact();
  }, []);

  return (
    <FadeInView className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
        {/* Content section */}
        <div className="w-full lg:w-1/2 max-w-[616px]">
          <h2>{`Welcome to Kebron International Church!`}</h2>
          <div className="flex flex-col gap-6 mt-8">
            <p>Dear Beloved,</p>
            <p>
              {` Welcome to Kebron International Church, a place where faith, love,
              and family come together. We are more than a church—we are a
              community walking in the power of God, growing in His Word, and
              standing in His grace. Whether you are visiting for the first time
              or seeking a spiritual home, we invite you to worship, grow, and
              serve with us. May you experience God's presence, love, and
              transformation in your life. in your life. We look forward to
              welcoming you in person. You belong here! Blessings,`}
            </p>
            {isLoading ? (
              <Skeleton className="w-24 h-4" />
            ) : (
              <p>
                {contact?.contactPersonName}
                <br />
                Kebron International Church
              </p>
            )}
            <Button variant="outline" className="w-fit">
              <Link href="/our-pastor">Meet Our Pastor</Link>
            </Button>
          </div>
        </div>

        {/* Image section */}
        <div className="w-full lg:w-1/2 max-w-[616px]">
          {isLoading ? (
            <Skeleton className="w-full h-[400px] lg:h-[640px]" />
          ) : (
            <Image
              src={contact?.contactPersonImage || ""}
              alt="Contact Us"
              width={616}
              height={640}
              className="w-full h-[400px] lg:h-[640px] object-cover"
            />
          )}
        </div>
      </div>
    </FadeInView>
  );
}

export default ContactPerson;
