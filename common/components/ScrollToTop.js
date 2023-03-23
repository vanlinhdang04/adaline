import { Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import Image from "next/image";
import top from "public/icons/icon_scrolltotop.png";
import React from "react";

export default function ScrollToTop() {
	const [scroll, scrollTo] = useWindowScroll();

	return (
		<Affix position={{ bottom: "18px", right: "26px" }} zIndex={100}>
			<Transition transition="slide-up" mounted={scroll.y > 400}>
				{(transitionStyles) => (
					<div
						onClick={() => scrollTo({ y: 0 })}
						style={{ ...transitionStyles, cursor: "pointer" }}
					>
						<Image src={top} alt="top" width={40} height={40} />
					</div>
				)}
			</Transition>
		</Affix>
	);
}
