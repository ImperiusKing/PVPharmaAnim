import { gql } from '@apollo/client';
import React from 'react';
import client from '../apollo-client'; // Relative path to apolloClient.js
import PVText from '../public/PV_text.svg';

//fonts
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

//framer.motion

//variants
import Image from 'next/image';
import Link from 'next/link';
import { AwardCarousel } from '../components/home/AwardCarousel';
import { HighlightCarousel } from '../components/home/HighlighCarousel';
import { PartnerCarousel } from '../components/home/PartnerCarousel';
import { Product } from '../components/home/ProductCard';
import { ProductCarousel } from '../components/home/ProductCarousel';

const Home = () => {
  return (
    <div className='mb-[10rem]'>
      <img
        src='/homepage-cover.jpg'
        className='w-full bg-contain bg-no-repeat aspect-auto'
        alt='hero image'
      />
      {/* Counter */}
      <div className='flex mt-4 w-full relative'>
        <div className='bg-primary w-[30%] pt-[8rem] px-[5rem] text-left flex text-white tracking-wide flex-col'>
          <h4 className='uppercase font-bold text-[3rem]'>THÀNH TỰU</h4>
          <p className='text-white mt-4 font-extralight w-[85%]'>
            Trải qua gần 20 năm xây dựng và trưởng thành, Dược PhúcVinh đã có
            những bước tiến vững chãi, ngày càng khẳng định vị thế và uy tín của
            mình trong ngành Dược.
          </p>
          <button className='bg-primary border-white w-fit border-2 mt-12 text-white px-6 py-2 rounded-full'>
            Về chúng tôi
          </button>
        </div>
        <div className='flex flex-col bg-[#E6E7E8] w-[70%] items-center pb-[14rem] pt-[4rem]'>
          <div className='flex w-[40%] items-center space-x-8 border-b-2 border-[#cccdcf] pb-4'>
            <div className='text-[#58595B] font-bold text-[2.5rem]'>20+</div>
            <div className='text-[#58595B] text-[1.3rem] font-extralight w-[14rem] leading-[22px]'>
              Năm đồng hành cùng sức khỏe người Việt
            </div>
          </div>
          <div className='flex w-[40%] items-center space-x-8 border-b-2 border-[#cccdcf] pb-4'>
            <div className='text-[#58595B] font-bold text-[2.5rem]'>500+</div>
            <div className='text-[#58595B] text-[1.3rem] font-extralight w-[14rem] leading-[22px]'>
              Năm đồng hành cùng sức khỏe người Việt
            </div>
          </div>
          <div className='flex w-[40%] items-center space-x-8 border-b-2 border-[#cccdcf] pb-4'>
            <div className='text-[#58595B] font-bold text-[2.5rem]'>10+</div>
            <div className='text-[#58595B] text-[1.3rem] font-extralight w-[14rem] leading-[22px]'>
              Năm đồng hành cùng sức khỏe người Việt
            </div>
          </div>
          <div className='flex w-[40%] items-center space-x-8 border-b-2 border-[#cccdcf] pb-4'>
            <div className='text-[#58595B] font-bold text-[2.5rem]'>300+</div>
            <div className='text-[#58595B] text-[1.3rem] font-extralight w-[14rem] leading-[22px]'>
              Năm đồng hành cùng sức khỏe người Việt
            </div>
          </div>
          <div className='flex w-[40%] items-center space-x-8 border-b-2 border-[#cccdcf] pb-4'>
            <div className='text-[#58595B] font-bold text-[2.5rem]'>500K+</div>
            <div className='text-[#58595B] text-[1.3rem] font-extralight w-[14rem] leading-[22px]'>
              Năm đồng hành cùng sức khỏe người Việt
            </div>
          </div>
          <div className='flex w-[40%] items-center space-x-8 border-b-2 border-[#cccdcf] pb-4'>
            <div className='text-[#58595B] font-bold text-[2.5rem]'>20+</div>
            <div className='text-[#58595B] text-[1.3rem] font-extralight w-[14rem] leading-[22px]'>
              Năm đồng hành cùng sức khỏe người Việt
            </div>
          </div>
        </div>
        <div className='bg-white w-[90%] justify-between items-center px-8 py-4 flex absolute bottom-8 left-[50%] translate-x-[-50%] rounded-lg'>
          <div className='w-[15%] text-[#4D4D4F] text-xl text-center'>
            Cùng đồng hành với những nhà phân phối thuốc lớn
          </div>
          <div className='w-[80%]'>
            <PartnerCarousel />
          </div>
        </div>
      </div>
      {/* Text */}
      <div className='w-full bg-white items-center flex flex-col pb-[4rem]'>
        <Image
          className='w-[80%] mx-auto mt-6'
          src={PVText}
          alt='Phuc Vinh text'
        />
        <h2 className='uppercase font-bold text-[#414042] text-[3rem] mt-6'>
          THƯƠNG HIỆU UY TÍN VÀ CHẤT LƯỢNG
        </h2>
        <p className='text-[#58595b] w-[39%] text-[1.3rem] text-center mt-4'>
          Dược Phúc Vinh đã có những bước tiến vững chãi, ngày càng khẳng định
          vị thế và uy tín trong ngành Dược.
        </p>
      </div>
      {/* Video */}
      <div className='mt-4 mb-[6rem]'>
        <iframe
          className='w-full'
          width='1280'
          height='720'
          src='https://www.youtube.com/embed/qOBoigGLaJ8'
          title='arsenal vs Liverpool 3-2 peter drury commentary highlights and all goas'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen
        ></iframe>
      </div>
      {/* Products */}
      <div className='flex flex-col items-center space-y-12 mt-8'>
        <h4 className='uppercase font-bold text-[#414042] text-4xl'>
          DÂY CHUYỀN NHÀ MÁY SẢN XUẤT
        </h4>
        <div className='w-90% flex mx-auto space-x-8 justify-around'>
          <Product
            name='THUỐC TỪ DƯỢC LIỆU'
            image='/products/product_1.png'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              voluptatem esse maiores aspernatur deserunt nostrum eius
              consequatur qui porro ullam iure'
          />

          <Product
            name='THUỐC TỪ DƯỢC LIỆU'
            image='/products/product_1.png'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              voluptatem esse maiores aspernatur deserunt nostrum eius
              consequatur qui porro ullam iure'
          />

          <Product
            name='THUỐC TỪ DƯỢC LIỆU'
            image='/products/product_1.png'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              voluptatem esse maiores aspernatur deserunt nostrum eius
              consequatur qui porro ullam iure'
          />
        </div>
        <ProductCarousel
          products={[
            'VIÊN NANG MỀM',
            'GMP -WHO',
            'ISO',
            'THUỐC UỐNG DẠNG LỎNG',
            'VIÊN NANG CỨNG',
            'KẸO',
            'VIÊN NANG MỀM',
            'GMP -WHO',
            'ISO',
            'THUỐC UỐNG DẠNG LỎNG',
            'VIÊN NANG CỨNG',
            'KẸO',
          ]}
        />
        <ProductCarousel
          products={[
            'VIÊN NANG MỀM',
            'GMP -WHO',
            'ISO',
            'THUỐC UỐNG DẠNG LỎNG',
            'VIÊN NANG CỨNG',
            'KẸO',
            'VIÊN NANG MỀM',
            'GMP -WHO',
            'ISO',
            'THUỐC UỐNG DẠNG LỎNG',
            'VIÊN NANG CỨNG',
            'KẸO',
          ]}
          direction='rtl'
        />
      </div>
      {/* Highligh */}
      <div className='flex flex-col items-center justify-center space-y-12 mt-16'>
        <h4 className='uppercase font-bold text-[#414042] text-4xl mb-10'>
          SẢN PHẨM TIÊU BIỂU
        </h4>
        <HighlightCarousel
          highlights={[
            {
              title: 'AN TÂM NGỦ NGON PV',
              image: '/highlights/highlight_1.png',
            },
            { title: 'BỔ THẬN PV PLUS', image: '/highlights/highlight_2.png' },
            { title: 'MOTABIC', image: '/highlights/highlight_3.png' },
          ]}
        />
        <Link href='/' className='rounded-[2rem] p-[2px] bg-primary'>
          <div className='px-12 py-4 rounded-[2rem] border-2 border-white uppercase text-white font-bold'>
            Về chúng tôi
          </div>
        </Link>
      </div>
      {/* Awards */}
      <div className='flex flex-col pl-[5rem] mt-[6rem]'>
        <h4 className='uppercase text-[#414042] text-4xl mb-10'>GIẢI THƯỞNG</h4>
        <AwardCarousel
          awards={[
            {
              description:
                'THƯƠNG HIỆU DẪN ĐẦU VIỆT NĂM 2022 DÀNH CHO SẢN PHẨM BỔ THẬN PV PLUS',
              image: '/awards/award_1.png',
            },
            {
              description: 'TOP 10 - NĂM 2012 CHO SẢN PHẨM BỔTHẬN PV',
              image: '/awards/award_2.png',
            },
            {
              description:
                'THỰC PHẨM CHỨC NĂNGVIÊN NANG MỀM SẢN PHẨM UYTÍN CHẤT LƯỢNGVÌ SỨC KHỎE CỘNG ĐỒNG',
              image: '/awards/award_3.png',
            },
            {
              description:
                'CHỨNG NHẬN NHÂNTỐ MỚI THỜI ĐẠI HỒ CHÍ MINHTRAO CHO ÔNGTRẦN MINHVỊNH',
              image: '/awards/award_1.png',
            },
            {
              description:
                'THỰC PHẨM CHỨC NĂNGVIÊN NANG MỀM SẢN PHẨM UYTÍN CHẤT LƯỢNGVÌ SỨC KHỎE CỘNG ĐỒNG',
              image: '/awards/award_3.png',
            },
            {
              description: 'TOP 10 - NĂM 2012 CHO SẢN PHẨM BỔTHẬN PV',
              image: '/awards/award_2.png',
            },
            {
              description: 'TOP 10 - NĂM 2012 CHO SẢN PHẨM BỔTHẬN PV',
              image: '/awards/award_2.png',
            },
            {
              description:
                'THỰC PHẨM CHỨC NĂNGVIÊN NANG MỀM SẢN PHẨM UYTÍN CHẤT LƯỢNGVÌ SỨC KHỎE CỘNG ĐỒNG',
              image: '/awards/award_3.png',
            },
            {
              description:
                'CHỨNG NHẬN NHÂNTỐ MỚI THỜI ĐẠI HỒ CHÍ MINHTRAO CHO ÔNGTRẦN MINHVỊNH',
              image: '/awards/award_1.png',
            },
          ]}
        />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  // Use useQuery hook from @apollo/client to fetch the data in the component
  const {
    data: { page },
    loading,
    error,
  } = await client.query({
    query: GET_PAGE_DATA,
  });
  console.log(page);

  return {
    props: {
      page,
    },
  };
}

const GET_PAGE_DATA = gql`
  query PageHome {
    page(where: { slug: "home" }) {
      heroLink
      heroText
      heroTitle
      id
      name
      slug
      heroBackground {
        width
        url
        height
      }
    }
  }
`;

export default Home;
