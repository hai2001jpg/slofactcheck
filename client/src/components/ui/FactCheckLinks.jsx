import { useFactCheckSearch } from "@/hooks/useFactCheckSearch";
import { useEffect } from "react";

export default function FactCheckLinks({ input }) {
  const { results, loading, error, searchFactCheck } = useFactCheckSearch();

  useEffect(() => {
    if (input) {
      searchFactCheck(input);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div className="my-4">
      <div className="mt-4 flex justify-center">
        {loading && <span className="text-white font-[Montserrat]">Searching...</span>}
        {error && <div className="text-red-500">{error}</div>}
        {results.length === 0 && !loading && !error && <span className="text-white font-[Montserrat]">No source was found.</span>}
        <ul className="space-y-2 flex flex-col gap-2">
          {results.map((r, i) => (
            <li key={i} className="border-b border-gray-700 pb-2">
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline font-bold">
                {r.platform || "Unknown source"}
              </a>
              <span className="ml-2 text-gray-300">{r.rating}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
