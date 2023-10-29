import { Welcome } from "../components/Welcome/Welcome";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/ColorSchemeToggle";

export default async function HomePage() {
    return (
        <>
            <Welcome />
            <ColorSchemeToggle />
        </>
    );
}
