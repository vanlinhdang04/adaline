import { Box, Title } from "@mantine/core";
import React from "react";
import tocbot from "tocbot";

const BlogToc = () => {
  React.useEffect(() => {
    tocbot.init({
      tocSelector: ".js-toc", // Select the wrapper of toc
      contentSelector: ".blog-body", // Select the warpper of contents
      headingSelector: "h2, h3, h4, h5", // Choose the heading tags
      /* Optional 1.
          Enable these if you have a sticky header and adjust the offset value
          */
      headingsOffset: 200,

      scrollSmoothOffset: -100,
      /* Optional 2. 
          Enable this if 'active' class on scroll won't work properly
          */
      // hasInnerContainers: true,
    });
    return () => tocbot.destroy();
  }, []);

  return (
    <Box className="widget-box js-toc-container">
      <Title order={4} mb={20}>
        <Box component="span" className="line"></Box>
        Nội dung
      </Title>
      <Box className="js-toc"></Box>
    </Box>
  );
};

export default BlogToc;
