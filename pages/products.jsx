import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import client from '../apollo-client';
import { Button } from '../components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/Dialog';

const Products = ({ products, productTypes }) => {
  const [selectedTypes, setSelectedTypes] = useState([...productTypes]);

  const router = useRouter();
  return (
    <div className='bg-white'>
      <div className='mx-auto w-full'>
        <div className='relative overflow-hidden bg-[#F5F5F5] w-full'>
          <div className='py-16'>
            <div className='relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8'>
              <div className='w-[60%] mx-auto text-center'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                  SẢN PHẨM
                </h1>
                <p className='mt-6 text-xl text-gray-500'>
                  Sản phẩm của Dược Phúc Vinh được đi sâu nghiên cứu, phát triển và sản xuất một cách toàn diện với sứ mệnh: Mang đến cho cộng đồng những dược phẩm chất lượng, an toàn, có tác dụng phòng và trị bệnh cao.
                </p>
              </div>
            </div>
            <div className='flex items-center justify-center space-x-4 pt-10'>
              {productTypes.map((type) => {
                const isActive =
                  selectedTypes.findIndex((i) => i === type) >= 0;
                return (
                  <button
                    key={type}
                    onClick={() => {
                      const index = selectedTypes.findIndex((i) => i === type);
                      if (index >= 0) {
                        if (type === 'all') {
                          setSelectedTypes([]);
                          return;
                        }
                        const newSelectedTypes = [...selectedTypes].splice(
                          index,
                          1
                        );
                        setSelectedTypes(newSelectedTypes);
                      } else {
                        if (type === 'all') {
                          setSelectedTypes([...productTypes]);
                          return;
                        }
                        let newSelectedTypes = [...selectedTypes, type];
                        const allTypesSelected = productTypes
                          .filter((i) => i !== 'all')
                          .every(
                            (i) =>
                              newSelectedTypes.findIndex(
                                (item) => i === item
                              ) >= 0
                          );
                        if (allTypesSelected) {
                          newSelectedTypes = ['all', ...newSelectedTypes];
                        }
                        setSelectedTypes(newSelectedTypes);
                      }
                    }}
                    className={`${
                      isActive
                        ? 'bg-primary text-white te hover:bg-white hover:text-black'
                        : 'hover:bg-primary hover:text-white bg-white text-black'
                    } transition-all border-[1px] border-black px-6 py-2 rounded-full`}
                  >
                    {getProductTypeLabel(type)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {products
            .filter((product) => isInSelectedTypes(product.type, selectedTypes))
            .map((product) => (
              <Dialog key={product.id}>
                <DialogTrigger>
                  {' '}
                  <a href='#' className='group'>
                    <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                      <img
                        src={product.images[0].url}
                        alt={product.description}
                        className='h-full w-full object-cover object-center group-hover:opacity-75'
                      />
                    </div>
                    <h3 className='mt-4 text-sm text-gray-700'>
                      {product.title}
                    </h3>
                    <p className='mt-1 text-lg font-medium text-gray-900'>
                      $48
                    </p>
                  </a>
                </DialogTrigger>
                <DialogContent className='bg-white'>
                  <DialogHeader>
                    <DialogTitle>THÔNG BÁO</DialogTitle>
                    <DialogDescription className='w-30% font-regular' >
                      <p>
                        Mọi thông tin trên website chỉ có tính chất tham khảo. Vui lòng xác nhận bạn là dược sĩ, bác sĩ & nhân viên y tế có nhu cầu tìm hiểu thông tin sản phẩm
                      </p>
                      <div className='flex justify-center mt-4 space-x-4 text-white'>
                        <Button onClick={() => router.push('/')}>Xác nhận</Button>
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

function getProductTypeLabel(productType) {
  switch (productType) {
    case 'thuocDongDuoc':
      return 'THUỐC ĐÔNG DƯỢC';
    case 'thuocTanDuoc':
      return 'THUỐC TÂN DƯỢC';
    case 'TPCN':
      return 'THỰC PHẨM CHỨC NĂNG';
    case 'all':
      return 'TẤT CẢ';
  }
}

function isInSelectedTypes(productTypes, selectedTypes) {
  return productTypes.some(
    (type) => selectedTypes.findIndex((i) => i === type) >= 0
  );
}
export async function getStaticProps() {
  const {
    data: { products, ...rest },
    loading,
    error,
  } = await client.query({
    query: GET_ALL_PRODUCTS,
  });

  return {
    props: {
      products,
      productTypes: ['all', ...rest.__type.enumValues.map((i) => i.name)],
    },
  };
}

const GET_ALL_PRODUCTS = gql`
  query AllProducts {
    products {
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
    __type(name: "ProductTypes") {
      enumValues {
        name
      }
    }
  }
`;

export default Products;
