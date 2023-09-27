import { useEffect, useState } from 'react';

export const WorkCard = ({ amount, description, descriptionx }) => {
  const index = Math.min(amount.lastIndexOf('+'), amount.lastIndexOf('K'));
  const number = Number(
    amount.substring(0, index >= 0 ? index : amount.length - 1)
  );
  const restString = index >= 0 ? amount.substring(index) : '+';
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter < number) {
        setCounter(counter + 1);
      }
    }, 1500  / (number * 1.0));
    return () => clearInterval(interval);
  }, [counter, number]);

  return (
    <div className='flex w-[60%] items-center space-x-2 border-b-2 border-[#cccdcf] pb-1 last:border-b-0'>
      <div className='text-[#58595B] font-bold w-[100px] text-[5rem]'>
        {counter}
        {restString}
      </div>
      <div className='flex flex-col'>
        <div className='text-[#58595B] text-[1.5rem] text-semibold w-[250px] leading-[22px] ml-[50px]'>
          {description}
        </div>
        <div className='text-[#58595B] text-[1.5rem] text-semibold w-[300px] leading-[22px] ml-[50px]'> {/* Adjust margin-top and margin-left as needed */}
          {descriptionx}
        </div>
      </div>
    </div>
  );
};
