import type { Route } from "./+types/home";
import { Link } from "react-router"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CountryExplorer" },
    { name: "Simple facts about countries around the world", content: "Welcome!!!" },
  ];
}

export default function Home() {
  return (
    <div className="pt-[150px] px-4 home ">
        <div className="flex flex-col justify-between items-center">
              <h1 className="text-5xl font-bold mb-7">
                <span className="text-stone-300">Explore Countries with </span>
                <span className="text-orange-700">Real-Time Data</span>
              </h1>
              <p className="text-xl text-stone-200 ml-15">Discover details about countries around you!</p>
              <div className="flex mt-5 gap-15">
                <Link to="/countries">
                  <button className="flex bg-blue-700 py-3 px-4 text-white rounded-md cursor-pointer"><span>Explore Now</span>
                  <span className="ml-2">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" className="fill-white" /></svg></span>
                  </button>
                </Link>
                <Link to="/about">
                  <button className="flex bg-stone-300 py-3 px-4 rounded-md cursor-pointer">Get More Info</button>
                </Link>
              </div>
            </div>
    </div>
  )
}
