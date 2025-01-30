import Image from "next/image";
import React from "react";

function ContactPerson() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28 flex justify-between items-center gap-8 flex-wrap">
      {/* header */}
      <div className="flex flex-col gap-6 w-full max-w-[616px]">
        <h2>
          {`Get in Touch with Our Welcoming Community: We're Here to Listen,
          Support, and Connect.`}
        </h2>
        <p>
          {` We warmly invite you to reach out and share your thoughts, questions,
          or prayer requests with our welcoming community. Your connection is
          deeply important to us, and we believe in fostering meaningful
          relationships through open communication. Whether you're seeking
          spiritual guidance, have questions about our services, or simply want
          to connect with like-minded individuals, we're here to listen and
          respond with care and understanding. Our dedicated team is committed
          to creating a supportive environment where everyone feels heard and
          valued. We look forward to hearing from you and beginning this journey
          of connection together!`}
        </p>
      </div>
      {/* right */}
      <Image
        src="https://picsum.photos/1920/1080?random=1"
        alt="Contact Us"
        width={616}
        height={640}
        className="w-full max-w-[616px] h-[640px] object-cover"
      />
    </section>
  );
}

export default ContactPerson;
