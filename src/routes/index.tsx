import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/about";
import { ContactForm } from "@/components/site/contact";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Process } from "@/components/site/process";
import { Projects } from "@/components/site/projects";
import { Services } from "@/components/site/services";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-6 sm:px-6">
        <Hero />
        <Services />
        <Projects />
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-6">
          <About />
          <Process />
        </div>
        <Cta />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
