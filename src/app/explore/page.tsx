import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Explore } from "@/containers/explore/explore";

export default function Page(){
    return(
        <main>
            <Header/>
            <Explore/>
            <Footer/>
        </main>
    )
}
