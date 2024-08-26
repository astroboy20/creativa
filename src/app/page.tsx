import { Header } from "@/components/header";
import { Hero } from "@/containers/home/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
     <Header/>
     <Hero/>
    </main>
  );
}
