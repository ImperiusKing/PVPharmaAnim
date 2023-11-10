import Link from 'next/link';
import React from 'react';
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
import Search from './Search';

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
  { name: 'SẢN PHẨM', path: '/product' },
  { name: 'TIN TỨC', path: '/news' },
  // { name: 'testimonials', path: '/testimonials'},
  // { name: 'contact', path: '/contact' },
];

const Header = () => {
  return (
    <div className='sticky z-10 bg-white w-full h-50px top-0 left-0 flex items-center font-medium justify-around'>
      <div className='z-2 p-5 md:w-auto w-full flex justify-between'>
        <Link href='/'>
          <img src='logo.png' alt='Logo' className='md:cursor-pointer h-20' />
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href='/docs' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Về chúng tôi
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Search />
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href='/product' passHref>
              <NavigationMenuTrigger as='a' legacyBehavior>
                Sản phẩm
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-6 md:w-[200px] lg:w-[200px]'>
                {/* <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li> */}
                <ListItem
                  href='/product/type/thuocDongDuoc'
                  title='Thuốc đông dược'
                >
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem
                  href='/product/type/thuocTanDuoc'
                  title='Thuốc tân dược'
                >
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href='/product/type/TPCN' title='Thực phẩm chức năng'>
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/news' passHref>
              <NavigationMenuTrigger as='a' legacyBehavior>
                Tin tức
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-6 md:w-[200px] lg:w-[200px]'>
                <ListItem
                  href='/news/type/TinTucPhucVinh'
                  title='Tin Phúc Vinh'
                >
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href='/news/type/CamNangYHoc' title='Cẩm nang y học'>
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem
                  href='/news/type/TinTucTuyenDung'
                  title='Tin tức tuyển dụng'
                >
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent focus:text-accent-foreground',
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
