import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import client from "../../apollo-client";
import { Button } from "../../components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/Dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import { mergeLocalizationsArray } from "../../utils/mergeLocalizations";

const translations = {
  products: {
    en: "PRODUCTS",
    vi: "SẢN PHẨM",
  },
  researchDevelopment: {
    en: "Phuc Vinh Pharmaceuticals deeply researches, develops, and produces its products comprehensively, with a mission to provide the community with high-quality, safe pharmaceuticals that effectively prevent and treat illnesses.",
    vi: "Sản phẩm của Dược Phúc Vinh được đi sâu nghiên cứu, phát triển và sản xuất một cách toàn diện với sứ mệnh: Mang đến cho cộng đồng những dược phẩm chất lượng, an toàn, có tác dụng phòng và trị bệnh cao.",
  },
  thuocDongDuoc: {
    en: "TRADTIONAL MEDICINE",
    vi: "THUỐC ĐÔNG DƯỢC",
  },
  thuocTanDuoc: {
    en: "MODERN MEDICINE",
    vi: "THUỐC TÂN DƯỢC",
  },
  TPCN: {
    en: "SUPPLEMENT",
    vi: "THỰC PHẨM CHỨC NĂNG",
  },
  all: {
    en: "ALL",
    vi: "TẤT CẢ",
  },
  disclaimer: {
    en: "DISCLAIMER",
    vi: "THÔNG BÁO",
  },
  websiteDisclaimer: {
    en: "All information on this website is for reference only. Please confirm you are a pharmacist, doctor, or healthcare professional seeking product information.",
    vi: "Mọi thông tin trên website chỉ có tính chất tham khảo. Vui lòng xác nhận bạn là dược sĩ, bác sĩ & nhân viên y tế có nhu cầu tìm hiểu thông tin sản phẩm.",
  },
  confirmButton: {
    en: "Confirm",
    vi: "Xác nhận",
  },
  backButton: {
    en: "Back",
    vi: "Quay lại",
  },
  sortAZ: {
    en: "Sort from A->Z",
    vi: "Xếp từ A->Z",
  },
  sortZA: {
    en: "Sort from Z->A",
    vi: "Xếp từ Z->A",
  },
  sortFeatured: {
    en: "Sort by Featured",
    vi: "Sắp xếp theo nổi bật",
  },
};

function getTranslation(key, locale = "en") {
  const translation = translations[key][locale] || translations[key]["en"];
  return translation;
}

