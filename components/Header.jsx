import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './Navigation_Menu';
import Search from './search/Search';

const Header = () => {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState(null);

  useEffect(() => {
    // Set the language based on the router's locale
    setCurrentLanguage(router.locale === 'en' ? 'English 🇺🇸' : 'Tiếng Việt 🇻🇳');
  }, [router.locale]); // Depend on router.locale to update when it changes

  const toggleLanguage = () => {
    setCurrentLanguage(
      currentLanguage === 'Tiếng Việt 🇻🇳' ? 'English 🇺🇸' : 'Tiếng Việt 🇻🇳'
    );
    // You may also want to handle the actual language switching logic here
  };

  return (
    <div className='sticky z-10 bg-white w-full h-50px top-0 left-0 flex items-center font-medium justify-around'>
      <div className='z-2 p-5 md:w-auto w-full flex justify-between'>
        <Link href='/'>
          <img src='/logo.png' alt='Logo' className='md:cursor-pointer h-20' />
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href='/aboutus' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {currentLanguage === 'Tiếng Việt 🇻🇳'
                  ? 'Về Dược Phúc Vinh'
                  : 'About PV Pharmaceutical'}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/product' passHref>
              <NavigationMenuTrigger as='a' legacyBehavior>
                {currentLanguage === 'Tiếng Việt 🇻🇳' ? 'Sản phẩm' : 'Products'}
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <ul className='grid gap-2 p-2 md:w-[150px] lg:w-[150px]'>
                <ListItem
                  href='/product/type/thuocDongDuoc'
                  title='Thuốc đông dược'
                >
                  {/* Re-usable components built using Radix UI and Tailwind CSS. */}
                </ListItem>
                <ListItem
                  href='/product/type/thuocTanDuoc'
                  title='Thuốc tân dược'
                >
                  {/* How to install dependencies and structure your app. */}
                </ListItem>
                <ListItem href='/product/type/TPCN' title='Thực phẩm chức năng'>
                  {/* Styles for headings, paragraphs, lists...etc */}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/news' passHref>
              <NavigationMenuTrigger as='a' legacyBehavior>
                {currentLanguage === 'Tiếng Việt 🇻🇳' ? 'Tin tức' : 'News'}
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <ul className='grid gap-2 p-2 md:w-[150px] lg:w-[150px]'>
                <ListItem
                  href='/news/type/TinTucPhucVinh'
                  title='Tin Phúc Vinh'
                >
                  {/* Re-usable components built using Radix UI and Tailwind CSS. */}
                </ListItem>
                <ListItem href='/news/type/CamNangYHoc' title='Cẩm nang y học'>
                  {/* How to install dependencies and structure your app. */}
                </ListItem>
                <ListItem
                  href='/news/type/TinTucTuyenDung'
                  title='Tin tức tuyển dụng'
                >
                  {/* Styles for headings, paragraphs, lists...etc */}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Search />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger as='a' legacyBehavior>
              {currentLanguage}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-2 p-2 md:w-[120px] lg:w-[120px]'>
                <ListItem
                  href={router.asPath}
                  locale='vi'
                  title='Tiếng Việt 🇻🇳'
                />
                <ListItem href={router.asPath} locale='en' title='English 🇺🇸' />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = React.forwardRef(
  (
    { onClick, title, children, locale, href, className = '', ...props },
    ref
  ) => {
    const router = useRouter();

    const handleClick = (e) => {
      e.preventDefault();
      onClick?.(); // This will now set the current language
      router.push(href, href, { locale });
    };

    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            onClick={handleClick}
            className={cn(
              'block select-none space-y-0 rounded-md p-2.5 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className='text-lg font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-md leading-snug text-muted-foreground text-[#E8E8E8]'>
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export default Header;
