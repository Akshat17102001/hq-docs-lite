import Image from 'next/image'
import Link from 'next/link'
import Logo from "../../public/images/logo.png"
import SocialLinks from './social-links'

const Header = () => {
  return (
    <nav className="bg-background flex justify-center lg:justify-between items-center w-full px-4 py-2 border-b border-secondary sticky top-0 z-10 h-10 lg:h-16">
      <Link href="/">
        <Image src={Logo} alt='logo' width={200} height={100} />
      </Link>
      <div className="hidden lg:block">
        <SocialLinks />
      </div>
    </nav>
  )
}

export default Header
