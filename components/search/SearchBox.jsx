import React, { useRef } from 'react';
import { useInstantSearch, useSearchBox } from 'react-instantsearch';

export function SearchBox({ inputValue, onInputChange }) {
  const { refine } = useSearchBox();
  const { status } = useInstantSearch();
  const inputRef = useRef(null);
  const isSearchStalled = status === 'stalled';

  function setQuery(newQuery) {
    onInputChange(newQuery); // Use the passed handler to change the state
    refine(newQuery);
  }

  return (
    <div>
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
          className=''
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
