import { getSession } from "@utils/http";
import { EditProfile } from "@src/components/forms";

export default async function Profile() {
    const session = await getSession();
    return <EditProfile session={session} />;
}
