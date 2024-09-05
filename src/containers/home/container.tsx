"use client";
import React from "react";
import { Hero } from "./hero";
import { Meet } from "./meet";
import { Explore } from "./explore";
import { Connect } from "./connect";
import { Categories } from "./categories";
import { useFetchItem } from "@/hooks/useFetchItem";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ClipLoader } from "react-spinners";

const processCreatorsData = (data: any[]) => {
  return data.map((docData: any) => {
    let averageRating = 0;
    if (Array.isArray(docData.rating)) {
      if (docData.rating.length > 0) {
        averageRating =
          docData.rating.reduce(
            (acc: number, cur: any) => acc + cur.rating,
            0
          ) / docData.rating.length;
      }
    } else {
      averageRating = docData.rating;
    }

    return { ...docData, averageRating };
  });
};

const Container = () => {
  const { data: creators = [] } = useFetchItem({
    collectionName: "creators",
    processData: processCreatorsData,
  });

  const { data: users = [], isLoading } = useFetchItem({
    collectionName: "users",
  });
  console.log("data", users);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100svh]">
        <ClipLoader color="#501078" />
      </div>
    );
  }
  return (
    <>
      <Header />
      <Hero />
      <Meet users={users} />
      <Explore creators={creators} />
      <Connect />
      <Categories />
      <Footer />
    </>
  );
};

export { Container };
