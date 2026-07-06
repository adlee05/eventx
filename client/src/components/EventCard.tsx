import { IconClockHour3 } from '@tabler/icons-react';
import { Link } from "react-router-dom";
import type { EventProps } from "@/types/event-props";
import { ChevronRight, MapPin } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
import { getDateTime } from '@/utils/getDateTime';

export function EventCard(props: EventProps) {
  const linkTo = `/event/${props._id}`;
  const categoryColors: Record<string, string> = {
    tech: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-1",
    recreational: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 mb-1",
    art: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 mb-1",
    archived: "bg-gray-50 text-purple-700 dark:bg-gray-950 dark:text-purple-300 mb-1",
  }

  const imgUrl = (
    props.imageUrl == "" ? "https://images.pexels.com/photos/17415163/pexels-photo-17415163.jpeg" : props.imageUrl
  );

  return (
    <div className="group w-full max-w-sm">

      <div
        className="relative h-80 sm:h-96 rounded-xl shadow-xl w-full flex flex-col justify-end p-4 bg-cover bg-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          backgroundImage: `url(${imgUrl}?w=800)`
        }}
      >

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent transition group-hover:from-black/95" />

        <div className="relative z-10">
          <div className='flex gap-4'>
            <Badge className={categoryColors[props.category]}>
              {props.category}
            </Badge>
          </div>
          <h1 className="font-semibold text-sm md:text-lg text-white leading-snug drop-shadow-md">
            {props.title}
          </h1>

          <p className="text-sm text-gray-200 mt-2 line-clamp-2">
            {props.description}
          </p>

          <div className="gap-4 mt-4 flex items-center justify-between">
            <div className="relative min-w-0 z-10 flex flex-col gap-2 text-white md:text-sm text-xs">

              <div className="flex items-center gap-2">
                <IconClockHour3 size={16} />
                {getDateTime(props.startDate)}
              </div>

              <div className="flex items-center gap-2 text-gray-200 min-w-0">
                <MapPin size={16} className='shrink-0' />
                <p className='truncate'>
                  {props.location}
                </p>
              </div>

            </div>

            <Button
              asChild
              size="sm"
              className="bg-white shrink-0 text-black hover:bg-white/90"
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
