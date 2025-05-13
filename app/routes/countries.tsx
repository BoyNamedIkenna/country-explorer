import type { Route } from "./+types/countries"
import { Link } from "react-router"
import { useState, useEffect } from "react"
import { Globe, MapPin, Users } from 'lucide-react';

// Cache the data at the module level
let cachedCountries: any[] | null = null;

export async function clientLoader() {

    const res = await fetch('https://restcountries.com/v3.1/all');
    if (!res.ok) throw new Error('Failed to fetch countries');
    const data = await res.json();
    return data;
}


export default function Countries({ loaderData }: Route.ComponentProps) {
    const [search, setSearch] = useState<string>("")
    const [region, setRegion] = useState<string>("")

    const filteredCountries = loaderData.filter((country: any) => {
        const matchesRegion = !region || country.region.toLowerCase() === region.toLowerCase();
        const matchesSearch = !search ||
            country.name.common.toLowerCase().includes(search.toLowerCase()) ||
            (country.capital && country.capital[0] && country.capital[0].toLowerCase().includes(search.toLowerCase()));
        return matchesSearch && matchesRegion
    })
    return (
        <div className="flex flex-col gap-4  px-8 pb-5 min-h-screen bg-gradient-to-b from-blue-150 to-white">
            <h2 className="text-3xl font-bold my-4">Countries</h2>
            <div className="flex gap-4 bg-white">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className=" border border-gray-400 rounded-md focus:outline-none focus:shadow-md transition-shadow duration-300 flex-3 px-2 py-3"
                />
                <select value={region} onChange={(e) => setRegion(e.target.value)} className=" border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900 transition-shadow duration-300 flex-1 px-2 py-3">
                    <option value="">All Regions</option>
                    <option value="africa">Africa</option>
                    <option value="america">America</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>
            {filteredCountries.length === 0 ? <div className="font-bold text-xl">No Countries found. Check your filters</div> :
                <ul className="grid lg:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4">
                    {filteredCountries.map((country: any, key: number) => (
                        <Link to={`/countries/${country.name.common}`} className="border border-gray-400 shadow-md px-5 py-4 rounded-xl hover:shadow-xl transition-shadow duration-200 group bg-white">
                            <li key={key} className="flex items-start justify-between">
                                <div>
                                    <div className="text-xl cursor-pointer font-bold">{country.name.common}</div>
                                    <div className="text-base text-gray-700 flex flex-col gap-2 mt-3">
                                        <div className="flex items-center"><Globe className="text-blue-700 h-[14px]" style={{ margin: 0 }} />Region: {country.region}</div>
                                        <div className="flex items-center"><Users className="text-blue-700 h-[14px]" /><span>Population: {country.population.toLocaleString()}</span></div>
                                        <div className="flex items-center"><MapPin className="text-blue-700 h-[14px]" /><span> Capital: {country.capital}</span></div>
                                    </div>
                                </div>
                                <div>
                                    <img src={country.flags.png} alt="Country Flag" className="h-3  rounded-xs" />
                                </div>
                            </li>
                            <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <hr className="text-gray-200" />
                                <div className="mt-3  text-blue-700 flex items-center">
                                    <span>View Details →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </ul>
            }
        </div >
    )
}