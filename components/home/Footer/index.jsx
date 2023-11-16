import Image from "next/image";
import hotline from "../../../public/hotline1.png";
import { VerifiedLogo } from "./VerifiedLogo";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export const Footer = () => {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    setCurrentLanguage(router.locale === "en" ? "en" : "vi");
  }, [router.locale]);
  return (
    <footer className="bg-[#414042] text-white w-full mt-[8rem] pb-8">
      <div className="px-[10%] w-full p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-around">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img
                src="/logo1.png"
                className="h-[50px] mr-3"
                alt="FlowBite Logo"
              />
            </a>
          </div>
          <div>
            <h2 className="mt-6 text-lg font-black text-white uppercase dark:text-white">
              {currentLanguage === "vi"
                ? "VỀ DƯỢC PHÚC VINH"
                : "ABOUT PV PHARMACEUTICAL"}
            </h2>
            <ul className="mt-3 fold-bold text-gray-400 text-[1.15rem]  dark:text-gray-400 flex flex-col space-y-2">
              <li className="">
                <a
                  href="/aboutus"
                  className="text-md font-semibold hover:text-white"
                >
                  {currentLanguage === "vi"
                    ? "Mục tiêu - Sứ mệnh - Giá trị cốt lõi"
                    : "Goals - Missions - Core Values"}
                </a>
              </li>
              <li>
                <a
                  href="/aboutus"
                  className="text-md font-semibold hover:text-white"
                >
                  {currentLanguage === "vi"
                    ? "Lịch sử hình thành và phát triển"
                    : "History of Formation and Development"}
                </a>
              </li>
              <li>
                <a
                  href="/aboutus"
                  className="text-md font-semibold hover:text-white"
                >
                  {currentLanguage === "vi"
                    ? "Hệ thống phân phối"
                    : "Distribution System"}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mt-6 text-lg font-black text-white uppercase dark:text-white">
              {currentLanguage === "vi" ? "SẢN PHẨM" : "PRODUCTS"}
            </h2>
            <ul className="mt-3 fold-bold text-gray-400 text-[1.15rem]  dark:text-gray-400 flex flex-col space-y-2">
              <li className="">
                <a
                  href="/product/type/thuocDongDuoc"
                  className="text-md font-semibold hover:text-white"
                >
                  {currentLanguage === "vi"
                    ? "Thuốc từ dược liệu"
                    : "Traditional Medicines"}
                </a>
              </li>
              <li>
                <a
                  href="/product/type/thuocTanDuoc"
                  className="text-md font-semibold hover:text-white"
                >
                  {currentLanguage === "vi"
                    ? "Thuốc tân dược"
                    : "Modern Medicines"}
                </a>
              </li>
              <li>
                <a
                  href="/product/type/TPCN"
                  className="text-md font-semibold hover:text-white"
                >
                  {currentLanguage === "vi"
                    ? "Thực phẩm bảo vệ sức khỏe"
                    : "Health Supplements"}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mt-6 text-lg font-black text-white uppercase dark:text-white">
              {currentLanguage === "vi" ? "TIN TỨC" : "NEWS"}
            </h2>
            <ul className="mt-3 fold-bold text-gray-400 text-[1.15rem]  dark:text-gray-400 flex flex-col space-y-2">
              <li className="">
                <a
                  href="/news/type/TinTucPhucVinh"
                  className="text-md font-semibold hover:text-white "
                >
                  {currentLanguage === "vi"
                    ? "Tin Phúc Vinh"
                    : "Phúc Vinh News"}
                </a>
              </li>
              <li>
                <a
                  href="/news/type/TinTucTuyenDung"
                  className="text-md font-semibold hover:text-white"
                >
                  {currentLanguage === "vi" ? "Tuyển dụng" : "Recruitment"}
                </a>
              </li>
              <li>
                <a
                  href="/news/type/CamNangYHoc"
                  className="text-md font-semibold hover:text-white"
                >
                  {currentLanguage === "vi"
                    ? "Cẩm nang sức khỏe"
                    : "Health Handbook"}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex mt-6 my-8 space-x-5 sm:justify-center sm:mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white dark:hover:text-white"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.67 39.6602C31.3126 39.6602 39.9399 31.0322 39.9399 20.3896C39.9399 9.74712 31.3126 1.12012 20.67 1.12012C10.0275 1.12012 1.40002 9.74712 1.40002 20.3896C1.40002 31.0322 10.0275 39.6602 20.67 39.6602Z"
                    stroke="white"
                    strokeWidth="0.96"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M12.1099 21.8799C12.1099 21.8799 12.1899 21.8799 12.2199 21.8799C13.7999 21.8799 15.3799 21.8799 16.9699 21.8799C17.0399 21.8799 17.0699 21.8897 17.0699 21.9697C17.0699 22.1897 17.0699 22.4196 17.0699 22.6396C17.0699 22.9796 16.8199 23.2302 16.4799 23.2402C16.3399 23.2402 16.2 23.2402 16.06 23.2402C14.16 23.2402 12.2599 23.2402 10.3699 23.2402C10.2799 23.2402 10.1499 23.2805 10.0999 23.2305C10.0399 23.1705 10.0899 23.0502 10.0799 22.9502C10.0799 22.8202 10.0799 22.6798 10.0999 22.5498C10.1399 22.3198 10.24 22.1204 10.38 21.9404C11.89 20.0704 13.4 18.2001 14.91 16.3301C14.93 16.3101 14.9399 16.2898 14.9599 16.2598C14.9199 16.2398 14.8899 16.25 14.8599 16.25C13.3599 16.25 11.8499 16.25 10.3499 16.25C10.2699 16.25 10.2499 16.2304 10.2499 16.1504C10.2499 15.7204 10.2499 15.3001 10.2499 14.8701C10.2499 14.8001 10.2599 14.7803 10.3299 14.7803C12.5399 14.7803 14.7499 14.7803 16.9499 14.7803C17.0199 14.7803 17.04 14.8004 17.04 14.8604C17.04 15.1504 17.04 15.44 16.92 15.71C16.83 15.92 16.7 16.0895 16.56 16.2695C15.33 17.8095 14.0999 19.3604 12.8699 20.9004C12.6399 21.1904 12.4 21.4903 12.17 21.7803C12.15 21.8003 12.1399 21.8204 12.1099 21.8604V21.8799Z"
                    fill="white"
                  />
                  <path
                    d="M22.67 22.6598C22.47 22.8098 22.26 22.9192 22.04 23.0192C21.76 23.1492 21.46 23.2292 21.16 23.2692C20.97 23.2992 20.7699 23.3095 20.5799 23.2995C20.3699 23.2995 20.1599 23.2596 19.9499 23.2096C19.4799 23.0996 19.05 22.8895 18.67 22.5895C18.2 22.2095 17.8499 21.7394 17.6299 21.1794C17.5199 20.8894 17.44 20.5899 17.42 20.2799C17.34 18.9499 17.8699 17.9201 18.9799 17.1901C19.3999 16.9101 19.8699 16.7696 20.3699 16.7096C20.9399 16.6496 21.49 16.7399 22.02 16.9499C22.22 17.0299 22.4099 17.1294 22.5899 17.2594C22.6099 17.2794 22.64 17.3095 22.67 17.2995C22.69 17.2895 22.67 17.2494 22.68 17.2194C22.68 17.1294 22.68 17.0301 22.68 16.9401C22.68 16.8901 22.6799 16.8698 22.7399 16.8698C23.1499 16.8698 23.5599 16.8698 23.9799 16.8698C24.0599 16.8698 24.04 16.9096 24.04 16.9596C24.04 17.6696 24.04 18.3795 24.04 19.0895C24.04 20.4495 24.04 21.7998 24.04 23.1598C24.04 23.2398 24.0199 23.2694 23.9399 23.2594C23.6799 23.2494 23.43 23.2797 23.17 23.2497C22.93 23.2197 22.7799 23.08 22.6999 22.86C22.6799 22.81 22.66 22.7496 22.67 22.6696V22.6598ZM22.65 19.9997C22.67 18.9597 21.7799 17.9995 20.5999 18.0495C19.6499 18.0995 18.78 18.8799 18.76 19.9899C18.75 21.0399 19.64 21.9901 20.79 21.9401C21.86 21.9001 22.67 21.0097 22.65 19.9997Z"
                    fill="white"
                  />
                  <path
                    d="M30.9599 16.6301C32.8199 16.6401 34.31 18.1504 34.29 19.9904C34.27 21.8304 32.7599 23.32 30.9399 23.3C29.0999 23.28 27.61 21.7804 27.63 19.9504C27.65 18.1104 29.1499 16.6101 30.9699 16.6301H30.9599ZM32.91 19.9807C32.91 18.8907 32.0399 18.0197 30.9499 18.0197C29.8699 18.0197 28.9899 18.9007 28.9899 19.9807C28.9899 21.0607 29.8699 21.9406 30.9499 21.9406C32.0399 21.9406 32.91 21.0707 32.91 19.9807Z"
                    fill="white"
                  />
                  <path
                    d="M26.66 19.0195C26.66 20.3895 26.66 21.7696 26.66 23.1396C26.66 23.2096 26.6501 23.2402 26.5601 23.2402C26.2801 23.2402 26.01 23.2402 25.73 23.2402C25.39 23.2402 25.2 23.0402 25.2 22.7002C25.2 20.0902 25.2 17.4799 25.2 14.8799C25.2 14.8099 25.22 14.79 25.29 14.79C25.72 14.79 26.15 14.79 26.58 14.79C26.65 14.79 26.66 14.8099 26.66 14.8799C26.66 16.2599 26.66 17.6395 26.66 19.0195Z"
                    fill="white"
                  />
                  <path
                    d="M10.4301 4.5C10.4301 4.5 10.44 4.48047 10.45 4.48047C10.45 4.48047 10.4301 4.49 10.4301 4.5Z"
                    fill="white"
                  />
                  <path
                    d="M34.96 32.0098C34.96 32.0098 34.9599 32.0303 34.9399 32.0303C34.9399 32.0203 34.94 32.0098 34.96 32.0098Z"
                    fill="white"
                  />
                  <path
                    d="M37.4301 29.9004C29.7001 37.4004 16.6 34.3605 12.98 32.4805C10.12 34.0205 7.29004 33.1602 7.29004 33.1602L8 33.0195C9.9 30.5695 9.34999 29.5102 8.48999 27.9902C1.06999 13.5802 8.86995 5.61957 12.2 3.05957C5.79995 6.18957 1.39001 12.7699 1.39001 20.3799C1.39001 31.0199 10.02 39.6504 20.66 39.6504C27.84 39.6504 34.11 35.7197 37.42 29.8896L37.4301 29.9004Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-white dark:hover:text-white"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.48 39.6602C31.1225 39.6602 39.75 31.0322 39.75 20.3896C39.75 9.74712 31.1225 1.12012 20.48 1.12012C9.83745 1.12012 1.20996 9.74712 1.20996 20.3896C1.20996 31.0322 9.83745 39.6602 20.48 39.6602Z"
                    stroke="white"
                    strokeWidth="0.96"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M30.8 17.6299C30.8 15.0699 28.73 13 26.17 13H14.34C11.78 13 9.70996 15.0699 9.70996 17.6299V23.1396C9.70996 25.6996 11.78 27.7695 14.34 27.7695H26.17C28.73 27.7695 30.8 25.6996 30.8 23.1396V17.6299ZM23.84 20.7998L18.53 23.4297C18.32 23.5397 17.62 23.3902 17.62 23.1602V17.7695C17.62 17.5295 18.33 17.38 18.54 17.5L23.62 20.2598C23.83 20.3798 24.06 20.6896 23.84 20.8096V20.7998Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-white dark:hover:text-white"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.78 39.6602C30.4226 39.6602 39.05 31.0322 39.05 20.3896C39.05 9.74712 30.4226 1.12012 19.78 1.12012C9.1375 1.12012 0.51001 9.74712 0.51001 20.3896C0.51001 31.0322 9.1375 39.6602 19.78 39.6602Z"
                    stroke="white"
                    strokeWidth="0.96"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M27.39 25.96L28.24 20.3896H22.89V16.7695C22.89 15.2495 23.64 13.7598 26.03 13.7598H28.46V9.01953C28.46 9.01953 26.25 8.63965 24.15 8.63965C19.75 8.63965 16.87 11.3096 16.87 16.1396V20.3896H11.98V25.96H16.87V39.4297C17.85 39.5797 18.86 39.6602 19.88 39.6602C20.9 39.6602 21.91 39.5797 22.89 39.4297V25.96H27.38H27.39Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <VerifiedLogo />
          </div>
        </div>
        <div className="flex items-center mt-[2%] justify-end">
          <div className="sm:flex-shrink-0 ml-auto flex flex-col justify-center items-end w-1/4">
            <h4 className="uppercase text-sm font-bold text-white sm:text-center mr-10"></h4>
          </div>
          <div className="sm:flex mt-10 pl-20 sm:items-center flex-col space-y-2 sm:justify-between w-3/4">
            <h4 className="uppercase text-[1.2rem] font-bold text-white sm:text-center">
              {currentLanguage === "vi"
                ? "CÔNG TY CỔ PHẦN DƯỢC PHÚC VINH"
                : "PV PHARMACEUTICAL JOINT STOCK COMPANY"}
            </h4>
            <p className="text-md text-gray-400 sm:text-center">
              PV Pharmaceutical Joint Stock Company
            </p>
            <div className="flex items-center space-x-2">
              <svg
                width="14"
                height="19"
                viewBox="0 0 14 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.96002 18.0596C6.79002 18.0596 6.62001 17.9904 6.51001 17.8604C6.25001 17.5804 0.0499878 10.8604 0.0499878 7.19043C0.0499878 3.52043 3.15002 0.280273 6.96002 0.280273C10.77 0.280273 13.87 3.38043 13.87 7.19043C13.87 11.0004 7.66997 17.5804 7.40997 17.8604C7.28997 17.9904 7.13002 18.0596 6.96002 18.0596ZM6.96002 1.50977C3.83002 1.50977 1.28003 4.06043 1.28003 7.19043C1.28003 9.63043 5.03002 14.3595 6.96002 16.5195C8.89002 14.3495 12.64 9.63043 12.64 7.19043C12.64 4.06043 10.09 1.50977 6.96002 1.50977Z"
                  fill="white"
                />
                <path
                  d="M6.96002 10C5.24002 10 3.84998 8.59965 3.84998 6.88965C3.84998 5.17965 5.25002 3.78027 6.96002 3.78027C8.67002 3.78027 10.07 5.17965 10.07 6.88965C10.07 8.59965 8.67002 10 6.96002 10ZM6.96002 5.00977C5.93002 5.00977 5.08002 5.84965 5.08002 6.88965C5.08002 7.92965 5.92002 8.76953 6.96002 8.76953C8.00002 8.76953 8.84003 7.92965 8.84003 6.88965C8.84003 5.84965 8.00002 5.00977 6.96002 5.00977Z"
                  fill="white"
                />
              </svg>
              <p className="text-sm text-gray-400 sm:text-center">
                {currentLanguage === "vi"
                  ? "Lô CN4 - 6.2 KCN Thạch Thất - Quốc Oai, xã Phùng Xá, huyện Thạch Thất,TP. Hà Nội."
                  : "Lot CN4 - 6.2 Thach That - Quoc Oai Industrial Park, Phung Xa commune, Thach That district, Hanoi City."}
              </p>
            </div>
          </div>
          <div className="sm:flex-shrink-0 ml-auto flex flex-col justify-center items-end w-1/4">
            <Image src={hotline} alt="Hotline" className="w-[50%] mr-8" />
            <h4 className="uppercase text-sm font-bold text-gray-400 sm:text-center mr-10">
              {currentLanguage === "vi"
                ? "Tổng đài tư vấn miễn phí"
                : "Free Consultation Hotline"}
            </h4>
          </div>
        </div>
      </div>
    </footer>
  );
};
