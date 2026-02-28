import { IconClockHour3 } from '@tabler/icons-react';
import { Link } from "react-router-dom";
import type { EventProps } from "@/types/event-props";
import { formatDate } from "@/utils/formatDate";
import { Bookmark, ChevronRight } from "lucide-react";
import { Button } from '@/components/ui/button';

export function EventCard(props: EventProps) {
  const linkTo = `/events/${props._id}`;
  return (
    <div className="group/card w-full max-w-sm">
      <div
        className="relative h-96 rounded-md shadow-xl w-full mx-auto flex flex-col justify-between p-4 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${props.imageUrl})`,
        }}
      >

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition duration-300 group-hover/card:from-black/95" />

        {/* Date + Location */}
        <div className="relative z-10 flex items-center gap-2 text-white text-sm">
          <IconClockHour3 stroke={2} size={18} />

          <span>
            {formatDate(props.date)}
          </span>

          <span className="text-white">
            • {props.location}
          </span>
        </div>

        {/* Title + Description */}
        <div className="relative z-10">
          <h1 className="font-semibold text-xl text-white drop-shadow-lg">
            {props.title}
          </h1>

          <p className="text-sm text-gray-200 mt-2 line-clamp-3">
            {props.description}
          </p>
          <div className='userActions mt-3 flex items-center justify-between'>
            <div className='bookmark text-white'><Bookmark /></div>
            <div className="more">
              <Button asChild className="bg-white text-black">
                <Link to={linkTo}>
                  More <ChevronRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
