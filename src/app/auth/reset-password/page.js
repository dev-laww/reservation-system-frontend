import { NotFound } from "@src/components";
import { ResetPassword as ResetPasswordForm } from "@src/components/forms";

export default function ResetPassword({ searchParams }) {
    const { token } = searchParams;

    if (!token || token.length !== 20) return <NotFound />;

    return  <ResetPasswordForm token={token} />;
}