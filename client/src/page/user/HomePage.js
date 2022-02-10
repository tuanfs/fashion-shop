import React from "react";
import HomeSlider from "components/user/body/HomeSlider";
import HomeBanner from "components/user/body/HomeBanner";
import Features from "components/user/body/Features";
import ProductTab from "components/user/product/ProductTab";
import BigBanner from "components/user/body/BigBanner";
import DailyDeal from "components/user/body/DailyDeal";
import BannerSale from "components/user/body/BannerSale";
import LogoBrand from "components/user/body/LogoBrand";
import MetaData from "components/user/layout/MetaData";

export default function HomePage() {
  return (
    <>
      <MetaData title='Trang chủ' />
      <HomeSlider />
      <HomeBanner />
      <Features />
      <ProductTab />
      <BigBanner />
      <DailyDeal />
      <BannerSale />
      <LogoBrand />
    </>
  );
}
