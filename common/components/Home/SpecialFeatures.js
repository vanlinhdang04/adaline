import { Box, Center, Grid } from "@mantine/core";
import { AiOutlineCheckCircle } from "@react-icons/all-files/ai/AiOutlineCheckCircle";
import { AiOutlineDashboard } from "@react-icons/all-files/ai/AiOutlineDashboard";
import { BiPaintRoll } from "@react-icons/all-files/bi/BiPaintRoll";
import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
import { HiOutlineCog } from "@react-icons/all-files/hi/HiOutlineCog";
import { VscFile } from "@react-icons/all-files/vsc/VscFile";
import React from "react";
import HomeTitle from "../HomeTitle";
import SpecialFeatureItem from "../SpecialFeatureItem";

const SpecialFeatures = () => {
  return (
    <Box>
      <Center>
        <HomeTitle>Với các tính năng nổi trội</HomeTitle>
      </Center>

      <Box>
        <Grid>
          <Grid.Col sm={12} md={6} lg={4}>
            <SpecialFeatureItem
              icon={<FiUsers size={32} />}
              iconColor={"#4B4B5A"}
              title="Nhập xuất dữ liệu"
              text="Hỗ trợ nhập dữ liệu từ excel, nhập dữ liệu hàng hoá, giá bán từ excel, xuất dữ liệu theo biễu mẫu excel có thể tuỳ chỉnh theo yêu cầu của khách hàng"
            />
          </Grid.Col>
          <Grid.Col sm={12} md={6} lg={4}>
            <SpecialFeatureItem
              icon={<AiOutlineCheckCircle size={32} />}
              iconColor="#FF7800"
              title={"Lịch sử phiếu"}
              text="Dễ dàng xem lại lịch sử của từng phiếu, theo dõi hoạt động của các nhân viên sử dụng phần mềm"
            />
          </Grid.Col>
          <Grid.Col sm={12} md={6} lg={4}>
            <SpecialFeatureItem
              icon={<AiOutlineDashboard size={32} />}
              iconColor="#F14836"
              title={"Dashboard"}
              text="Các biểu đồ thống kê tình hình kinh doanh, thống kê các mặt hàng bán chạy, doanh thu, chi phí..."
            />
          </Grid.Col>
          <Grid.Col sm={12} md={6} lg={4}>
            <SpecialFeatureItem
              icon={<VscFile size={32} />}
              iconColor={"#3e2cea"}
              title="Báo cáo"
              text={
                "Tích hợp mặc định các báo cáo bán hàng, mua hàng, tồn kho, công nợ, sẵn sàng mở rộng các báo cáo theo yêu cầu của khách hàng"
              }
            />
          </Grid.Col>
          <Grid.Col sm={12} md={6} lg={4}>
            <SpecialFeatureItem
              icon={<BiPaintRoll size={32} />}
              iconColor="#25c2e3"
              title={"Tuỳ biến hoá đơn bán hàng"}
              text="Khách hàng dễ dàng mở rộng phiếu bán hàng với việc chỉnh sửa tên hàng, ghi chú"
            />
          </Grid.Col>
          <Grid.Col sm={12} md={6} lg={4}>
            <SpecialFeatureItem
              icon={<HiOutlineCog size={32} />}
              iconColor="#50c594"
              title={"Truy vấn chứng từ"}
              text="Dễ dàng truy vấn các phiếu chứng từ liên quan, từ đơn hàng truy vấn phiếu giao, truy vấn phiếu thu, từ hàng hoá có thể truy vấn các phiếu nhập, xuất, tồn kho tức thời"
            />
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};

export default SpecialFeatures;
