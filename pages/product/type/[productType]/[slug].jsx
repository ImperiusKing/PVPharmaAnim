import { gql } from '@apollo/client';
import Image from 'next/image';
import client from '../../../../apollo-client';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../components/Tabs';

const GET_PRODUCT_QUERY = gql`
  query ProductPage($slug: String!) {
    product(where: { slug: $slug }) {
      id
      isFeatured
      title
      titleXd
      who
      usage
      type
      summary5
      summary4
      summary3
      summary2
      summary1
      note
      ingredient
      howToUse
      description
      images {
        url
      }
    }
  }
`;

export default function Page({ product }) {
  if (!product) return null;
  return (
    <div className='flex flex-col w-full'>
      <div className='max-w-7xl mx-auto p-4 bg-white rounded-lg'>
        {' '}
        <div className='w-full'>
          <Breadcrumbs product={product} />
        </div>
        <div className='flex items-start text-[#2f3135] mt-5 '>
          <Image
            className='w-2/5 border rounded-lg shadow-sm'
            src={product?.images?.[0]?.url ?? ''}
            alt={product?.title}
            width={800}
            height={800}
          />
          <div className='flex flex-col px-16'>
            <div className='flex flex-col'>
              <h2 className='text-[2rem] font-semibold'>
                {product.title} {product.titleXd}
              </h2>
              <table className='max-w-4xl divide-y divide-gray-200 rounded-lg'>
                <tbody className='bg-white'>
                  <tr className='border-b border-gray-300'>
                    <td className='pr-6 py-4 whitespace-nowrap font-medium text-gray-900'>
                      Quy cách đóng gói
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-gray-600'>
                      {product.description}
                    </td>
                  </tr>
                  <tr className='border-b border-gray-300'>
                    <td className='pr-6 py-4 whitespace-nowrap font-medium text-gray-900'>
                      SĐK
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-gray-600'>
                      {product.summary1}
                    </td>
                  </tr>
                  <tr className='border-b border-gray-300'>
                    <td className='pr-6 py-4 whitespace-nowrap font-medium text-gray-900'>
                      Phân loại theo bệnh lý
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-gray-600'>
                      {product.summary2}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 className='py-4 font-regular text-gray-900'>
                {product.summary3}
              </h3>
            </div>
          </div>
        </div>
        <Tabs defaultValue='ingredients' className='max-w-7xl mt-10'>
          <TabsList className=''>
            {product.ingredient && (
              <TabsTrigger value='ingredients' className='text-[1.1rem]'>
                Thành phần
              </TabsTrigger>
            )}
            {product.usage && (
              <TabsTrigger value='usage' className='text-[1.1rem]'>
                Công dụng
              </TabsTrigger>
            )}
            {product.who && (
              <TabsTrigger value='who' className='text-[1.1rem]'>
                Đối tượng
              </TabsTrigger>
            )}
            {product.howToUse && (
              <TabsTrigger value='howtoUse' className='text-[1.1rem]'>
                Hướng dẫn sử dụng
              </TabsTrigger>
            )}
            {product.note && (
              <TabsTrigger value='note' className='text-[1.1rem]'>
                Lưu ý
              </TabsTrigger>
            )}
          </TabsList>
          {product.ingredient && (
            <TabsContent
              value='ingredients'
              className='text-[1rem] text-gray-600'
            >
              <div
                className='mt-5'
                dangerouslySetInnerHTML={{
                  __html: product.ingredient.replace(/\n/g, '<br />'),
                }}
              ></div>
            </TabsContent>
          )}
          {product.usage && (
            <TabsContent value='usage' className='text-[1rem] text-gray-600'>
              <div
                className='mt-5'
                dangerouslySetInnerHTML={{
                  __html: product.usage.replace(/\n/g, '<br />'),
                }}
              ></div>
            </TabsContent>
          )}
          {product.who && (
            <TabsContent value='who' className='text-[1rem] text-gray-600'>
              <div
                className='mt-5'
                dangerouslySetInnerHTML={{
                  __html: product.who.replace(/\n/g, '<br />'),
                }}
              ></div>
            </TabsContent>
          )}
          {product.howToUse && (
            <TabsContent value='howtoUse' className='text-[1rem] text-gray-600'>
              <div
                className='mt-5'
                dangerouslySetInnerHTML={{
                  __html: product.howToUse.replace(/\n/g, '<br />'),
                }}
              ></div>
            </TabsContent>
          )}
          {product.note && (
            <TabsContent value='note' className='text-[1rem] text-gray-600'>
              <div
                className='mt-5'
                dangerouslySetInnerHTML={{
                  __html: product.note.replace(/\n/g, '<br />'),
                }}
              ></div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const {
    data: { product },
  } = await client.query({
    query: GET_PRODUCT_QUERY,
    variables: { slug: params.slug },
    fetchPolicy:
      process.env.NODE_ENV === 'development' ? 'no-cache' : 'cache-first',
  });
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const data = await client.query({
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

  const paths = data.data.products
    .filter((product) => product.type.length && product.slug != null)
    .map((product) => {
      return {
        params: {
          slug: product.slug,
          productType: product.type[0],
        },
      };
    });

  return {
    paths: [...paths],
    fallback: false,
  };
}