const Products = ({ products, productTypes }) => {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [selectedTypes, setSelectedTypes] = useState([...productTypes]);
  const [selectedSortOption, setSelectedSortOption] = useState("az"); // default sort option
  const router = useRouter();

  useEffect(() => {
    let sortedArray = [...products].filter((p) => p.title); // Filter out products without titles
    if (selectedSortOption === "az") {
      sortedArray.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (selectedSortOption === "za") {
      sortedArray.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    } else if (selectedSortOption === "featured") {
      // Sort by isFeatured, true first then false
      sortedArray.sort((a, b) => {
        // Assuming isFeatured is a boolean, if not, convert it accordingly
        return b.isFeatured - a.isFeatured;
      });
    }

    setSortedProducts(sortedArray);
  }, [selectedSortOption, products]);

  return (
    <div className="bg-white">
      <div className="mx-auto w-full">
        <div className="relative overflow-hidden bg-[#F5F5F5] w-full">
          <div className="py-16">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="w-[60%] mx-auto text-center">
                <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl">
                  {getTranslation("products", router.locale)}
                </h1>
                <p className="mt-6 text-xl text-gray-600">
                  {getTranslation("researchDevelopment", router.locale)}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-10">
              {productTypes.map((type) => {
                const isActive =
                  selectedTypes.findIndex((i) => i === type) >= 0;
                return (
                  <button
                    key={type}
                    onClick={() => {
                      const index = selectedTypes.findIndex((i) => i === type);
                      if (index >= 0) {
                        if (type === "all") {
                          setSelectedTypes([]);
                          return;
                        }
                        const newSelectedTypes = [...selectedTypes].splice(
                          index,
                          1
                        );
                        setSelectedTypes(newSelectedTypes);
                      } else {
                        if (type === "all") {
                          setSelectedTypes([...productTypes]);
                          return;
                        }
                        let newSelectedTypes = [...selectedTypes, type];
                        const allTypesSelected = productTypes
                          .filter((i) => i !== "all")
                          .every(
                            (i) =>
                              newSelectedTypes.findIndex(
                                (item) => i === item
                              ) >= 0
                          );
                        if (allTypesSelected) {
                          newSelectedTypes = ["all", ...newSelectedTypes];
                        }
                        setSelectedTypes(newSelectedTypes);
                      }
                    }}
                    className={`${
                      isActive
                        ? "bg-primary text-white te hover:bg-white hover:text-black"
                        : "hover:bg-primary hover:text-white bg-white text-black"
                    } transition-all border-[1px] border-black px-6 py-2 rounded-full`}
                  >
                    {getProductTypeLabel(type, router.locale)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-5 mx-10">
          <Select
            value={selectedSortOption}
            onValueChange={setSelectedSortOption}
          >
            <SelectTrigger className="w-[150px] font-medium text-md">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectItem value="az">
                  {getTranslation("sortAZ", router.locale)}
                </SelectItem>
                <SelectItem value="za">
                  {getTranslation("sortZA", router.locale)}
                </SelectItem>
                <SelectItem value="featured">
                  {getTranslation("sortFeatured", router.locale)}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8 mt-5">
          {sortedProducts
            .filter((product) => isInSelectedTypes(product.type, selectedTypes))
            .map((product) => (
              <Dialog key={product.id}>
                <DialogTrigger>
                  {" "}
                  <a className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={product.images[0].url}
                        alt={product.description}
                        className="h-full w-full bg-white object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-2 font-semibold text-[1.2rem] text-gray-400 hover:text-gray-900">
                      {product.title} {product.titleXd}
                    </h3>
                    {/* <p className='mt-1 text-lg font-medium text-gray-900'>
                      $48
                    </p> */}
                  </a>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>
                      {getTranslation("disclaimer", router.locale)}
                    </DialogTitle>
                    <DialogDescription className="w-30% font-regular">
                      <p>
                        {getTranslation("websiteDisclaimer", router.locale)}
                      </p>
                      <div className="flex justify-center mt-4 space-x-4 text-white">
                        <Button
                          onClick={() =>
                            router.push(
                              `/product/type/${product.type}/${product.slug}`
                            )
                          }
                        >
                          {getTranslation("confirmButton", router.locale)}
                        </Button>
                        <DialogClose asChild>
                          <Button>
                            {getTranslation("backButton", router.locale)}
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
        </div>
      </div>
    </div>
  );
};

function getProductTypeLabel(productTypes, locale = "en") {
  return getTranslation(productTypes, locale);
}
function isInSelectedTypes(productTypes, selectedTypes) {
  return productTypes.some(
    (type) => selectedTypes.findIndex((i) => i === type) >= 0
  );
}

export async function getStaticProps({ params, locale }) {
  try {
    const {
      data: { products, ...rest },
    } = await client.query({
      query: GET_ALL_PRODUCTS,
      fetchPolicy:
        process.env.NODE_ENV === "development" ? "no-cache" : "cache-first",
      variables: {
        locale,
      },
    });

    // Use the function after it's defined or imported
    return {
      props: {
        products: mergeLocalizationsArray(products),
        productTypes: ["all", ...rest.__type.enumValues.map((i) => i.name)],
      },
    };
  } catch (e) {
    throw e;
  }
}

const GET_ALL_PRODUCTS = gql`
  query AllProducts($locale: Locale!) {
    products(first: 10000) {
      id
      isFeatured
      type
      images {
        url
      }
      title
      titleXd
      who
      usage
      summary5
      summary4
      summary3
      summary2
      summary1
      note
      ingredient
      howToUse
      description
      localizations(locales: [$locale]) {
        title
        titleXd
        who
        usage
        summary5
        summary4
        summary3
        summary2
        summary1
        note
        ingredient
        howToUse
        description
      }
    }
    __type(name: "ProductTypes") {
      enumValues {
        name
      }
    }
  }
`;

export default Products;
