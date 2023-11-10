import { Highlight, useHits } from 'react-instantsearch';
import { CommandGroup, CommandItem, CommandList } from './Command';

export function HitList() {
  const { hits, results, sendEvent } = useHits();
  console.log({ hits, results });
  return (
    <CommandList>
      <CommandGroup>
        {hits.slice(0, 6).map((item) => (
          <Hit key={item.objectID} hit={item} />
        ))}
      </CommandGroup>
    </CommandList>
  );
}
function Hit({ hit }) {
  return (
    <CommandItem>
      {/* <img src={hit.image} alt={hit.name} /> */}
      {/* <p>{hit.categories[0]}</p> */}
      <h1>
        <Highlight attribute='title' hit={hit} />
      </h1>
      <p>${hit.description}</p>
    </CommandItem>
  );
}
