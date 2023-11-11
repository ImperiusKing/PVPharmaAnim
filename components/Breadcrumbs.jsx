import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";

export default function Breadcrumbs({ product }) {
  // Assuming product.type and product.title are available and correctly passed as props
  const productType = product.type || "Kháng sinh uống"; // Default value or dynamic type
  const productTitle = product.title || "BIOCEME™"; // Default value or dynamic title

  return (
    <nav aria-label="Breadcrumb" className="text-gray-500 font-medium text-md">
      <ol className="list-none p-0 flex items-center space-x-2">
        <li>
          <Link href="/">
            <span className="hover:text-primary transition-colors duration-200 cursor-pointer">
              Trang chủ
            </span>
          </Link>
        </li>
        <AiOutlineRight />
        <li>
          <Link href="/product">
            <span className="hover:text-primary transition-colors duration-200 cursor-pointer">
              Sản phẩm
            </span>
          </Link>
        </li>
        <AiOutlineRight />
        <li>
          <Link href={`/product/type/${encodeURIComponent(productType)}`}>
            <span className="hover:text-primary transition-colors duration-200 cursor-pointer">
              {getProductTypeLabel(productType)}
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

function getProductTypeLabel(productType) {
  switch (productType[0]) {
    case "thuocDongDuoc":
      return "Thuốc Đông Dược";
    case "thuocTanDuoc":
      return "THUỐC TÂN DƯỢC";
    case "TPCN":
      return "THỰC PHẨM CHỨC NĂNG";
    case "TinTucPhucVinh":
      return "Tin Phúc Vinh";
    case "CamNangYHoc":
      return "Cẩm nang y học";
    case "TinTucTuyenDung":
      return "Tin tức tuyển dụng";
    default:
      return productType; // Return the product type itself if it doesn't match any case
  }
}
