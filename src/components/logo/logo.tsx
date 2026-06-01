import Image from 'next/image'
import { getWebsiteInfo } from '../../lib/apiServices'
import Link from 'next/link'
import './logo.css'

async function Logo() {
  const webData = await getWebsiteInfo()
  const logo = webData?.logo

  const isMediaObject = logo && typeof logo === 'object'

  if (!isMediaObject || !logo.url) {
    return (
      <Link className="logo-link" href="/">
        <span className="logo-text">Logo</span>
      </Link>
    )
  }

  return (
    <Link className="logo-link" href="/">
      <Image
        className="header-logo"
        alt={logo.alt || 'logo'}
        src={logo.url}
        width={220}
        height={108}
        priority
      />
    </Link>
  )
}

export default Logo
