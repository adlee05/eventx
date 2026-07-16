import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  Search,
  Users,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      title: "Discover Events",
      description:
        "Browse hackathons, workshops, cultural events and meetups happening around you.",
      icon: Search,
    },
    {
      title: "Host with Ease",
      description:
        "Create events within minutes and manage registrations from one place.",
      icon: CalendarDays,
    },
    {
      title: "Build Communities",
      description:
        "Bring people together through events and create memorable experiences.",
      icon: Users,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create",
      description: "Create an event with all the required details.",
    },
    {
      number: "02",
      title: "Publish",
      description: "Share your event with everyone instantly.",
    },
    {
      number: "03",
      title: "Register",
      description: "Participants register in a single click.",
    },
    {
      number: "04",
      title: "Enjoy",
      description: "Track registrations and host an amazing event.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* HERO SECTION */}
      <section className="relative pt-10">
        <div className="md:text-9xl text-8xl text-center">
          EventX
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/events">
            <Button size="lg" className="gap-2">
              Explore Events
              <ArrowRight size={18} />
            </Button>
          </Link>

          <Link to="/event/create">
            <Button size="lg" variant="outline" className="gap-2">
              <PlusCircle size={18} />
              Create Event
            </Button>
          </Link>
        </div>
      </section>

      {/* WHY EVENTX SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="text-center">
          <h2 className="text-4xl font-bold md:text-5xl tracking-tight">
            Why EventX?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Everything you need to host, discover and participate
            in amazing events without the hassle.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
              >
                <CardHeader>
                  <div className="mb-4 w-fit rounded-lg border border-border bg-muted p-3 text-card-foreground">
                    <Icon size={24} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold md:text-5xl tracking-tight">
            How it works
          </h2>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="mb-6 text-6xl font-bold text-muted-foreground/20">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-4 leading-7 text-muted-foreground">
                {step.description}
              </p>
              {step.number !== "04" && (
                <div className="absolute left-[90px] top-10 hidden h-px w-full bg-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="border-y border-border bg-muted/30 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 text-center sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-5xl font-bold tracking-tight text-foreground">500+</h3>
            <p className="mt-3 text-muted-foreground font-medium">
              Events Hosted
            </p>
          </div>
          <div>
            <h3 className="text-5xl font-bold tracking-tight text-foreground">10k+</h3>
            <p className="mt-3 text-muted-foreground font-medium">
              Registrations
            </p>
          </div>
          <div>
            <h3 className="text-5xl font-bold tracking-tight text-foreground">150+</h3>
            <p className="mt-3 text-muted-foreground font-medium">
              Organizers
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="mx-auto max-w-5xl px-6 py-32">
        <div className="rounded-3xl border border-border bg-card p-12 text-center shadow-sm">
          <h2 className="text-3xl font-bold md:text-5xl tracking-tight">
            Ready to host your next event?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Whether it's a hackathon, workshop, gaming tournament or meetup,
            EventX helps you organize everything in one place.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/event/create">
              <Button size="lg">
                Create Event
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" size="lg">
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
