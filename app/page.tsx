import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedMenu } from "@/components/featured-menu";
import { Promos } from "@/components/promos";
import { CoffeeCta } from "@/components/coffee-cta";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { StaticData } from "@/components/static-data";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <StaticData />
      <FeaturedMenu />
      <Promos />
      <CoffeeCta />
      <Features />
      <Footer />
    </>
  );
}
