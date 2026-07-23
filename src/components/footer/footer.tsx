import { Media } from "@/payload-types";
import Logo from "../logo/logo";





export default function Footer({ logo }) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="sm:flex-row sm:justify-center sm:gap-10 bg-slate-100 flex flex-col items-center p-4">
      <Logo image={logo} />
      <p className="sm:text-sm text-xs font-medium">&copy; <span className="text-pink-500">{currentYear}</span> <span className="text-sky-600">Smart Stars</span> все права защищены.</p>
    </div>
  )
}
