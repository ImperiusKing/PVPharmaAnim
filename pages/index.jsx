import { gql } from '@apollo/client';

import Lottie from 'lottie-react';
import React, { useState } from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';
import client from '../apollo-client'; // Relative path to apolloClient.js
import PVText from '../public/PV_text.svg';
import History from '../public/lichsu1.png';
import vibrating from '../public/vibrating.json';

//framer.motion
import { motion } from 'framer-motion';

//translation
const translations = {
  aboutUs: {
    en: 'ABOUT US',
    vi: 'VỀ CHÚNG TÔI',
    // Add other languages here if needed
  },
  partners: {
    en: 'Partnering with major pharmaceutical distributors',
    vi: 'Cùng đồng hành với những nhà phân phối thuốc lớn',
  },
  companyIntroduction: {
    en: 'Introducing Phuc Vinh Pharmaceutical Joint Stock Company',
    vi: 'Giới thiệu về Công ty Cổ phần Dược Phúc Vinh',
  },
  softCapsule: {
    en: 'SOFT CAPSULES',
    vi: 'VIÊN NANG MỀM',
  },
  liquidMedicine: {
    en: 'LIQUID MEDICINES',
    vi: 'THUỐC UỐNG DẠNG LỎNG',
  },
  hardCapsule: {
    en: 'HARD CAPSULES',
    vi: 'VIÊN NANG CỨNG',
  },
  lozenge: {
    en: 'LOZENGES',
    vi: 'KẸO',
  },
  blogTitle: {
    en: 'NEWS',
    vi: 'TIN TỨC',
  },
  blogDescription: {
    en: "Explore the latest advancements and news from Phuc Vinh Pharmaceuticals. Stay informed about our cutting-edge research, innovative product developments, and impactful community initiatives. We're committed to enhancing healthcare and well-being with every step we take.",
    vi: 'Khám phá những tin tức mới nhất từ Dược Phúc Vinh. Hãy cập nhật thông tin về nghiên cứu tiên tiến, phát triển sản phẩm sáng tạo và các sáng kiến cộng đồng có ảnh hưởng của chúng tôi. Chúng tôi cam kết nâng cao sức khỏe và phúc lợi cộng đồng qua mỗi bước chúng tôi thực hiện.',
  },
};

const productTypes = [
  'softCapsule',
  'GMP -WHO',
  'ISO',
  'liquidMedicine',
  'hardCapsule',
  'lozenge',
];

function getTranslation(key, locale = 'en') {
  const translation = translations[key][locale] || translations[key]['en'];
  return translation;
}

//animation
const fadeInVariantsUp = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 50 },
};

//fonts
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

//variants
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AwardCarousel } from '../components/home/AwardCarousel';
import { Blog } from '../components/home/Blog';
import { HighlightCarousel } from '../components/home/HighlighCarousel';
import { PartnerCarousel } from '../components/home/PartnerCarousel';
import { Product } from '../components/home/ProductCard';
import { ProductCarousel } from '../components/home/ProductCarousel';
import { WorkCard } from '../components/home/WorkCard';
import { generateData } from '../utils/generatePageData';
import {
  mergeLocalizations,
  mergeLocalizationsArray,
} from '../utils/mergeLocalizations';

