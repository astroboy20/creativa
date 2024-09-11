"use client";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Explore } from "@/containers/explore/explore";
import React, { useState } from "react";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main>
      <Header showSearch={true} handleSearch={handleSearch} /> {/* Pass search handler */}
      <Explore  searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} /> {/* Pass search query to explore */}
      <Footer />
    </main>
  );
}
