import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  
  
  return (
    <div className="flex justify-center gap-6 mb-10 w-full text-sm">
        <Link 
            href='/'
        >
            <span className={`${ titleFont.className} font-bold`}>Mister </span>
            <span>| shop </span>
            <span>© {new Date().getFullYear()}</span>

        </Link>

        <Link 
            href='#'
        >Privacy & Legal</Link>

        <Link 
            href='#'
        >Locations</Link>
    </div>
  )
}