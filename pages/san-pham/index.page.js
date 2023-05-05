import Container from "@/common/MainLayout/Container";
import DownloadApp from "@/common/components/DownloadApp";
import DownloadHome from "@/common/components/Home/DownloadHome";
import Products from "@/common/components/Home/Products";
import Line from "@/common/components/Line";
import Features from "@/common/components/Products/Features";
import { Box } from "@mantine/core";
import React from "react";

const SanPham = () => {
  return (
    <Container>
      <Products />
      <Line index={0} />
      <Features />
      <Line index={1} />
      <DownloadHome />
    </Container>
  );
};

export default SanPham;
