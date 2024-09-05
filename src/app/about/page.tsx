import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import React from "react";

const About = () => {
  return (
    <>
      <Header />
      <div className="pt-[25%] lg:pt-[10%] min-h-screen bg-[#ECD2FC66] p-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-[#501078] mb-6 text-center">
            About Us
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to the Creative Showcase Information System, where
            creativity meets technology. Our platform is dedicated to providing
            a vibrant and dynamic space for artists and creators to exhibit
            their work, engage with audiences, and gain the recognition they
            deserve.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our mission is to revolutionize the way creative content is shared
            and discovered. By integrating advanced technologies with a
            user-friendly interface, we offer a seamless experience for
            showcasing your unique talents and connecting with like-minded
            individuals.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            At the heart of our system is a commitment to innovation and
            excellence. We continuously refine our platform to ensure it meets
            the evolving needs of our users, fostering a community where
            creativity thrives and ideas flourish.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Join us on this exciting journey as we push the boundaries of
            traditional information systems and set new standards in creative
            showcase platforms. Together, we can transform the way art and
            creativity are experienced and appreciated.
          </p>
          <p className="text-lg text-gray-700 text-center">
            Thank you for being part of our community. We look forward to
            supporting your creative journey!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
