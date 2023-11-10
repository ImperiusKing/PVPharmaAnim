'use client';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';
import { Command, CommandInput } from './Command';
import { HitList } from './SearchHit';

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);
// let initial = true;

const searchClient = {
  search(requests) {
    //  if (initial) {
    //    initial = false;
    //    return;
    //  }
    return algoliaClient.search(requests);
  },
};

import React, { useRef, useState } from 'react';
import { useInstantSearch, useSearchBox } from 'react-instantsearch';

function SearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  const isSearchStalled = status === 'stalled';

  function setQuery(newQuery) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  return (
    <div>
      <CommandInput />
      <form
        action=''
        role='search'
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

          setQuery('');

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <input
          ref={inputRef}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
          placeholder='Search for products'
          spellCheck={false}
          maxLength={512}
          type='search'
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          autoFocus
        />
        <button type='submit'>Submit</button>
        <button
          type='reset'
          hidden={inputValue.length === 0 || isSearchStalled}
        >
          Reset
        </button>
        <span hidden={!isSearchStalled}>Searching…</span>
      </form>
    </div>
  );
}

export default function Search() {
  return (
    <InstantSearch searchClient={algoliaClient} indexName='dev_pvpharma'>
      {/* <SearchBox /> */}
      <Command>
        {/* <CommandInput /> */}
        <SearchBox />
        <HitList />
      </Command>
    </InstantSearch>
  );
}
