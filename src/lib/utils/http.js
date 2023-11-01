export const fetchData = async (url, options = {}, session = null) => {
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
            `${process.env.API_URL}/auth/refresh`,
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
