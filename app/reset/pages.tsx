import { useRouter } from "next/navigation";

export default function Reset() {
    const router = useRouter();

    return (
        <div className="w-screen h-screen">
            <p onClick={() => {
                sessionStorage.clear();
                router.push("/");
            }}>RESET</p>
        </div>
    )
}