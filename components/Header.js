// const Header = () => {
//   return (
//     <header className='flex items-center justify-between p-4 bg-white'>
//       {/* Logo */}
//       <div className='ml-20'>
//
//       </div>

//       {/* Right-justified text elements */}
//       <div className='flex gap-10 mr-20'>
//         <ht className='text-[#414042] text-right'>VỀ CÔNG TY</ht>
//         <ht className='text-[#414042] text-right'>SẢN PHẨM</ht>
//         <ht className='text-[#414042] text-right'>TRUYỀN THÔNG</ht>
//         <ht className='text-[#414042] text-right'>LIÊN HỆ</ht>
//       </div>
//     </header>
//   );
// };

// nav data
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosClose,
  IoMdMenu,
} from 'react-icons/io';

import HeaderButton from './HeaderButton';

export const navData = [
  // { name: 'home', path: '/' },
  {
    name: 'VỀ CHÚNG TÔI',
    path: '/about',
    submenu: true,
    sublinks: [
      { heading: 'Text 1', path: '/about/heading1' },
      { heading: 'Text 2', path: '/about/heading2' },
      { heading: 'Text 3', path: '/about/heading3' },
    ],
  },
  { name: 'SẢN PHẨM', path: '/services', submenu: false },
  { name: 'TRUYỀN THÔNG', path: '/work' },
  // { name: 'testimonials', path: '/testimonials'},
  // { name: 'contact', path: '/contact' },
];

const Header = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuClick = (index) => {
    if (openSubMenu === index) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(index);
    }
  };

  return (
    <nav className='bg-white h-[8rem]'>
      <div className='absolute w-full h-50px top-0 left-0 flex items-center font-medium justify-around'>
        <div className='z-2 p-5 md:w-auto w-full flex justify-between'>
          <Link href='/'>
            <img src='logo.png' alt='Logo' className='md:cursor-pointer h-20' />
          </Link>
          <div
            className='text-3xl text-black md:hidden cursor-pointer'
            onClick={() => setOpen(!open)}
          >
            {open ? <IoIosClose /> : <IoMdMenu />}
          </div>
        </div>
        <div className='flex items-center'>
          <ul className='md:flex hidden uppercase items-center gap-8 text-black'>
            {navData.map((link, index) => (
              <li key={index}>
                <div className='relative'>
                  <div
                    className='py-7 px-3 inline-block cursor-pointer group flex items-center justify-between'
                    onClick={() => handleSubMenuClick(index)}
                  >
                    {link.name}
                    <span className='ml-2'>
                      {openSubMenu === index ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </span>
                  </div>
                  {link.submenu && (
                    <div
                      className='absolute top-full right-0 bg-white border border-gray-300 p-4'
                      style={{
                        display: openSubMenu === index ? 'block' : 'none',
                      }}
                    >
                      {link.sublinks.map((sublink, subindex) => (
                        <div key={subindex}>
                          <Link
                            href={sublink.path}
                            className='py-2 block font-light'
                          >
                            {sublink.heading}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className='md:block hidden'>
            <HeaderButton />
          </div>
        </div>
        {/* Mobile Navigation */}
        <ul
          className={`md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4 text-black duration-500 ${
            open ? 'right-0' : 'right-[-100%]'
          }`}
        >
          {navData.map((link, index) => (
            <li key={index}>
              <Link href={link.path} className='py-7 px-3 inline-block'>
                {link.name}
              </Link>
            </li>
          ))}
          <div className='py-5'>
            <HeaderButton />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
