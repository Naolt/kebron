import Image from "next/image";
import React from "react";

async function getContactInfo() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching contact person:", error);
    return null;
  }
}

async function ContactPerson() {
  const contactPerson = await getContactInfo();

  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28 flex justify-between items-center gap-8 flex-wrap">
      {/* header */}
      <div className="flex flex-col gap-6 w-full max-w-[616px]">
        <h2>{`Welcome to Kebron International Church!`}</h2>
        <p>Dear Beloved,</p>
        <p>
          Welcome to Kebron International Church, a place where faith, love, and
          family come together. We are more than a church—we are a community
          walking in the power of God, growing in His Word, and standing in His
          grace. Whether you are visiting for the first time or seeking a
          spiritual home, we invite you to worship, grow, and serve with us. May
          you experience God’s presence, love, and transformation in your life.
          in your life. We look forward to welcoming you in person. You belong
          here! Blessings,
        </p>
        <p>
          [Pastor’s Name]
          <br />
          Kebron International Church
        </p>
      </div>
      {/* right */}
      <Image
        src={contactPerson?.contactPersonImage || ""}
        alt="Contact Us"
        width={616}
        height={640}
        className="w-full max-w-[616px] h-[640px] object-cover"
      />
    </section>
  );
}

export default ContactPerson;
