import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const authUrl =
                    `${process.env.API_URL}/auth` ||
                    `http://localhost:8000/api/auth`;

                console.log(authUrl);

                const response = await fetch(`${authUrl}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                });

                console.log(response);

                const res = await response.json();

                if (!response.ok) return null;

                const { status, message, ...data } = res;

                return data;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => ({ ...token, ...user }),
        session: async ({ session, token }) => {
            const { accessToken, refreshToken, sub, iat, exp, jti, ...user } =
                token;

            session.user = user;
            session.accessToken = accessToken;
            session.refreshToken = refreshToken;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
