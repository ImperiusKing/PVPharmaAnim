'use client';

import algoliasearch from 'algoliasearch/lite';
import { AiOutlineSearch } from 'react-icons/ai';
import { InstantSearch } from 'react-instantsearch';
import { Command } from './Command';
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
    <div className='flex flex-col items-center bg-gray-100 rounded-xl relative'>
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
          placeholder='Nhập từ khóa'
          spellCheck={false}
          maxLength={512}
          type='search'
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            props.onInputChange(event.currentTarget.value);
          }}
          autoFocus
          className='h-12 text-lg font-md px-5 bg-gray-100 rounded-xl focus:border-none focus:outline-0 focus-visible:outline-0'
        />
        <button type='submit' className='text-xl text-gray-500 px-2'>
          <AiOutlineSearch />
        </button>
        {/* <button
          type="reset"
          hidden={inputValue.length === 0 || isSearchStalled}
        >
          Reset
        </button> */}
        <span hidden={!isSearchStalled}>Searching…</span>
      </form>
    </div>
  );
}

export default function Search() {
  const [inputValue, setInputValue] = useState('');

  console.log({ inputValue });
  return (
    <InstantSearch searchClient={algoliaClient} indexName='dev_pvpharma'>
      <Command>
        <SearchBox
          inputValue={inputValue}
          onInputChange={setInputValue} // Pass the handler to change the state
        />
        {inputValue.length > 0 && <HitList />}
        {/* <HitList /> */}
      </Command>
    </InstantSearch>
  );
}