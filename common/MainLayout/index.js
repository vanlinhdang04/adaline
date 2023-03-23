import { createStyles } from "@mantine/core";
import bg from "public/bg.webp";
import React from "react";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "./Footer";
import Header from "./Header";

const useStyles = createStyles((theme) => ({
  headerWrapper: {
    height: "80px",
    width: "100%",

    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    background: "#fff",

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: "47px",
    },
  },

  mainWrapper: {
    width: "100%",
    marginTop: "80px",
    position: "relative",
    minHeight: "calc(100vh - 80px)",
    background: `url(${bg.src})`,
    backgroundRepeat: "repeat",
    backgroundPosition: "left top",
    backgroundSize: "contain",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      marginTop: "47px",
      backgroundImage: "none",
    },
  },
}));

export default function Layout({ children }) {
  const { classes } = useStyles();
  return (
    <div>
      <div className={classes.headerWrapper}>
        <Header />
      </div>
      <main className={classes.mainWrapper}>{children}</main>
      <Footer></Footer>
      <ScrollToTop />
    </div>
  );
}
