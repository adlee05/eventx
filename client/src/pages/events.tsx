import { EventCard } from "@/components/EventCard";

export default function Events() {
  return (
    <>
      <div className="mx-4 sm:mx-auto max-w-5xl my-10">
        <div className="greeting my-10 text-center sm:text-left">
          <h1 className="text-lg font-bold">Events</h1>
          <p className="text-base">View all available events</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-12 justify-items-center">
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
      </div>
    </>
  );
}
