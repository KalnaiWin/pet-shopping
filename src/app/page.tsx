import { HeroPage } from "@/components/home/hero-page";
import HomePage from "@/components/home/home-page";
import ProductPage from "@/components/home/product-page";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <HomePage/>
      <HeroPage/>
      <ProductPage/>
    </div>
  );
}
