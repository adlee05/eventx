import { IconClockHour3 } from '@tabler/icons-react';
import { Link } from "react-router-dom";
import type { EventProps } from "@/types/event-props";
import { formatDate } from "@/utils/formatDate";
import { Bookmark, ChevronRight, MapPin } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"

export function EventCard(props: EventProps) {
  const linkTo = `/event/${props._id}`;
  const categoryColors: Record<string, string> = {
    tech: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3",
    recreational: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 mb-3",
    art: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 mb-3",
  }

  return (
    <div className="group w-full max-w-sm">

      <div
        className="relative h-80 sm:h-96 rounded-xl shadow-xl w-full flex flex-col justify-between p-4 bg-cover bg-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          backgroundImage: `url(${props.imageUrl}?w=800)`
        }}
      >

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition group-hover:from-black/95" />

        {/* Date + Location */}
        <div className="relative z-10 flex flex-col gap-2 text-white text-sm">

          <div className="flex items-center gap-2">
            <IconClockHour3 size={16} />
            {formatDate(props.startTime)}
          </div>

          <div className="flex items-center gap-2 text-gray-200">
            <MapPin size={16} />
            {props.location}
          </div>

        </div>

        <div className="relative z-10">
          <Badge className={categoryColors[props.category]}>
            {props.category}
          </Badge>
          <h1 className="font-semibold text-lg text-white leading-snug drop-shadow-md">
            {props.title}
          </h1>

          <p className="text-sm text-gray-200 mt-2 line-clamp-2">
            {props.description}
          </p>

          <div className="mt-4 flex items-center justify-between">

            <button className="text-white hover:text-yellow-300 transition">
              <Bookmark size={18} />
            </button>

            <Button
              asChild
              size="sm"
              className="bg-white text-black hover:bg-white/90"
            >
              <Link to={linkTo} className="flex items-center gap-1">
                More <ChevronRight size={16} />
              </Link>
            </Button>

          </div>

        </div>

      </div>
    </div>
  );
}
