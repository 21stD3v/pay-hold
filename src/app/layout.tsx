import SessionProvider from "@/components/providers/SessionProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "PayHold - Payment secured. Goods delivered.",
	description:
		"Nigeria's trusted platform for secure online transactions. Buy and sell with confidence.",
	keywords: [
		"escrow",
		"Nigeria",
		"secure payment",
		"online delivery",
		"buyer protection",
		"seller protection",
	],
	authors: [{ name: "PayHold" }],
	creator: "PayHold",
	publisher: "PayHold",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/icon.png",
		shortcut: "/favicon.ico",
	},
	openGraph: {
		type: "website",
		locale: "en_NG",
		url: "https://payhold.ng",
		title: "PayHold - Payment secured. Goods delivered.",
		description: "Nigeria's trusted platform for secure online transactions.",
		siteName: "PayHold",
	},
	twitter: {
		card: "summary_large_image",
		title: "PayHold - Payment secured. Goods delivered.",
		description: "Nigeria's trusted platform for secure online transactions.",
	},
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	themeColor: "#0d4d7d",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	);
}
