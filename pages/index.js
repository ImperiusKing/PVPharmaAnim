import React from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { gql } from '@apollo/client';
import client from '../apollo-client'; // Relative path to apolloClient.js
import App from '../pages/_app'; // Your main application component
import HeaderButton from '../components/HeaderButton';

//fonts
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100','200','300','400','500','600','700','800'],
})

//framer.motion
import {motion} from 'framer-motion';

//variants
import {fadeIn} from '../variants';

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

const Home =() => {
  return (
    <div className= 'bg - primary/60 h-full'>
      {}
      <div className= ' w-full h-full bg-cover bg-no-repeat' style={{ backgroundImage: 'url("/homepage-cover.jpg")' }}>
        {/* <div className='absolute ml-80 top-1/2 transform -translate-y-1/10'>
          <HeaderButton/>
        </div> */}
        {/* <div className= 'h-full w-[500px] bg-black bg-opacity-80 absolute top-0 left-0 flex flex-col justify-center'> 
          <div className='text-left flex flex-col justify-center xl:pt-20 xl:text-left h-full container mx-auto' style={{ marginLeft: '10px' }}>
            <h1 className='text-white font-inter font-black text-8xl -mt-10 mb-5 whitespace-nowrap'>
              20 NĂM <br /> 1 CHẶNG ĐƯỜNG 
            </h1>
            <p className =' max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className ='flex justify-center xl:hidden relative'>
              <ProjectsBtn />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

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