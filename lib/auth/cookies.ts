import { cookies } from "next/headers";

export const setAuthCookies = (access: string, refresh: string) => {
	cookies().set("access_token", access, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	});

	cookies().set("refresh_token", refresh, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	});
};

export const clearAuthCookies = () => {
	cookies().delete("access_token");
	cookies().delete("refresh_token");
};
