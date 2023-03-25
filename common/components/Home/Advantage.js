import { Box, Center, Grid } from '@mantine/core';
import { FiFolder } from '@react-icons/all-files/fi/FiFolder';
import { FiHeadphones } from '@react-icons/all-files/fi/FiHeadphones';
import { FiMail } from '@react-icons/all-files/fi/FiMail';
import { FiUsers } from '@react-icons/all-files/fi/FiUsers';
import { RiShieldCheckLine } from '@react-icons/all-files/ri/RiShieldCheckLine';
import { VscFile } from '@react-icons/all-files/vsc/VscFile';
import React from 'react';
import AvantageItem from '../AvantageItem';
import HomeTitle from '../HomeTitle';

const Advantage = () => {
  return (
    <Box>
      <Center>
        <HomeTitle>Ưu điểm vượt trội <span className='company-name'>Adaline</span> </HomeTitle>
      </Center>
      <Box>
        <Grid gutter={'md'}>
          <Grid.Col sm={12} md={6} lg={4}>
            <AvantageItem 
                icon={<FiMail size={36}/>} 
                title={'Email mỗi ngày'}
                text={'Hỗ trợ gửi báo cáo doanh thu, nhập hàng, tồn kho qua email của bạn vào cuối ngày'}
              />
          </Grid.Col>
          <Grid.Col sm={12} md={6} lg={4}>
            <AvantageItem 
                icon={<FiHeadphones size={36}/>} 
                title={'Hỗ trợ'}
                text={'Adaline hỗ trợ nhanh chóng qua Ultraview, Zalo, điện thoại, hỗ trợ cả ngày lễ và cuối tuần'}
              />
          </Grid.Col>
          <Grid.Col sm={12} md={6} lg={4}>
            <AvantageItem 
              icon={<RiShieldCheckLine size={36}/>} 
              title={'An toàn'}
              text={'Hỗ trợ kết nối dữ liệu online (dữ liệu đặt trên Adaline) và offline (dữ liệu đặt tại máy của khách hàng)'}
            />
          </Grid.Col>
          <Grid.Col sm={12} md={6} lg={4}>
            <AvantageItem 
              icon={<VscFile size={36}/>} 
              title={'Hướng dẫn sử dụng'}
              text={'Với các video Youtube hướng dẫn đa dạng theo từng quy trình nghiệp vụ, tập tin sử dụng phần mềm với chi tiết từng bước'}
            />
          </Grid.Col>
          <Grid.Col sm={12} md={6} lg={4}>
            <AvantageItem 
              icon={<FiUsers size={36}/>} 
              title={'Đa dạng nghành hàng'}
              text={'Phù hợp với hầu hết nghiệp vụ quản lý các ngành hàng từ cá nhân tới công ty, doanh nghiệp vừa và nhỏ'}
            />
          </Grid.Col>
          <Grid.Col sm={12} md={6} lg={4}>
            <AvantageItem 
              icon={<FiFolder size={36}/>} 
              title={'Viết theo yêu cầu'}
              text={'Với đội ngũ lập trình kinh nghiệp, Adaline sẵn sàng mở rộng tính năng theo yêu cầu nghiệp vụ của khách hàng'}
            />
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  )
}

export default Advantage