import TextPressure from '@/components/TextPressure';
import { ConstellationBackground } from "@/components/ui/constellation";
import { useEffect } from "react";
import { useTheme } from "@/components/providers/themeProvider"

function HomeHero() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark")
  }, [setTheme]);

  return (
    <div className="max-w-4xl mx-auto">
      <ConstellationBackground
        className='min-h-[575px] -z-100'
      />
      <div className="min-h-[575px] text-center flex flex-col items-center justify-center">
        <div className="w-full overflow-hidden">
          <TextPressure
            text="EventX"
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            textColor="#ffffff"
            strokeColor="#5227FF"
            minFontSize={36}
          />
        </div>
        <h1 className="text-2xl">Host / Join events with people you like</h1>
      </div>
    </div>
  );
}


export default HomeHero;
