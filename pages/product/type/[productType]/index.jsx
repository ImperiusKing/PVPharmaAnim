import { gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import client from "../../../../apollo-client";
import { Button } from "../../../../components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/Dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/Select";
import { mergeLocalizationsArray } from "../../../../utils/mergeLocalizations";

const translations = {
  products: {
    en: "PRODUCTS",
    vi: "SẢN PHẨM",
  },
  disclaimer: {
    en: "DISCLAIMER",
    vi: "THÔNG BÁO",
  },
  researchDevelopment: {
    en: "Phuc Vinh Pharmaceuticals deeply researches, develops, and produces its products comprehensively, with a mission to provide the community with high-quality, safe pharmaceuticals that effectively prevent and treat illnesses.",
    vi: "Sản phẩm của Dược Phúc Vinh được đi sâu nghiên cứu, phát triển và sản xuất một cách toàn diện với sứ mệnh: Mang đến cho cộng đồng những dược phẩm chất lượng, an toàn, có tác dụng phòng và trị bệnh cao.",
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

const Products = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [selectedSortOption, setSelectedSortOption] = useState("az");
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
                <p className="mt-4 text-lg leading-8.5 text-gray-500">
                  {getTranslation("researchDevelopment", router.locale)}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-10"></div>
          </div>
        </div>
        <div className="flex justify-end mt-5 mx-5">
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
          {sortedProducts.map((product) => (
            <Dialog key={product.id}>
              <DialogTrigger>
                {" "}
                <>
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
                </>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>
                    {" "}
                    {getTranslation("disclaimer", router.locale)}
                  </DialogTitle>
                  <DialogDescription className="w-30% font-regular">
                    <p>{getTranslation("websiteDisclaimer", router.locale)}</p>
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

export async function getStaticProps({ params, locale }) {
  try {
    const {
      data: { products },
    } = await client.query({
      query: GET_ALL_PRODUCTS,
      fetchPolicy:
        process.env.NODE_ENV === "development" ? "no-cache" : "cache-first",
      variables: {
        type: [params.productType],
        locale,
      },
    });

    // Use the function after it's defined or imported
    return {
      props: {
        products: mergeLocalizationsArray(products),
      },
    };
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));
    return { props: { products: [] } }; // Return empty array if there is an error
  }
}

const GET_ALL_PRODUCTS = gql`
  query AllProducts($type: [ProductTypes!], $locale: Locale!) {
    products(where: { type: $type }) {
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
      slug
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
  }
`;

export async function getStaticPaths() {
  try {
    const { data } = await client.query({
      query: gql`
        query AllProductTypes {
          __type(name: "ProductTypes") {
            enumValues {
              name
            }
          }
        }
      `,
    });

    if (!data || !data.__type || !data.__type.enumValues) {
      console.error("Failed to fetch product types:", data);
      return { paths: [], fallback: false };
    }

    const paths = data.__type.enumValues.flatMap((type) => {
      if (!type.name) {
        console.warn("Undefined 'name' for type:", type);
        return [];
      }
      return ["vi", "en"].map((locale) => ({
        params: { productType: type.name },
        locale,
      }));
    });

    return { paths, fallback: false };
  } catch (error) {
    console.error("Error in getStaticPaths: ", error);
    return { paths: [], fallback: false };
  }
}

export default Products;
