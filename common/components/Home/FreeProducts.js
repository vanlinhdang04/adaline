import { useFetchProducts } from "@/api/queryFunctions/products";
import { Box, Center, Grid } from "@mantine/core";
import React from "react";
import FreeProductItem from "../FreeProductItem";
import HomeTitle from "../HomeTitle";

const FreeProducts = () => {
  const { data } = useFetchProducts();
  console.log("data", data);

  return (
    <Box>
      <Center>
        <HomeTitle style={{ textAlign: "center" }}>
          Thông tin phần mềm miễn phí
        </HomeTitle>
      </Center>
      <Box>
        <Grid gutter={"lg"}>
          {data?.map((product) => (
            <Grid.Col xs={12} sm={6} md={4} lg={3} key={product.id}>
              <FreeProductItem product={product} />
            </Grid.Col>
          ))}
          {/* <Grid.Col xs={12} sm={6} md={4} lg={3}>
            <FreeProductItem />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4} lg={3}>
            <FreeProductItem />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4} lg={3}>
            <FreeProductItem />
          </Grid.Col> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default FreeProducts;
