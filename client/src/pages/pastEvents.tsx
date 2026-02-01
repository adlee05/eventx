import { EventCard } from "@/components/EventCard";

export default function PastEvents() {
  return <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
      {Array.from({ length: 10 }).map((_, i) => (
        <EventCard
          key={i}
          id="hello"
          date="hello"
          duration="hello"
          place="hello"
          title="hello"
          desc="hello"
        />
      ))}
    </div>
  </>;
}
