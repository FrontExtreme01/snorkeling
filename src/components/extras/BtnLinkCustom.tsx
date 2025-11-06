import { Link, Button } from "@heroui/react";

interface ButtonProps {
    text: string;
    url: string;
    color?: "primary" | "secondary" | "tertiary";
}

export default function ButtonLinkCustom({ text, url, color}: ButtonProps) {

    const colors = {
        primary: "bg-linear-to-br from-sky-700 via-sky-400 to-cyan-500 text-white font-semibold text-base",
        secondary: "bg-white text-black font-semibold text-base",
        tertiary: "bg-amber-500 text-black text-base",
    }

    return (
        <Button
            as={Link}
            size="lg"
            className={`${color ? colors[color] : colors.primary}`}
            href={url}
            radius="full"
        >
            {text}
        </Button>
    );
}