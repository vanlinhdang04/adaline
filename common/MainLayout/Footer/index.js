import { Box } from "@mantine/core";
import Image from "next/image";
import footerbg from "public/images/footer_bg.png";
import Container from "../Container/index";
import Info from "./Components/Info";
import useStyles from "./styles";
export default function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Box
        sx={(theme) => ({
          overflow: "hidden",
          top: 0,

          bottom: 0,
          right: 0,
          position: "absolute",
          zIndex: 1,
          [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            right: 0,
            width: "60%",
            height: "100%",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
              width: 1011,
              height: 917,
            },
          })}
        >
          {/* <Image
            src={footerbg}
            alt={"bg"}
            layout="fill"
            objectFit="cover"
            objectPosition={"right"}
          /> */}
          {/* <Image src={footerbg} alt={"bg"} layout="fill" objectFit="cover" /> */}
        </Box>
      </Box>
      <div className={classes.info}>
        <Container sx={{ width: "100%" }}>
          <Info />
        </Container>
      </div>
    </div>
  );
}