const Home = ({ page, products, chains, works, awards, news }) => {
  const router = useRouter();
  const [historyVisible, setHistoryVisible] = useState(false);
  function onChange(isVisible) {
    if (!historyVisible && isVisible) {
      setHistoryVisible(true);
    }
  }

  const topPositions = [
    '31.5%',
    '61%',
    '27%',
    '49%',
    '14%',
    '36.5%',
    '0%',
    '29%',
    '18.5%',
    '3%',
  ];
  const leftPositions = [
    '3.5%',
    '12.5%',
    '18.2%',
    '30.5%',
    '37.5%',
    '46%',
    '54%',
    '65%',
    '74%',
    '82.5%',
  ];

  return (
    <>
      <div className={`${inter.className}`}>
        <img
          src='/homepage-cover-1.png'
          className='w-full bg-contain bg-no-repeat aspect-auto overflow-hidden max-h-[100vh]'
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
              {getTranslation('aboutUs', router.locale)}
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
          <div className='bg-white w-[90%] flex justify-center items-center py-4 absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-lg'>
            <div className='w-[15%] text-[#4D4D4F] text-xl text-center'>
              {getTranslation('partners', router.locale)}
            </div>
            <div className='w-[80%] ml-5'>
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
            <img src='/thumbnail2.png' alt='thumbnail 2' />
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
        {/* Chains */}
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
            {chains.map((chain, index) => (
              <Product
                index={index}
                key={chain.image.id}
                name={chain.title}
                image={chain.image.url}
                description={chain.description}
              />
            ))}
          </div>
          <ProductCarousel
            products={productTypes.map((type) =>
              type === 'GMP -WHO' || type === 'ISO'
                ? type
                : getTranslation(type, router.locale)
            )}
          />
          <ProductCarousel
            products={productTypes.map((type) =>
              type === 'GMP -WHO' || type === 'ISO'
                ? type
                : getTranslation(type, router.locale)
            )}
            direction='rtl'
          />
        </div>
        {/* Blog */}
        <Blog
          title={getTranslation('blogTitle', router.locale)}
          description={getTranslation('blogDescription', router.locale)}
          news={news}
        />
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
          <HighlightCarousel highlights={products} />
        </div>
        {/* History */}
        <ReactVisibilitySensor onChange={onChange} offset={{ top: 50 }}>
          <div className='relative'>
            <Image
              src={History}
              className='w-full bg-contain bg-no-repeat aspect-auto'
              alt='Background Image'
            />
            {topPositions.map((top, index) => {
              const imageNumber = index + 1;
              return (
                historyVisible && (
                  <motion.img
                    key={`h${imageNumber}.png`}
                    src={`h${imageNumber}.png`}
                    alt='test'
                    style={{
                      top,
                      left: leftPositions[index],
                    }}
                    className={`absolute top-[${top}] left-[${leftPositions[index]}] w-[22.5%] h-[41%] z-20`}
                    initial='initial'
                    animate='animate'
                    variants={fadeInVariantsUp}
                    transition={{
                      delay: 0.3 * index,
                      duration: 1,
                      ease: 'easeInOut',
                    }}
                  />
                )
              );
            })}
          </div>
        </ReactVisibilitySensor>
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
        <button className='sticky bottom-0 mr-5 left-[100%] rounded-[50%] w-[5rem] h-[5rem] bg-primary'>
          <a href='tel:18006833' className='flex justify-center items-center'>
            <Lottie
              animationData={vibrating}
              loop
              style={{ width: '9rem' }}
              width={2000}
            />
          </a>
        </button>
      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const {
    data: { page, news, products },
  } = await client.query({
    query: GET_PAGE_DATA,
    variables: {
      locale: context.locale,
    },
  });

  const pageData = mergeLocalizations(page);
  const localizedNews = mergeLocalizationsArray(news);
  const { chains, awards, works } = generateData(pageData);

  return {
    props: {
      page: pageData,
      news: localizedNews,
      chains,
      products,
      works,
      awards,
    },
  };
}

const GET_PAGE_DATA = gql`
  query PageHome($locale: Locale!) {
    page(where: { slug: "home" }) {
      id
      dc1Background {
        id
        width
        height
        size
        url
      }
      dc2Background {
        id
        width
        height
        size
        url
      }
      dc3Background {
        id
        width
        height
        size
        url
      }
      gt1Background {
        id
        width
        height
        size
        url
      }
      gt2Background {
        id
        width
        height
        size
        url
      }
      gt3Background {
        id
        width
        height
        size
        url
      }
      gt4Background {
        id
        width
        height
        size
        url
      }
      gt5Background {
        id
        width
        height
        size
        url
      }
      gt6Background {
        id
        width
        height
        size
        url
      }
      gt7Background {
        id
        width
        height
        size
        url
      }
      gt8Background {
        id
        width
        height
        size
        url
      }
      gt9Background {
        id
        width
        height
        size
        url
      }
      gt10Background {
        id
        width
        height
        size
        url
      }
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
      id
      name
      slug
      dc1Text
      dc1Title
      dc2Text
      dc2Title
      dc3Text
      dc3Title
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
      gt1Title
      gt2Title
      gt3Title
      gt4Title
      gt5Title
      gt6Title
      gt7Title
      gt8Title
      gt9Title
      gt10Title
      localizations(locales: [$locale]) {
        locale
        dc1Text
        dc1Title
        dc2Text
        dc2Title
        dc3Text
        dc3Title
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
        gt1Title
        gt2Title
        gt3Title
        gt4Title
        gt5Title
        gt6Title
        gt7Title
        gt8Title
        gt9Title
        gt10Title
      }
    }
    news(first: 3, orderBy: publishedAt_DESC) {
      publishedAt
      background {
        url
      }
      id
      title
      type
      description
      slug
      localizations(locales: [$locale]) {
        title
        description
      }
    }
    products(where: { isFeatured: true }) {
      id
      title
      images(first: 1) {
        url
        id
      }
      description
    }
  }
`;

export default Home;
