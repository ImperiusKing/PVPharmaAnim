import { Highlight, useHits } from 'react-instantsearch';
import { CommandGroup, CommandItem, CommandList } from './Command';

export function HitList() {
  const { hits, results, sendEvent } = useHits();
  console.log({ hits, results });
  return (
    <CommandList className='absolute top-10 z-10 bg-white'>
      <CommandGroup>
        {hits.slice(0, 3).map((item) => (
          <Hit key={item.objectID} hit={item} />
        ))}
      </CommandGroup>
    </CommandList>
  );
}

export function truncateContent(content, wordLimit = 30) {
  if (!content || typeof content !== 'string') {
    return ''; // or return some default value
  }

  const words = content.split(/\s+/); // splits by spaces
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...'; // truncates and adds an ellipsis
  }
  return content;
}

function Hit({ hit }) {
  return (
    <CommandItem>
      <div className='flex flex-col justify-center h-full'>
        <h1>
          <Highlight attribute='title' hit={hit} />
        </h1>
        <p className='mt-1'>{truncateContent(hit.description)}</p>
      </div>
    </CommandItem>
  );
}

// function Hit({ hit }) {
//   return (
//     <CommandItem className="flex items-center space-x-4">
//       {" "}
//       {/* Adjust spacing as needed */}
//       <div className="flex-1">
//         <h1 className="text-lg font-bold">
//           {" "}
//           {/* Add styling for the title as needed */}
//           <Highlight attribute="title" hit={hit} />
//         </h1>
//       </div>
//       <p className="flex-1">{hit.description}</p>{" "}
//       {/* Add styling for the description as needed */}
//     </CommandItem>
//   );
// }
