"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function MapLocator() {
  const [floor, setFloor] = useState(-1);
  const [coords, setCoords] = useState<{x: number, y: number}>({ x: 0, y: 0 });

  return (
    <section className="h-screen flex p-0 relative overflow-hidden flex-col w-full border-b border-b-[#111110] items-center justify-center">
      <div className="flex justify-between absolute top-12 left-0 w-full border-b-[1px] border-b-[#111110] items-center px-12 py-2">
        <Link
          href="/home"
          className="text-3xl font-bold font-cabin text-[#111110]  flex items-center gap-x-2"
        >
          <img src="/gb.png" className="w-10" />
          <h1>P2P Mentorship</h1>
        </Link>
        <div className="flex gap-x-8 text-xl font-cabin z-10">
          <h1>Issues</h1>
          <Link href="/mentors">Mentors</Link>
          <Link href="/map">Map</Link>
        </div>
      </div>
      <div className="h-full absolute top-0 w-[1px] bg-[#111110] left-8" />
      {/* <div className="h-1/2 absolute top-0 w-[1px] bg-[#111110] right-8" /> */}
      <div className="h-full absolute top-0 w-[1px] bg-[#111110] left-1/2" />
      <div className="w-full absolute top-1/2 h-[1px] bg-[#111110] left-0" />
      <div className="w-1/2 absolute bottom-10 h-[1px] bg-[#111110] left-1/2" />
      {/* <div className="h-1/2 absolute top-1/2 w-[1px] bg-[#111110] left-48 " /> */}
      <div className="overflow-hidden whitespace-nowrap py-1 bg-[#FFF348] border-b border-[#111110] z-10 absolute top-0">
        <div className="inline-block animate-marquee">
          <p className="inline-block px-4 uppercase text-[#1f4b60] font-medium">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione,
            animi? Vero, fugiat porro at, ducimus dolorem optio quae totam
            magnam iusto ea nemo molestias quod delectus consequuntur inventore
            laborum quo.{" "}
          </p>
        </div>
      </div>
      <div className="w-[60vw] m-5 text-black p-5 z-10">
        
            {floor == -1 && <FloorSelector setFloor={setFloor} />}
            {floor != -1 && (
              <MapPreview
                floor={floor}
                setFloor={setFloor}
                coords={coords}
                setCoords={setCoords}
              />
            )}
        </div>
    </section>
  );
}

function FloorSelector(props: {
  setFloor: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex flex-col items-center gap-y-4 z-10">
      <h3 className="text-3xl font-bold font-cabin self-start pl-6">Select Floor</h3>
      <div className="flex divide-x-[1px] divide-black border border-black">
        {floors.map((floor, key) => (
          <button
            key={key}
            className="px-4 py-4 hover:bg-red-200 hover:text-white duration-300 bg-white"
            onClick={() => {
              props.setFloor(key);
            }}
          >
            {floor.title}
          </button>
        ))}
      </div>
    </div>
  );
}

interface Coordinate {
  x: number;
  y: number;
}

function MapPreview(props: {
  setCoords: React.Dispatch<React.SetStateAction<Coordinate>>;
  coords: Coordinate;
  floor: number;
  setFloor: React.Dispatch<React.SetStateAction<number>>;
}) {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [fixed, setFixed] = useState(false);

  return (
    <>
      <div
        className={twMerge("relative", !fixed && "cursor-none")}
        ref={containerRef}
        onMouseMove={(e) => {
          if (!fixed) {
            const rect = containerRef.current.getBoundingClientRect();
            const { clientX: x, clientY: y } = e;
            props.setCoords({
              x: x - rect.left,
              y: y - rect.top > 40 ? y - rect.top : 40,
            });
          }
        }}
        onMouseDown={() => {
          setFixed((f) => !f);
        }}
      >
        <img src={floors[props.floor].image} alt={floors[props.floor].title} />
        <img
          src="https://pngimg.com/d/google_maps_pin_PNG72.png"
          alt="pin"
          className="absolute w-[4%]"
          style={{ left: props.coords.x, top: props.coords.y - 70 }}
        />
      </div>
      <button
        className="bg-red-500 px-5 py-2 rounded-lg text-white"
        onClick={() => {
          props.setFloor(-1);
        }}
      >
        Change Floor
      </button>
    </>
  );
}

const floors = [
  {
    title: "Ground Floor (#0)",
    image:
      "https://ethberlin.org/static/groundFloor-6e95a15afe1ecd4784bd401f60b45cf6.png",
  },
  {
    title: "First Floor (#1)",
    image:
      "https://ethberlin.org/static/firstFloor-be9e98072542a54b1af3d6b0c55a0d67.png",
  },
  {
    title: "Second Floor (#2)",
    image:
      "https://ethberlin.org/static/secondFloor-b5962086a073150c890aa04414996fe3.png",
  },
  {
    title: "Third Floor (#3)",
    image:
      "https://ethberlin.org/static/thirdFloor-90f87766b51f1e5f35e530f632f37bef.png",
  },
  {
    title: "Topmost Floor (#5)",
    image:
      "https://ethberlin.org/static/fifthFloor-8d4d588027419cbbf2d27adefdf24d94.png",
  },
];
