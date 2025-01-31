import Image from 'next/image'
import Link from 'next/link'
import Logo from "../../public/images/logo.png"
import SocialLinks from './social-links'

const Header = () => {
  return (
    <nav className="
      bg-white 
      dark:bg-gray-900 
      backdrop-blur-sm 
      bg-opacity-80 
      dark:bg-opacity-80 
      border-b 
      border-gray-200 
      dark:border-gray-800 
      sticky 
      top-0 
      z-50 
      transition-all 
      duration-200
    ">
      <div className="
        max-w-7xl 
        mx-auto 
        px-4 
        sm:px-6 
        lg:px-8
      ">
        <div className="
          flex 
          justify-between 
          items-center 
          h-16
        ">
          <Link 
            href="/" 
            className="
              flex-shrink-0 
              flex 
              items-center 
              hover:opacity-90 
              transition-opacity
            "
          >
            <Image 
              src={Logo} 
              alt='logo' 
              width={180} 
              height={100} 
              className="object-contain"
            />
          </Link>

          <div className="
            hidden 
            lg:flex 
            items-center 
            space-x-6
          ">
            <SocialLinks />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
