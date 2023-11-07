import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

export const fetchData = async (url, options = {}, session = null, formData = false) => {
    if (!formData) {
        options["headers"] = {
            "Content-Type": "application/json",
        };
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            ...(session?.accessToken && {
                Authorization: `Bearer ${session.accessToken}`,
            }),
        },
    });
    const data = await response.json();

    if (
        response.status !== 200 &&
        session?.refreshToken &&
        data.detail === "Invalid token"
    ) {
        const newAccessToken = await fetch(
            `${
                process.env.NEXT_PUBLIC_API_URL || `http://127.0.0.1:8000/api`
            }/auth/refresh`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken: session.refreshToken }),
            }
        );

        if (newAccessToken.status === 200) {
            const newSession = await newAccessToken.json();
            return fetchData(url, options, {
                ...session,
                accessToken: newSession.accessToken,
            });
        }

        return null;
    }

    return data;
};

export const getSession = async () => getServerSession(authOptions);
