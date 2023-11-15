import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import client from '../../../../apollo-client';
import { Button } from '../../../../components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/Dialog';

const translations = {
  products: {
    en: 'PRODUCTS',
    vi: 'SẢN PHẨM',
  },
  disclaimer: {
    en: 'DISCLAIMER',
    vi: 'THÔNG BÁO',
  },
  researchDevelopment: {
    en: 'Phuc Vinh Pharmaceuticals deeply researches, develops, and produces its products comprehensively, with a mission to provide the community with high-quality, safe pharmaceuticals that effectively prevent and treat illnesses.',
    vi: 'Sản phẩm của Dược Phúc Vinh được đi sâu nghiên cứu, phát triển và sản xuất một cách toàn diện với sứ mệnh: Mang đến cho cộng đồng những dược phẩm chất lượng, an toàn, có tác dụng phòng và trị bệnh cao.',
  },
  websiteDisclaimer: {
    en: 'All information on this website is for reference only. Please confirm you are a pharmacist, doctor, or healthcare professional seeking product information.',
    vi: 'Mọi thông tin trên website chỉ có tính chất tham khảo. Vui lòng xác nhận bạn là dược sĩ, bác sĩ & nhân viên y tế có nhu cầu tìm hiểu thông tin sản phẩm.',
  },
  confirmButton: {
    en: 'Confirm',
    vi: 'Xác nhận',
  },
  backButton: {
    en: 'Back',
    vi: 'Quay lại',
  },
};

function getTranslation(key, locale = 'en') {
  const translation = translations[key][locale] || translations[key]['en'];
  return translation;
}

const Products = ({ products }) => {
  const router = useRouter();
  return (
    <div className='bg-white'>
      <div className='mx-auto w-full'>
        <div className='relative overflow-hidden bg-[#F5F5F5] w-full'>
          <div className='py-16'>
            <div className='relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8'>
              <div className='w-[60%] mx-auto text-center'>
                <h1 className='text-4xl font-black tracking-tight text-gray-900 sm:text-6xl'>
                  {getTranslation('products', router.locale)}
                </h1>
                <p className='mt-6 text-xl text-gray-600'>
                  {getTranslation('researchDevelopment', router.locale)}
                </p>
              </div>
            </div>
            <div className='flex items-center justify-center space-x-4 pt-10'></div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8 mt-5'>
          {products.map((product) => (
            <Dialog key={product.id}>
              <DialogTrigger>
                {' '}
                <>
                  <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                    <img
                      src={product.images[0].url}
                      alt={product.description}
                      className='h-full w-full bg-white object-cover object-center group-hover:opacity-75'
                    />
                  </div>
                  <h3 className='mt-2 font-semibold text-[1.2rem] text-gray-400 hover:text-gray-900'>
                    {product.title}
                  </h3>
                </>
              </DialogTrigger>
              <DialogContent className='bg-white'>
                <DialogHeader>
                  <DialogTitle>
                    {' '}
                    {getTranslation('disclaimer', router.locale)}
                  </DialogTitle>
                  <DialogDescription className='w-30% font-regular'>
                    <p>{getTranslation('websiteDisclaimer', router.locale)}</p>
                    <div className='flex justify-center mt-4 space-x-4 text-white'>
                      <Button
                        onClick={() =>
                          router.push(
                            `/product/type/${router.query.productType}/${product.slug}`
                          )
                        }
                      >
                        {getTranslation('confirmButton', router.locale)}
                      </Button>
                      <DialogClose asChild>
                        <Button>
                          {getTranslation('backButton', router.locale)}
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
        process.env.NODE_ENV === 'development' ? 'no-cache' : 'cache-first',
      variables: {
        type: [params.productType],
        locale,
      },
    });

    return {
      props: {
        products,
      },
    };
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));
  }
}

const GET_ALL_PRODUCTS = gql`
  query AllProducts($type: [ProductTypes!], $locale: Locale!) {
    products(where: { type: $type }) {
      id
      isFeatured
      slug
      images {
        url
      }
      localizations(locales: [$locale]) {
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
      }
    }
  }
`;

export async function getStaticPaths() {
  const data = await client.query({
    query: gql`
      query AllTypes {
        __type(name: "ProductTypes") {
          enumValues {
            name
          }
        }
      }
    `,
  });

  const paths = ['vi', 'en'].flatMap((locale) =>
    data.data.__type.enumValues.map((type) => ({
      params: {
        productType: type.name,
      },
      locale,
    }))
  );

  return {
    paths: [...paths],
    fallback: false,
  };
}

export default Products;
