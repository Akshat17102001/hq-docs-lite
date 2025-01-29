import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

// import { Container } from './styles';

const SocialLinks = () => {
  return (
    <div className="flex gap-x-2 items-center">
      <div className="hidden lg:block">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default SocialLinks
