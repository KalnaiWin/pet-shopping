import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";



interface ReturnButtonProps {
    href: string,
    label: string,
    className?: String,
}

export default function ReturnButton( { href, label, className } : ReturnButtonProps ) {
  return (
    <Button className={`${cn(className)}`} size={"sm"} asChild>
        <Link href={href}>
            <ArrowLeftIcon/> {label}
        </Link>
    </Button>
  )
}
