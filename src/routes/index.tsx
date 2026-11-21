import { useEffect, useState } from "react";
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
import { getSiteContent } from "@/lib/site/api";
import { CONTENT_CHANNEL, CONTENT_TICK, type SiteContent } from "@/lib/site/content";

export const Route = createFileRoute("/")({
  loader: () => getSiteContent(),
  staleTime: 0,
  component: Home,
});

function Home() {
  const initial = Route.useLoaderData();
  const [content, setContent] = useState<SiteContent>(initial);

  useEffect(() => {
    setContent(initial);
  }, [initial]);

  useEffect(() => {
    let stop = false;
    const pull = () => {
      getSiteContent()
        .then((next) => {
          if (!stop) setContent(next);
        })
        .catch(() => undefined);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONTENT_TICK) pull();
    };
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel(CONTENT_CHANNEL);
      channel.onmessage = () => pull();
    } catch {
      channel = null;
    }
    const timer = window.setInterval(pull, 12000);
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", pull);
    return () => {
      stop = true;
      window.clearInterval(timer);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", pull);
      channel?.close();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header nav={content.nav} />
      <main className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-6 sm:px-6">
        <Hero hero={content.hero} nav={content.nav} />
        <Services services={content.services} />
        <Projects projects={content.projects} />
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-6">
          <About about={content.about} />
          <Process process={content.process} />
        </div>
        <Cta cta={content.cta} />
        <ContactForm contact={content.contact} />
      </main>
      <Footer nav={content.nav} footer={content.footer} />
    </div>
  );
}
