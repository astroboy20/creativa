import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Categories } from "@/containers/home/categories";
import {Connect} from "@/containers/home/connect";
import { Explore } from "@/containers/home/explore";
import { Hero } from "@/containers/home/hero";
import { Meet } from "@/containers/home/meet";

export default function Home() {
  return (
    <main className="">
     <Header/>
     <Hero/>
     <Meet/>
     <Explore/>
     <Connect/>
     <Categories/>
     <Footer/>
    </main>
  );
}
