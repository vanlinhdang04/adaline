import { Button, Text } from "@mantine/core";
import { IoMdArrowRoundForward } from "@react-icons/all-files/io/IoMdArrowRoundForward";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function BtnShowMore({ children, href }) {
	// const target = href?.indexOf("http") > -1 ? "_blank" : "_self";
	const { locale } = useRouter();
	const label = {
		vi: "Xem thêm",
		en: "Show more",
	};
	return (
		<Link href={href} passHref>
			<Button
				component="a"
				variant="outline"
				mt="sm"
				sx={(theme) => ({
					minHeight: 46,
					minWidth: 154,
					borderRadius: 13,
					borderColor: `${theme.colors.neutral[3]}`,
					borderWidth: 1,
					borderStyle: "solid",
					color: theme.colors.neutral[3],
					fontSize: 14,
					fontWeight: 500,
					transition: "all 700ms ease",
					"&:hover": {
						backgroundColor: theme.fn.darken(theme.colors.accent[2], 0.05),
						color: theme.white,
						borderColor: "transparent",
						borderWidth: 1,
					},

					[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
						backgroundColor: theme.fn.darken(theme.colors.accent[2], 0.05),
						color: theme.white,
						borderColor: "transparent",
						borderWidth: 1,
					},
				})}
				styles={{ rightIcon: { marginLeft: 5 } }}
				rightIcon={<IoMdArrowRoundForward size={26} />}
				// {...etc}
			>
				<Text>{label?.[locale]}</Text>
				{/* <Image src={imgVectors} alt="Vector" width={18} height={14} /> */}
				{children}
			</Button>
		</Link>
	);
}
