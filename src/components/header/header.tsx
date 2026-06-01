import './header.css'
import ComponentLink from '../component-link/link'
import Logo from '../logo/logo'

export default async function Header() {
  return (
    <header>
      <div className="wrapper">
        <Logo />
        <ul className="header-nav">
          <li>
            <ComponentLink to="/">Home</ComponentLink>
          </li>
          <li>
            <ComponentLink to="/about">About</ComponentLink>
          </li>
          <li>
            <ComponentLink to="/spelling-choise">Spelling Bee</ComponentLink>
          </li>
          <li>
            <ComponentLink to="/contacts">Contact</ComponentLink>
          </li>
        </ul>
      </div>
    </header>
  )
}
