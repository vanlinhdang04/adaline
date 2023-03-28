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
  const { data } = useFetchProducts();
  console.log("data", data);

  return (
    <Box>
      <Center>
        <HomeTitle style={{ textAlign: "center" }}>Phần mềm miễn phí</HomeTitle>
      </Center>
      <Box>
        {/* <Grid gutter={"lg"}>
          {data?.map((product) => (
            <Grid.Col xs={12} sm={6} md={4} lg={3} key={product.id}>
              <FreeProductItem product={product} />
            </Grid.Col>
          ))}
        </Grid> */}
      </Box>

      <Box>
        <Accordion
          chevron={
            // <div
            //   style={{
            //     height: "100%",
            //     width: "100%",
            //     maxHeight: isMobile ? 10 : 14,
            //     maxWidth: isMobile ? 10 : 14,

            //     float: "right",
            //   }}
            // >
            //   <Image
            //     src={down}
            //     alt="ss"
            //     layout="responsive"
            //     // height={20}
            //     // width={20}
            //   ></Image>
            // </div>
            <BsArrowDownRight color="#8eb943" />
          }
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
                color: "#8eb943",
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
            {data?.map((product) => (
              <Grid.Col xs={12} md={6} key={product.id}>
                <Accordion.Item value={product.attributes.title}>
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
                            color: "#8eb943",
                          },
                        },
                      }}
                    >
                      <Image
                        src={appendImageFromAPI(
                          product.attributes.favicon.data.attributes.url
                        )}
                        alt="FreeProduct"
                        width={32}
                        height={32}
                      />
                      <Title order={5} color="#646464" size={14}>
                        {product.attributes.title}
                      </Title>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Box>
                      <Text size={14} color="#767676">
                        {product.attributes.description}
                      </Text>
                      <Link
                        href={`/product/${product.attributes.slug}_${product.id}`}
                      >
                        <Text underline color="#8eb943">
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
