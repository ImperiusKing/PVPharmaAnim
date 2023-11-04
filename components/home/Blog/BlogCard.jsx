import Link from "next/link";

export const BlogCard = ({ image, date, CardTitle, CardDescription, path }) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mx-auto mb-10 max-w-[370px]">
        <div className="mb-8 overflow-hidden rounded">
          <img src={image} alt="" className="w-full" />
        </div>
        <div>
          {date && (
            <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary">
              {date}
            </span>
          )}
          <h3>
            <Link
              href={`/news/${path}`}
              className="inline-block mb-2 text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
            >
              {CardTitle}
            </Link>
          </h3>
          <p className="text-md dark:text-gray-400">{CardDescription}</p>
        </div>
      </div>
    </div>
  );
};
