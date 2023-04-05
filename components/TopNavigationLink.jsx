import Link from "next/link";

const TopNavigationLink = ({ title = "Tweet", url = "/" }) => {
  return (
    <Link href={url}>
      <div className="flex mb-2 items-flex cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default TopNavigationLink;
