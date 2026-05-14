import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedMenu } from "@/components/featured-menu";
import { Promos } from "@/components/promos";
import { CoffeeCta } from "@/components/coffee-cta";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { StaticData } from "@/components/static-data";
import { Maps } from "@/components/maps";

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
      <div className="w-full max-w-6xl mx-auto px-4 py-16">
        <Maps />
      </div>
      <Footer />
    </>
  );
}
