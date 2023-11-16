import { gql } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import client from "../../../../apollo-client";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/Tabs";
import { mergeLocalizations } from "../../../../utils/mergeLocalizations";

const GET_PRODUCT_QUERY = gql`
  query ProductPage($slug: String!, $locale: Locale!) {
    product(where: { slug: $slug }) {
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

const translations = {
  products: {
    en: "Products",
    vi: "Sản phẩm",
  },
  packaging: {
    en: "Packaging",
    vi: "Quy cách đóng gói",
  },
  registrationNumber: {
    en: "Registration Number",
    vi: "Số đăng kiểm",
  },
  classificationByPathology: {
    en: "Classification by Pathology",
    vi: "Phân loại theo bệnh lý",
  },
  ingredients: {
    en: "Ingredients",
    vi: "Thành phần",
  },
  effects: {
    en: "Effects",
    vi: "Công dụng",
  },
  targetUsers: {
    en: "Users",
    vi: "Đối tượng",
  },
  usageInstructions: {
    en: "Dosage/Administration",
    vi: "Hướng dẫn sử dụng",
  },
  notes: {
    en: "Storage/Notes",
    vi: "Bảo quản/Lưu ý",
  },
};

function getTranslation(key, locale = "en") {
  const translation = translations[key][locale] || translations[key]["en"];
  return translation;
}

function extractNumberFromString(text) {
  if (typeof text !== "string") {
    console.error("Invalid input: text must be a string", text);
    return null;
  }
  const matches = text.match(/\d+/);
  return matches ? parseInt(matches[0], 10) : null;
}

export default function Page({ product }) {
  const [currentProduct, setProduct] = useState(product);
  const router = useRouter();
  // const markdownToHtml = (markdown) => {
  //   return { __html: marked(markdown) };
  // };

  //Fluctuate the client viewing number.
  useEffect(() => {
    const originalNumber = extractNumberFromString(currentProduct.summary3);
    if (originalNumber === null) return;

    const rangeMin = originalNumber - 30;
    const rangeMax = originalNumber + 30;

    const intervalId = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 5) - 4; // Random number between -4 and 4
      const newNumber = Math.max(
        Math.min(originalNumber + fluctuation, rangeMax),
        rangeMin
      );

      setProduct((prevProduct) => ({
        ...prevProduct,
        summary3: `Currently, ${newNumber} customers are viewing this product.`,
      }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentProduct.summary3]);

  const formatSummary3 = (summary) => {
    if (!summary) return "";

    const numberMatch = summary.match(/\d+/);
    if (!numberMatch) return summary;

    return (
      <>
        Currently,{" "}
        <span className="font-bold text-lg text-primary">{numberMatch[0]}</span>{" "}
        customers are viewing this product.
      </>
    );
  };

  if (!product) return null;
  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg">
        {" "}
        <div className="w-full">
          <Breadcrumbs
            product={product}
            category={getTranslation("products", router.locale)}
          />
        </div>
        <div className="flex items-start text-[#2f3135] mt-5 ">
          <Image
            className="w-2/5 border rounded-lg shadow-sm"
            src={product?.images?.[0]?.url ?? ""}
            alt={product?.title}
            width={800}
            height={800}
          />
          <div className="flex flex-col px-16">
            <div className="flex flex-col">
              <h2 className="text-[2rem] font-semibold">
                {product.title} {product.titleXd}
              </h2>
              <table className="max-w-4xl divide-y divide-gray-200 rounded-lg">
                <tbody className="bg-white">
                  <tr className="border-b border-gray-300">
                    <td className="pr-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {getTranslation("packaging", router.locale)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {product.description}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="pr-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {getTranslation("registrationNumber", router.locale)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {product.summary1}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="pr-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {getTranslation(
                        "classificationByPathology",
                        router.locale
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {product.summary2}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 className="py-4 font-regular text-gray-900">
                {formatSummary3(product.summary3)}
              </h3>
            </div>
          </div>
        </div>
        <Tabs defaultValue="ingredients" className="max-w-7xl mt-10">
          <TabsList className="">
            {product.ingredient && (
              <TabsTrigger value="ingredients" className="text-[1.1rem]">
                {getTranslation("ingredients", router.locale)}
              </TabsTrigger>
            )}
            {product.usage && (
              <TabsTrigger value="usage" className="text-[1.1rem]">
                {getTranslation("effects", router.locale)}
              </TabsTrigger>
            )}
            {product.who && (
              <TabsTrigger value="who" className="text-[1.1rem]">
                {getTranslation("targetUsers", router.locale)}
              </TabsTrigger>
            )}
            {product.howToUse && (
              <TabsTrigger value="howtoUse" className="text-[1.1rem]">
                {getTranslation("usageInstructions", router.locale)}
              </TabsTrigger>
            )}
            {product.note && (
              <TabsTrigger value="note" className="text-[1.1rem]">
                {getTranslation("notes", router.locale)}
              </TabsTrigger>
            )}
          </TabsList>
          {product.ingredient && (
            <TabsContent
              value="ingredients"
              className="text-[1rem] text-gray-600"
            >
              <TabsContent
                value="ingredients"
                className="text-[1rem] text-gray-600"
              >
                <div
                  className="mt-5"
                  dangerouslySetInnerHTML={{
                    __html: product.ingredient.replace(/\n/g, "<br />"),
                  }}
                ></div>
              </TabsContent>
            </TabsContent>
          )}
          {product.usage && (
            <TabsContent value="usage" className="text-[1rem] text-gray-600">
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{
                  __html: product.usage.replace(/\n/g, "<br />"),
                }}
              ></div>
            </TabsContent>
          )}
          {product.who && (
            <TabsContent value="who" className="text-[1rem] text-gray-600">
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{
                  __html: product.who.replace(/\n/g, "<br />"),
                }}
              ></div>
            </TabsContent>
          )}
          {product.howToUse && (
            <TabsContent value="howtoUse" className="text-[1rem] text-gray-600">
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{
                  __html: product.howToUse.replace(/\n/g, "<br />"),
                }}
              ></div>
            </TabsContent>
          )}
          {product.note && (
            <TabsContent value="note" className="text-[1rem] text-gray-600">
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{
                  __html: product.note.replace(/\n/g, "<br />"),
                }}
              ></div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

export async function getStaticProps({ params, locale }) {
  try {
    const {
      data: { product },
    } = await client.query({
      query: GET_PRODUCT_QUERY,
      variables: { slug: params.slug, locale },
      fetchPolicy:
        process.env.NODE_ENV === "development" ? "no-cache" : "cache-first",
    });

    return {
      props: {
        product: mergeLocalizations(product),
      },
    };
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));
  }
}

export async function getStaticPaths() {
  const response = await client.query({
    query: gql`
      query AllProducts {
        products(first: 10000) {
          id
          type
          slug
        }
      }
    `,
  });

  if (!response || !response.data || !response.data.products) {
    console.error("Query did not return expected data:", response);
    return { paths: [], fallback: false };
  }

  const paths = ["vi", "en"].flatMap((locale) =>
    response.data.products
      .filter((product) => product.type.length && product.slug != null)
      .map((product) => ({
        params: { slug: product.slug, productType: product.type[0] },
        locale,
      }))
  );

  return { paths, fallback: false };
}
