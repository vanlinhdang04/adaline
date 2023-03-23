import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box, List, Title } from "@mantine/core";
import Image from "next/image";
import ListIcon from "public/icons/list-icon-straight-arrow-primary.svg";

function InvestmentInfoCard({ title = "", iconUrl = "", list = [] }) {
  return (
    <Box
      px={36}
      py={36}
      sx={(theme) => ({
        border: `1px solid ${theme.colors.neutral[5]}`,
        borderRadius: 13,
        height: "100%",
        transition: "all 0.4s ease",
        [`&:hover`]: {
          transform: "translateY(-18px)",
          boxShadow: `20px 20px 40px rgba(43, 223, 206, 0.3)`,
        },
      })}
    >
      <Box
        sx={() => ({
          width: 53,
          height: 53,
          // padding: 10,
          // backgroundColor: theme.colors.main[5],
          // borderRadius: 7,
          position: "relative",
        })}
      >
        <Image
          src={appendImageUrlFromAPI({
            src: iconUrl,
            size: "s",
          })}
          layout="responsive"
          alt="Icon"
          width={53}
          height={53}
        />
      </Box>
      <Title mb={12} mt={16} order={4}>
        {title}
      </Title>
      <Box>
        <List listStyleType="none">
          {list
            ?.filter((el) => el.content_id === "list-item")
            ?.map((el, index) => (
              <List.Item
                key={index}
                icon={
                  index !== 0 && (
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        marginRight: 4,
                        marginLeft: 2,
                      }}
                    >
                      <Image
                        src={ListIcon}
                        alt="vector Top right"
                        width={14}
                        height={14}
                      />
                    </Box>
                  )
                }
                mb={7}
              >
                {el.content}
              </List.Item>
            ))}
        </List>
      </Box>
    </Box>
  );
}

export default InvestmentInfoCard;
