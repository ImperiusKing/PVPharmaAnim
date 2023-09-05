import React from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { gql } from '@apollo/client';
import client from '../apollo-client'; // Relative path to apolloClient.js
import App from './_app'; // Your main application component
import HeaderButton from '../components/HeaderButton';
import PVText from '../public/PV_text.svg';

//fonts
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

//framer.motion
import { motion } from 'framer-motion';

//variants
import { fadeIn } from '../variants';
import Image from 'next/image';

// const Home = ({ page }) => {
//   // const { loading, error, data } = useQuery(GET_PAGE_DATA);

//   // if (loading) return <p>Loading...</p>;
//   // if (error) return <p>Error: {error.message}</p>;

//   // Use the data retrieved from the query here
//   console.log(page);
//   return (
//     <div>
//       <img
//         src={page.heroBackground.url}
//         width={page.heroBackground.width}
//         height={page.heroBackground.height}
//         alt='Hero background'
//       />
//     </div>
//   );
// };

const Home = () => {
  return (
    <div>
      <img
        src='/homepage-cover.jpg'
        className='w-full bg-contain bg-no-repeat aspect-auto'
        alt='hero image'
      />
      {/* Counter */}
      <div className='flex mt-4 w-full'>
        <div className='bg-primary w-[40%] py-[8rem] px-[10rem] text-left flex text-white tracking-wide flex-col'>
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
        <div className='flex flex-col bg-[#E6E7E8] w-[60%] items-center py-[4rem]'>
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
  // if (loading) return { props: { page: [] } };
  // if (error) return { props: { page: [] } };

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
