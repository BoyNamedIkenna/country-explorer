import { Languages, Info, Currency, MapPin } from "lucide-react";
import type { Route } from "./+types/country";

export async function clientLoader({ params }: Route.LoaderArgs) {
    const countryName = params.countryName;
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    const data = await res.json();
    if (!res.ok) throw new Error('Failed to fetch country data');
    return data;
}

export default function Country({ loaderData }: Route.ComponentProps) {
    type Country = {
        name: string;
        officialName: string;
        capital: string;
        population: number | string;
        region: string;
        subregion: string;
        flagUrl: string;
        languages: string[];
        currencies: string[];
    };

    const country: Country = {
        name: loaderData[0]?.name.common || "N/A",
        officialName: loaderData[0]?.name?.official || "N/A",
        capital: loaderData[0]?.capital?.[0] || "N/A",
        population: loaderData[0]?.population || "N/A",
        region: loaderData[0]?.region || "N/A",
        subregion: loaderData[0]?.subregion || "N/A",
        flagUrl: loaderData[0]?.flags?.png || "",
        languages: loaderData[0]?.languages
            ? Object.values(loaderData[0].languages)
            : ["N/A"],
        currencies: loaderData[0]?.currencies
            ? Object.values(loaderData[0].currencies as Record<string, { name: string; symbol?: string }>).map(
                (currency) => `${currency.name} ${currency.symbol ? ` (${currency.symbol})` : ""}`
            )
            : ["N/A"],
    };
    console.log(country.languages)

    return (
        <section className="flex flex-col justify-center px-30 mt-5">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    {
                        country.flagUrl && (
                            <img src={country.flagUrl} alt="Country Flag" className="w-20 h-auto shadow-md rounded-md border border-gray-200" />
                        )
                    }
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-gray-800">{country.name}</h1>
                        <p className="text-gray-500 italic mt-1">{country.officialName}</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-6 py-10">
                <div className="flex flex-col gap-8 flex-2">
                    <div className="bg-white p-4 flex flex-col rounded-md shadow-md">
                        <div className=" text-2xl font-semibold flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-700" />
                            Overview
                        </div>
                        <div className="flex flex-col gap-5 p-5">
                            <div className="flex py-3 border-b last:border-b-0 border-gray-200">
                                <div className="text-gray-500 w-100">Region</div><div>{country.region}</div>
                            </div>
                            <div className="flex py-3 border-b last:border-b-0 border-gray-200">
                                <div className="text-gray-500 w-100">Subregion</div>
                                <div>{country.subregion}</div>
                            </div>
                            <div className="flex py-3 border-b last:border-b-0 border-gray-200">
                                <span className="text-gray-500 w-100">Capital</span><span>{country.capital}</span>
                            </div>
                            <div className="flex py-3 border-b last:border-b-0 border-gray-200">
                                <span className="text-gray-500 w-100">Population</span><span>{country.population}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 flex flex-col rounded-md shadow-md">
                        <div className=" text-2xl font-semibold flex items-center gap-2">
                            <Languages className="w-4 h-4 text-blue-700" />
                            Languages
                        </div>
                        <div className="p-5">
                            {Object.values(country.languages).map((lang: string) => (
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-md mr-5">{lang}</span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-4 flex flex-col rounded-md shadow-md">
                        <div className=" text-2xl font-semibold flex items-center gap-2">
                            <Currency className="w-4 h-4 text-blue-700" />
                            Currency
                        </div>
                        <div className="p-5">
                            {Object.values(country.currencies).map((lang: string) => (
                                <span className="px-3 py-1 bg-green-100  rounded-full text-md mr-5">{lang}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

{/* <p><span>Region:</span> {country.region}</p>
                <p><span>Subregion:</span> {country.subregion}</p>
                <p><span>Capital:</span> {country.capital}</p>
                <p><span>Population:</span> {country.population.toLocaleString()}</p>
                <p><span>Population:</span> {country.languages.toLocaleString()}</p>
                <p><span>Currencies:</span> {country.currencies}</p> */}

