import { EventCard } from "@/components/EventCard";

export default function PastEvents() {
  return <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-12">
      {Array.from({ length: 10 }).map((_, i) => (
        <EventCard
          key={i}
          id="hello"
          date="Mon, 25th Aug"
          duration="4hrs"
          place="Amaravati"
          title="Getting Started with Arch"
          desc="Deep dive into linux and more!"
        />
      ))}
    </div>
  </>;
}
