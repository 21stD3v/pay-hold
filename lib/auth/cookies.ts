import { cookies } from "next/headers";

export const setAuthCookies = async (access: string, refresh: string) => {
	const cookieStore = await cookies();
	cookieStore.set("access_token", access, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
	});
	cookieStore.set("refresh_token", refresh, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
	});
};
