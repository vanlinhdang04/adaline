export default function linkChangeLocale(pathname) {
	const link = pathname.split(/(?:\/\[id\]|\/\[slug\])+/);
	return link[0] || "/";
}
