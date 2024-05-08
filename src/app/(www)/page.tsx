import { Faq } from "@/components/www/faq";
import { Features } from "@/components/www/features";
import { Hero } from "@/components/www/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features id="features" />
      <Faq id="faq" />
    </main>
  );
}
