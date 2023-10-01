import { gql } from '@apollo/client';
import React from 'react';
import client from '../apollo-client'; // Relative path to apolloClient.js
import PVText from '../public/PV_text.svg';
import testImage from '../public/test.png';

//fonts
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

//framer.motion

//variants
import Image from 'next/image';
import { AwardCarousel } from '../components/home/AwardCarousel';
import { Footer } from '../components/home/Footer';
import { HighlightCarousel } from '../components/home/HighlighCarousel';
import { PartnerCarousel } from '../components/home/PartnerCarousel';
import { Product } from '../components/home/ProductCard';
import { ProductCarousel } from '../components/home/ProductCarousel';
import { WorkCard } from '../components/home/WorkCard';

const Home = ({ page, products, highlights, works, awards }) => {
  return (
    <div className={inter.className}>
      <img
        src='/homepage-cover-1.png'
        className='w-full bg-contain bg-no-repeat aspect-auto'
        alt='hero image'
      />
      {/* Counter */}
      <div
        data-aos='fade-up'
        data-aos-offset='510'
        data-aos-delay='500'
        className='flex mt-4 w-9/10 mx-auto relative'
      >
        <div className='bg-primary w-[60%] pt-[15rem] px-[5rem] text-left flex text-white tracking-wide flex-col justify-start'>
          <h4 className='uppercase font-bold text-[60px] ml-20'>
            {page.heroTitle2}
          </h4>
          <p className='text-white text-[13px] mt-4 font-extralight w-[85%] ml-20'>
            {page.heroText2}
          </p>
          <button className='bg-primary border-white w-fit border-2 mt-12 text-white px-6 py-2 rounded-full ml-20'>
            VỀ CHÚNG TÔI
          </button>
        </div>
        <div className='flex flex-col bg-[#E6E7E8] w-[70%] items-center pb-[14rem] pt-[4rem]'>
          {works.map((work) => (
            <WorkCard
              key={work.id}
              description={work.description}
              descriptionx={work.descriptionx}
              amount={work.amount}
            />
          ))}
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
      <div
        data-aos='fade-up'
        data-aos-offset='510'
        data-aos-delay='500'
        className='w-full bg-white items-center flex flex-col pb-[4rem]'
      >
        <Image
          className='w-[90%] mx-auto mt-[50px]'
          src={PVText}
          alt='Phuc Vinh text'
        />
        <h2 className='uppercase font-bold text-[#414042] text-[45px] mt-[20px]'>
          {page.heroTitle3}
        </h2>
        <p className='text-[#58595b] w-[39%] text-[15px] text-center mt-4'>
          {page.heroText3}
        </p>
      </div>
      {/* Video */}
      <div
        data-aos='fade-up'
        data-aos-offset='510'
        data-aos-delay='500'
        className='flex justify-center mt-4 mb-[6rem]'
      >
        <div
          onClick={(e) => {
            e.currentTarget.nextElementSibling.style.display = 'block';
            e.currentTarget.style.display = 'none';
          }}
        >
          {/* <img src={page.heroBackground3} /> */}
          <img src='/thumbnail.png' />
        </div>
        <div className='hidden'>
          <iframe
            id='video'
            className='w-80%'
            width='1280'
            height='720'
            src='https://www.youtube.com/embed/YUv3xXed5pE'
            title='Giới thiệu về Công ty Cổ phần Dược Phúc Vinh'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {/* Products */}
      <div
        data-aos='fade-up'
        data-aos-offset='510'
        data-aos-delay='500'
        className='flex flex-col items-center space-y-12 mt-8'
      >
        <h4 className='uppercase font-bold text-[#414042] text-[45px]'>
          {page.heroTitle4}
        </h4>
        <div className='w-90% flex mx-auto justify-center gap-[50px] ml-[50px] mr-[50px]'>
          {products.map((product, index) => (
            <Product
              index={index}
              key={product.image.id}
              name={product.title}
              image={product.image.url}
              description={product.description}
            />
          ))}
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
      {/* Highlight */}
      <div
        data-aos='fade-up'
        data-aos-offset='510'
        data-aos-delay='500'
        className='flex flex-col items-center justify-center space-y-12 mt-16'
      >
        <h4 className='uppercase font-bold text-[#414042] text-[45px] mb-10'>
          {page.heroTitle5}
        </h4>
        <HighlightCarousel highlights={highlights} />
        {/* <Link href='/' className='rounded-[2rem] p-[2px] bg-primary'>
          <div className='px-12 py-4 rounded-[2rem] border-2 border-white uppercase text-white font-bold text-[12px]'>
            Về chúng tôi
          </div>
        </Link> */}
      </div>
      {/* History */}
      <div
        data-aos='fade-up'
        data-aos-offset='510'
        data-aos-delay='500'
        className='relative'
      >
        <img
          src='lichsu1.png'
          className='w-full bg-contain bg-no-repeat aspect-auto mt-[80px]'
        ></img>
        <Image
          src={testImage}
          alt='test'
          className='absolute top-[50%] left-[7%] w-[10rem] h-[10rem] z-20'
        />
      </div>
      {/* Awards */}
      <div
        data-aos='fade-up'
        data-aos-offset='510'
        data-aos-delay='500'
        className='flex flex-col pl-[5rem] mt-[6rem]'
      >
        <h4 className='uppercase text-[#414042] text-[45px] font-bold mb-10'>
          {page.heroTitle7}
        </h4>
        <AwardCarousel awards={awards} />
      </div>
      {/* Footer */}
      <Footer />
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

  const products = [
    {
      title: page.dc1Title,
      description: page.dc1Text,
      image: {
        id: page.dc1Background.id,
        width: page.dc1Background.width,
        height: page.dc1Background.height,
        url: page.dc1Background.url,
      },
    },
    {
      title: page.dc2Title,
      description: page.dc2Text,
      image: {
        id: page.dc2Background.id,
        width: page.dc2Background.width,
        height: page.dc2Background.height,
        url: page.dc2Background.url,
      },
    },
    {
      title: page.dc3Title,
      description: page.dc3Text,
      image: {
        id: page.dc3Background.id,
        width: page.dc3Background.width,
        height: page.dc3Background.height,
        url: page.dc3Background.url,
      },
    },
  ];

  const highlights = [
    {
      title: page.sp1Title,
      image: {
        id: page.sp1Background.id,
        url: page.sp1Background.url,
      },
    },
    {
      title: page.sp2Title,
      image: {
        id: page.sp2Background.id,
        url: page.sp2Background.url,
      },
    },
    {
      title: page.sp3Title,
      image: {
        id: page.sp3Background.id,
        url: page.sp3Background.url,
      },
    },
    {
      title: page.sp4Title,
      image: {
        id: page.sp4Background.id,
        url: page.sp4Background.url,
      },
    },
    {
      title: page.sp5Title,
      image: {
        id: page.sp5Background.id,
        url: page.sp5Background.url,
      },
    },
    {
      title: page.sp1Title,
      image: {
        id: page.sp1Background.id + '1',
        url: page.sp1Background.url,
      },
    },
    {
      title: page.sp2Title,
      image: {
        id: page.sp2Background.id + '2',
        url: page.sp2Background.url,
      },
    },
    {
      title: page.sp3Title,
      image: {
        id: page.sp3Background.id + '3',
        url: page.sp3Background.url,
      },
    },
    {
      title: page.sp4Title,
      image: {
        id: page.sp4Background.id + '4',
        url: page.sp4Background.url,
      },
    },
    {
      title: page.sp5Title,
      image: {
        id: page.sp5Background.id + '5',
        url: page.sp5Background.url,
      },
    },
  ];

  const works = [
    {
      id: Math.floor(Math.random() * 10000),
      amount: page.tt1Title,
      description: page.tt1Text,
      descriptionx: page.tt1Textx,
    },
    {
      id: Math.floor(Math.random() * 10000),
      amount: page.tt2Title,
      description: page.tt2Text,
      descriptionx: page.tt2Textx,
    },
    {
      id: Math.floor(Math.random() * 10000),
      amount: page.tt3Title,
      description: page.tt3Text,
      descriptionx: page.tt3Textx,
    },
    {
      id: Math.floor(Math.random() * 10000),
      amount: page.tt4Title,
      description: page.tt4Text,
      descriptionx: page.tt4Textx,
    },
    {
      id: Math.floor(Math.random() * 10000),
      amount: page.tt5Title,
      description: page.tt5Text,
      descriptionx: page.tt5Textx,
    },
  ];

  const awards = [
    {
      title: page.gt1Title,
      image: {
        id: page.gt1Background.id,
        url: page.gt1Background.url,
      },
    },
    {
      title: page.gt2Title,
      image: {
        id: page.gt2Background.id,
        url: page.gt2Background.url,
      },
    },
    {
      title: page.gt3Title,
      image: {
        id: page.gt3Background.id,
        url: page.gt3Background.url,
      },
    },
    {
      title: page.gt4Title,
      image: {
        id: page.gt4Background.id,
        url: page.gt4Background.url,
      },
    },
    {
      title: page.gt5Title,
      image: {
        id: page.gt5Background.id,
        url: page.gt5Background.url,
      },
    },
    {
      title: page.gt6Title,
      image: {
        id: page.gt6Background.id,
        url: page.gt6Background.url,
      },
    },
    {
      title: page.gt7Title,
      image: {
        id: page.gt7Background.id,
        url: page.gt7Background.url,
      },
    },
    {
      title: page.gt8Title,
      image: {
        id: page.gt8Background.id,
        url: page.gt8Background.url,
      },
    },
    {
      title: page.gt9Title,
      image: {
        id: page.gt9Background.id,
        url: page.gt9Background.url,
      },
    },
    {
      title: page.gt10Title,
      image: {
        id: page.gt10Background.id,
        url: page.gt10Background.url,
      },
    },
  ];

  return {
    props: {
      page,
      products,
      highlights,
      works,
      awards,
    },
  };
}

const GET_PAGE_DATA = gql`
  query PageHome {
    page(where: { slug: "home" }) {
      id
      dc1Background {
        id
        width
        height
        size
        url
      }
      dc1Text
      dc1Title
      dc2Background {
        id
        width
        height
        size
        url
      }
      dc2Text
      dc2Title
      dc3Background {
        id
        width
        height
        size
        url
      }
      dc3Text
      dc3Title
      gt1Background {
        id
        width
        height
        size
        url
      }
      gt1Title
      gt2Background {
        id
        width
        height
        size
        url
      }
      gt2Title
      gt3Background {
        id
        width
        height
        size
        url
      }
      gt3Title
      gt4Background {
        id
        width
        height
        size
        url
      }
      gt4Title
      gt5Background {
        id
        width
        height
        size
        url
      }
      gt5Title
      gt6Background {
        id
        width
        height
        size
        url
      }
      gt6Title
      gt7Background {
        id
        width
        height
        size
        url
      }
      gt7Title
      gt8Background {
        id
        width
        height
        size
        url
      }
      gt8Title
      gt9Background {
        id
        width
        height
        size
        url
      }
      gt9Title
      gt10Background {
        id
        width
        height
        size
        url
      }
      gt10Title
      heroBackground {
        id
        width
        height
        size
        url
      }
      heroBackground3 {
        id
        width
        height
        size
        url
      }
      heroBackground6 {
        id
        width
        height
        size
        url
      }
      heroLink
      heroText
      heroText2
      heroText3
      heroTitle
      heroTitle2
      heroTitle3
      heroTitle4
      heroTitle5
      heroTitle6
      heroTitle7
      id
      name
      slug
      sp1Background {
        id
        width
        height
        size
        url
      }
      sp1Title
      sp2Background {
        id
        width
        height
        size
        url
      }
      sp2Title
      sp3Background {
        id
        width
        height
        size
        url
      }
      sp3Title
      sp4Background {
        id
        width
        height
        size
        url
      }
      sp4Title
      sp5Background {
        id
        width
        height
        size
        url
      }
      sp5Title
      tt1Text
      tt1Textx
      tt1Title
      tt2Text
      tt2Textx
      tt2Title
      tt3Text
      tt3Textx
      tt3Title
      tt4Text
      tt4Textx
      tt4Title
      tt5Text
      tt5Textx
      tt5Title
      tt6Text
      tt6Title
    }
  }
`;

export default Home;
