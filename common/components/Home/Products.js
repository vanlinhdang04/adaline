import { useFetchProducts } from "@/api/queryFunctions/products";
import appendImageFromAPI from "@/utils/appendImageFromAPI";
import { Box, Center, Skeleton, Stack, ThemeIcon, Title } from "@mantine/core";
import { RiTShirt2Line } from "@react-icons/all-files/ri/RiTShirt2Line";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HomeTitle from "../HomeTitle";

const Products = () => {
  const { data: products, isLoading } = useFetchProducts();

  return (
    <Box>
      <Center>
        <HomeTitle style={{ textAlign: "center" }}>
          Thiết kế phần mềm chuyên biệt cho từng ngành hàng
        </HomeTitle>
      </Center>

      <Box
        sx={(theme) => ({
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,

          [theme.fn.largerThan("md")]: {
            gridTemplateColumns: "repeat(5, 1fr)",
          },
        })}
      >
        {isLoading ? (
          <Stack align="center" px={16} py={8}>
            <Skeleton width={60} height={60} circle />
            <Skeleton height={16} width="70%" radius="xl" />
          </Stack>
        ) : (
          products?.data?.map((product, index) => (
            <Link
              href={`san-pham/${product.attributes.siteSlug}_${product.id}`}
              passHref
              key={product.id}
            >
              <a>
                <Stack
                  align="center"
                  px={16}
                  py={8}
                  sx={{
                    borderRadius: 8,
                    transition: "var(--transition)",
                    "&:hover": {
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    },
                  }}
                >
                  <ThemeIcon
                    color="var(--color-primary-variant)"
                    radius={"100%"}
                    size={60}
                  >
                    <Image
                      src={appendImageFromAPI(
                        product?.attributes?.siteIcon?.data?.attributes.url
                      )}
                      width={30}
                      height={30}
                    />
                    {/* <RiTShirt2Line color="var(--color-primary)" size={30} /> */}
                  </ThemeIcon>
                  <Title
                    order={6}
                    color="var(--color-black)"
                    weight={500}
                    size={"1rem"}
                    align="center"
                  >
                    {product.attributes.siteName}
                  </Title>
                </Stack>
              </a>
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Products;
