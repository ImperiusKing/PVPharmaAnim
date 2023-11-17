"use client";

import algoliasearch from "algoliasearch/lite";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import {
  InstantSearch,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch";
import { Command } from "./Command";
import { HitList } from "./SearchHit";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);

function SearchBox({ inputValue, onInputChange, currentLanguage }) {
  const { refine } = useSearchBox();
  const { status } = useInstantSearch();
  const inputRef = useRef(null);

  console.log("Current Language in SearchBox:", currentLanguage);

  return (
    <div className="flex flex-col items-center bg-gray-100 rounded-xl relative">
      <form
        action=""
        role="search"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();

          refine("");
          onInputChange("");

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <input
          key={currentLanguage}
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={
            currentLanguage === "en" ? "Enter keywords ..." : "Nhập từ khóa ..."
          }
          spellCheck={false}
          maxLength={512}
          type="search"
          value={inputValue}
          onChange={(event) => {
            refine(event.currentTarget.value);
            onInputChange(event.currentTarget.value);
          }}
          autoFocus
          className="h-12 text-lg font-md px-5 bg-gray-100 rounded-xl focus:border-none focus:outline-0 focus-visible:outline-0"
        />
        <button type="" className="text-xl text-gray-500 px-2">
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
}

export default function Search() {
  const router = useRouter();
  const currentLanguage =
    router.locale === "en" ? "English 🇺🇸" : "Tiếng Việt 🇻🇳";
  const [inputValue, setInputValue] = useState("");

  console.log("Current Language:", currentLanguage);
  console.log("Router Locale:", router.locale);

  return (
    <InstantSearch searchClient={algoliaClient} indexName="dev_pvpharma">
      <Command>
        <SearchBox
          currentLanguage={router.locale}
          inputValue={inputValue}
          onInputChange={setInputValue} // Pass the handler to change the state
        />
        {inputValue.length > 0 && <HitList onClick={() => setInputValue("")} />}
      </Command>
    </InstantSearch>
  );
}
