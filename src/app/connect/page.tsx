import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Connect } from "@/containers/connect";
// import { Connect } from "@/containers/home/connect";

export default function Page() {
  return (
    <div>
      <Header />
      <Connect />
      <Footer />
    </div>
  );
}
