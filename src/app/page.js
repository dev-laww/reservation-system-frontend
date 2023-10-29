import { Welcome } from "@components/Welcome/Welcome";
import { ColorSchemeToggle } from "@components/common/ColorSchemeToggle";

export default async function HomePage() {
    return (
        <>
            <Welcome />
            <ColorSchemeToggle />
        </>
    );
}
