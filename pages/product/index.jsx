import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
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
import { mergeLocalizationsArray } from "../../utils/mergeLocalizations";

const translations = {
  products: {
    en: "PRODUCTS",
    vi: "SẢN PHẨM",
  },
  pageDescription: {
    en: "Phúc Vinh Pharmaceutical focuses on delivering high-quality, safe, and effective pharmaceuticals for disease prevention and treatment, ensuring community health and well-being.",
    vi: " Sản phẩm của Dược Phúc Vinh được đi sâu nghiên cứu, phát triển và sản xuất một cách toàn diện với sứ mệnh: Mang đến cho cộng đồng những dược phẩm chất lượng, an toàn, có tác dụng phòng và trị bệnh cao.",
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
};

function getTranslation(key, locale = "en") {
  const translation = translations[key][locale] || translations[key]["en"];
  return translation;
}

const Products = ({ products, productTypes }) => {
  const [selectedTypes, setSelectedTypes] = useState([...productTypes]);

  const router = useRouter();
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
                  {getTranslation("pageDescription", router.locale)}
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

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8 mt-5">
          {products
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
                      {product.title}
                    </h3>
                    {/* <p className='mt-1 text-lg font-medium text-gray-900'>
                      $48
                    </p> */}
                  </a>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>THÔNG BÁO</DialogTitle>
                    <DialogDescription className="w-30% font-regular">
                      <p>
                        Mọi thông tin trên website chỉ có tính chất tham khảo.
                        Vui lòng xác nhận bạn là dược sĩ, bác sĩ & nhân viên y
                        tế có nhu cầu tìm hiểu thông tin sản phẩm
                      </p>
                      <div className="flex justify-center mt-4 space-x-4 text-white">
                        <Button
                          onClick={() =>
                            router.push(
                              `/product/type/${product.type}/${product.slug}`
                            )
                          }
                        >
                          Xác nhận
                        </Button>
                        <DialogClose asChild>
                          <Button>Quay lại</Button>
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

function getProductTypeLabel(productType, locale = "en") {
  // Use getTranslation to fetch the label based on the locale
  return getTranslation(productType, locale);
}
function isInSelectedTypes(productTypes, selectedTypes) {
  return productTypes.some(
    (type) => selectedTypes.findIndex((i) => i === type) >= 0
  );
}

export async function getStaticProps({ locale }) {
  try {
    // Fetch all products
    const { data } = await client.query({
      query: GET_ALL_PRODUCTS,
      variables: { locale },
    });

    const productTypesData = await client.query({
      query: GET_PRODUCT_TYPES,
      variables: { locale },
    });

    const productsWithLocalizations = mergeLocalizationsArray(data.products);

    return {
      props: {
        products: productsWithLocalizations,
        productTypes: productTypesData ? productTypesData.productTypes : [],
      },
    };
  } catch (error) {
    console.error("Error during getStaticProps", error);
    return {
      props: {
        products: [],
        productTypes: [],
      },
    };
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
  }
`;

export async function getStaticPaths() {
  // Fetch product types or whatever data you need to generate the paths
  const { data } = await client.query({
    query: gql`
      query AllProductTypes {
        productTypes {
          name
        }
      }
    `,
  });
  // Generate paths based on product types
  const paths = data.productTypes.map((type) => ({
    params: { productType: type.name },
  }));
  return { paths, fallback: false };
}

export default Products;
