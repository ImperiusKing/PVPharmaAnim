import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/router";

const translations = {
  home: {
    en: "Home",
    vi: "Trang chủ",
  },
  thuocDongDuoc: {
    en: "Traditional Medicine",
    vi: "Thuốc Đông Dược",
  },
  thuocTanDuoc: {
    en: "Modern Medicine",
    vi: "Thuốc Tân Dược",
  },
  TPCN: {
    en: "Supplement",
    vi: "TPCN",
  },
  TinTucPhucVinh: {
    en: "Phuc Vinh News",
    vi: "Tin Phúc Vinh",
  },
  CamNangYHoc: {
    en: "Health Handbook",
    vi: "Cẩm nang y học",
  },
  TinTucTuyenDung: {
    en: "Recruitment News",
    vi: "Tin tức tuyển dụng",
  },
  // Add other product types as needed
};

function getTranslation(key, locale = "en") {
  const translation = translations[key][locale] || translations[key]["en"];
  return translation;
}

export default function Breadcrumbs({ product, category }) {
  // Assuming product.type and product.title are available and correctly passed as props
  const router = useRouter();

  const productType = product.type || "Kháng sinh uống"; // Default value or dynamic type
  const productTitle = product.title || "BIOCEME™"; // Default value or dynamic title

  console.log("Breadcrumb type:", category);

  return (
    <nav aria-label="Breadcrumb" className="text-gray-500 font-medium text-md">
      <ol className="list-none p-0 flex items-center space-x-2">
        <li>
          <Link href="/">
            <span className="hover:text-primary transition-colors duration-200 cursor-pointer">
              {getTranslation("home", router.locale)}
            </span>
          </Link>
        </li>
        <AiOutlineRight />
        <li>
          <Link href="/product">
            <span className="hover:text-primary transition-colors duration-200 cursor-pointer">
              {category}
            </span>
          </Link>
        </li>
        <AiOutlineRight />
        <li>
          <Link href={`/product/type/${encodeURIComponent(productType)}`}>
            <span className="hover:text-primary transition-colors duration-200 cursor-pointer">
              {getProductTypeLabel(productType, router.locale)}
            </span>
          </Link>
        </li>
        <AiOutlineRight />
        <li className="font-bold text-primary hover:text-gray-800 transition-colors duration-200 cursor-pointer">
          {truncateContent(productTitle)}
        </li>
      </ol>
    </nav>
  );
}

export function truncateContent(content, wordLimit = 6) {
  if (!content || typeof content !== "string") {
    return ""; // or return some default value
  }

  const words = content.split(/\s+/); // splits by spaces
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + " ..."; // truncates and adds an ellipsis
  }
  return content;
}

function getProductTypeLabel(productType, locale = "en") {
  // Use getTranslation to fetch the label based on the locale
  return getTranslation(productType, locale);
}
