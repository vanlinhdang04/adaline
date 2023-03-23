import Container from "@/common/MainLayout/Container";
import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

export default function HoTro() {
  const { push } = useRouter();
  React.useEffect(() => {
    push("/ho-tro/ho-tro-khach-hang");
  }, []);
  return (
    <Container>
      <Title>Hỗ trợ</Title>
    </Container>
  );
}
