import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="hero bg-background py-32">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold">
                Onboard in seconds save hours
              </h1>
              <p className="text-pretty py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <div className="flex justify-center gap-4">
                <Button>Get Started</Button>
                <Button variant="outline" className="border border-primary">
                  Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
