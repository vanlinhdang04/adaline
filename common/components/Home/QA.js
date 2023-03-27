import IMG from "@/public/images/faq.svg";
import { Accordion, Box, Grid, Text, ThemeIcon, Title } from "@mantine/core";
import { HiOutlinePlus } from "@react-icons/all-files/hi/HiOutlinePlus";
import Image from "next/image";
import React from "react";

const QA = () => {
  return (
    <Box>
      <Grid>
        <Grid.Col xs={12} md={6}>
          <Box
            w={"100%"}
            pr="3rem"
            sx={(theme) => ({
              [theme.fn.smallerThan("md")]: {
                paddingRight: 0,
              },
            })}
          >
            <Image src={IMG} layout="responsive" />
          </Box>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <Box>
            <Box mb={"3rem"}>
              <Box
                component="span"
                pl={"3.75rem"}
                mb="0.5rem"
                pos={"relative"}
                sx={{
                  color: "#50c594",
                  fontSize: "1rem",
                  fontWeight: 500,
                  ["&::after"]: {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: "50px",
                    background: "#50c594",
                    height: "1px",
                    margin: "auto 0",
                  },
                }}
              >
                Câu hỏi
              </Box>
              <Title order={3} weight={500} size={"1.75rem"}>
                Câu hỏi thường gặp
              </Title>
            </Box>
            <Box>
              <Accordion
                defaultValue="qa1"
                styles={{
                  control: {
                    paddingLeft: 0,
                    paddingBottom: 20,
                    paddingTop: 20,
                  },
                  label: {
                    fontSize: "1rem",
                    color: "#2a354f",
                    fontWeight: 500,
                  },
                  content: {
                    fontSize: "1rem",
                    color: "#212529",
                  },
                  chevron: {
                    "&[data-rotate]": {
                      transform: "rotate(225deg)",
                    },
                  },
                }}
                chevron={
                  <ThemeIcon
                    radius={"50%"}
                    color={"rgba(241,72,54,.2)"}
                    size={36}
                  >
                    <HiOutlinePlus color="#f14836" />
                  </ThemeIcon>
                }
              >
                <Accordion.Item value="qa1">
                  <Accordion.Control>
                    Bản online cloud có gì khác biệt?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Dữ liệu được sao lưu định kỳ hàng ngày trên server của
                    Adaline, không sợ bị virus tấn công, sử dụng nhiều máy mà
                    không bị phụ thuộc vào cấu hình máy chủ của khách hàng, có
                    thể kết nối nhiều máy ở các vị trí khác nhau không chung
                    mạng LAN
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="qa2">
                  <Accordion.Control>
                    Bản offline có được sao lưu?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Dữ liệu được sao lưu theo giờ, theo ngày tuỳ vào thiết lập
                    của khách hàng, khách hàng có thể cấu hình để tải bản sao
                    lưu lên Google drive
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="qa3">
                  <Accordion.Control>
                    Bản thương mại có gì khác biệt?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Được Adaline cấp bản quyền phần mềm trọn đời, được hỗ trợ
                    nhanh chóng, được hướng dẫn tới khi khách hàng sử dụng phần
                    mềm thành thạo.
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="qa4">
                  <Accordion.Control>
                    Bản miễn phí có được hỗ trợ?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Adaline vẫn hỗ trợ khách hàng dùng bàn miễn phí nhưng sẽ
                    không được ưu tiên như bản thương mại
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default QA;
