import { useFetchFreeProducts } from "@/api/queryFunctions/freeProducts";
import { useFetchProducts } from "@/api/queryFunctions/products";
import appendImageFromAPI from "@/utils/appendImageFromAPI";
import {
  Accordion,
  Box,
  Center,
  Grid,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { BsArrowDownRight } from "@react-icons/all-files/bs/BsArrowDownRight";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HomeTitle from "../HomeTitle";

const FreeProducts = () => {
  const { data: freeProducts } = useFetchFreeProducts();

  return (
    <Box>
      <Center>
        <HomeTitle style={{ textAlign: "center" }}>Phần mềm miễn phí</HomeTitle>
      </Center>
      <Box></Box>

      <Box>
        <Accordion
          chevron={<BsArrowDownRight color="#1498D5" />}
          styles={(theme) => ({
            item: {
              borderRadius: 13,
              border: "1px solid var(--color-primary)",

              transition: "0.3s",
              cursor: "pointer",
              "&:hover": {
                background: "#F1FFFE",
              },
              "&[data-active] h5": {
                color: "#1498D5",
              },
            },
            control: {
              transition: "0.3s",
              padding: "10px 20px",
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                padding: "15px 22px 15px 8px",
                fontSize: 16,
              },
              borderRadius: 13,
              "&:hover": {
                background: "#F1FFFE",
              },
            },
            chevron: {
              "&[data-rotate]": {
                transform: "rotate(-90deg)",
              },
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                maxHeight: 14,
                maxWidth: 14,
              },
            },
            label: {
              fontWeight: 600,
              color: "#001529",
            },
            content: {
              padding: "0 30px 15px ",
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                padding: "0 22px 15px 8px ",
              },
              fontSize: 15,
              color: "#001529",
            },
          })}
        >
          <Grid gutter={"md"}>
            {Boolean(freeProducts?.data?.length) &&
              freeProducts?.data?.map((product) => (
                <Grid.Col xs={12} md={6} key={product.id}>
                  <Accordion.Item value={product.attributes.siteName}>
                    <Accordion.Control>
                      <Group
                        noWrap={true}
                        spacing="xs"
                        sx={{
                          "& h5": {
                            transition: "var(--transition)",
                          },
                          "&:hover": {
                            h5: {
                              color: "#1498D5",
                            },
                          },
                        }}
                      >
                        <Image
                          src={appendImageFromAPI(
                            product.attributes?.siteIcon?.data?.attributes?.url
                          )}
                          alt="FreeProduct"
                          width={32}
                          height={32}
                        />
                        <Title order={5} color="#646464" size={14}>
                          {product.attributes.siteName}
                        </Title>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Box>
                        <Text size={14} color="#767676">
                          {product.attributes.siteDescription}
                        </Text>
                        <Link
                          href={`/product/${product.attributes.siteSlug}_${product.id}`}
                        >
                          <Text underline color="#50c594">
                            Xem thêm
                          </Text>
                        </Link>
                      </Box>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Grid.Col>
              ))}
          </Grid>
        </Accordion>
      </Box>
    </Box>
  );
};

export default FreeProducts;
