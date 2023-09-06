export const ProductButton = ({ name, className }) => {
  return (
    <div
      className={`bg-white border-2 border-[#9fcae2] text-[#58595B] uppercase px-8 py-4 rounded-[2rem] text-lg ${className}`}
    >
      {name}
    </div>
  );
};
