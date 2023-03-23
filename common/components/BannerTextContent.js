import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, List, Text } from "@mantine/core";
import Image from "next/image";
import ListIcon from "public/icons/list-icon.svg";
import BannerHeading from "./Heading/BannerHeading";

function BannerTextContent({ data, children }) {
  const title = getFieldFromFieldId("title", "content_id", data);
  const detail = getFieldFromFieldId("detail", "content_id", data);
  const list = getFieldFromFieldId("list-item", "content_id", data);

  return (
    <Box sx={{}}>
      <BannerHeading>
        {sanitizeDOMData(title?.content_editor || title?.content)}
      </BannerHeading>
      <Text
        weight={400}
        mt={14}
        mb={8}
        sx={(theme) => ({
          fontSize: 20,
          fontStyle: "normal",
          [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            fontSize: 20,
          },
        })}
      >
        {detail?.content}
      </Text>
      <List
        icon={
          <Box sx={{ width: 23, height: 23, marginRight: 14 }}>
            <Image
              src={ListIcon}
              alt="vector Top right"
              width={23}
              height={23}
            />
          </Box>
        }
        sx={(theme) => ({
          fontSize: 20,
          color: theme.colors.neutral[0],
          [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            fontSize: 18,
          },
        })}
        styles={{
          itemWrapper: {
            alignItems: "center !important",
          },
        }}
        mb={16}
      >
        {list
          ?.sort((a, b) => a?.stt - b?.stt)
          ?.map((item, k) => (
            <List.Item key={k}>{item.content}</List.Item>
          ))}
      </List>
      {children}
    </Box>
  );
}

export default BannerTextContent;
