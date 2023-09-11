import { useEffect, useState } from 'react';

export const WorkCard = ({ amount, description }) => {
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
    }, 20);
    return () => clearInterval(interval);
  }, [counter, number]);

  return (
    <div className='flex w-[40%] items-center space-x-8 border-b-2 border-[#cccdcf] pb-4'>
      <div className='text-[#58595B] font-bold text-[2.5rem]'>
        {counter}
        {restString}
      </div>
      <div className='text-[#58595B] text-[1.3rem] font-extralight w-[14rem] leading-[22px]'>
        {description}
      </div>
    </div>
  );
};
