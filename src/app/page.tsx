import { BlogPage } from "@/components/home/blog-page";
import BrandPage from "@/components/home/brand-page";
import { HeroPage } from "@/components/home/hero-page";
import HomePage from "@/components/home/home-page";
import ProductPage from "@/components/home/product-page";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <HomePage/>
      <HeroPage/>
      <BlogPage/>
      <ProductPage/>
      <BrandPage/>
    </div>
  );
}
