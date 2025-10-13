"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValue = searchParams.get("search") || "";
  const [query, setQuery] = useState(initialValue);

  // Keep the input synced with the current URL
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg w-64"
    >
      <Search className="text-gray-400 w-4 h-4" />
      <input
        type="text"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="w-full border-none bg-transparent text-sm focus:outline-none dark:text-gray-100"
      />
    </form>
  );
}
