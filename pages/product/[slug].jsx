import { gql } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import client from '../../apollo-client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/Tabs';

const GET_PRODUCT_QUERY = gql`
  query ProductPage($id: ID!) {
    product(where: { id: $id }) {
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
  const router = useRouter();
  console.log({ product });
  return (
    <div>
      <div className='flex text-black'>
        <Image
          className='w-1/2'
          src={product.images[0].url}
          alt={product.title}
          width={200}
          height={200}
        />
        <div className='w-1/2 flex flex-col px-16'>
          <div className='flex flex-col border-b-[1px] border-secondary pb-4'>
            <h2 className='text-[4rem]'>{product.title}</h2>
            <h3 className='text-[4rem]'>{product.titleXd}</h3>
            <h4 className='mt-2'>{product.description}</h4>
          </div>
          <ul className='list-disc'>
            {product.summary1 ? (
              <li className='list-disc'>{product.summary1}</li>
            ) : null}
            {product.summary2 ? (
              <li className='list-disc'>{product.summary2}</li>
            ) : null}
            {product.summary3 ? (
              <li className='list-disc'>{product.summary3}</li>
            ) : null}
            {product.summary4 ? (
              <li className='list-disc'>{product.summary4}</li>
            ) : null}
            {product.summary5 ? (
              <li className='list-disc'>{product.summary5}</li>
            ) : null}
          </ul>
        </div>
      </div>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList>
          <TabsTrigger value='ingredients'>Thành phần</TabsTrigger>
          <TabsTrigger value='usage'>Công dụng</TabsTrigger>
          <TabsTrigger value='who'>Đối tượng sử dụng</TabsTrigger>
        </TabsList>
        <TabsContent value='ingredients'>{product.ingredient}</TabsContent>
        <TabsContent value='usage'>{product.usage}</TabsContent>
        <TabsContent value='who'>{product.who}</TabsContent>
      </Tabs>
    </div>
  );
}

export async function getStaticProps({ params }) {
  console.log(params.slug);
  const {
    data: { product, ...rest },
    loading,
    error,
  } = await client.query({
    query: GET_PRODUCT_QUERY,
    variables: { id: params.slug },
    fetchPolicy:
      process.env.NODE_ENV === 'development' ? 'no-cache' : 'cache-first',
  });
  console.log(product);
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
        }
      }
    `,
  });

  const paths = data.data.products.map((product) => ({
    params: {
      slug: product.id,
    },
  }));

  return {
    paths: [...paths],
    fallback: false,
  };
}
