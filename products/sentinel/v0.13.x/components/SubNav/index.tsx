import './style.css'
import Link from 'next/link'
import downloadIcon from './img/download.svg?include'

type SecondaryLink = {
  href: string
  text: string
  icon?: string
}
const links: SecondaryLink[] = [
  {
    href: '/sentinel/intro',
    text: 'Intro'
  },
  {
    href: '/sentinel',
    text: 'Docs'
  },
  {
    href: '/sentinel/downloads',
    text: 'Download',
    icon: downloadIcon
  }
]

type Props = {
  path: string
}
export default function SecondaryNav({
  path
}: Props): React.FunctionComponentElement<Props> {
  return (
    <nav id="sub-nav" className="light" role="navigation">
      <div className="g-container">
        <Link href="/sentinel">
          <a className="root-link">
            <ul className="breadcrumbs">
              <li>Docs</li>
              <li className="active">Sentinel</li>
            </ul>
          </a>
        </Link>

        <ul className="doc-links">
          {links.map(function({ href, text, icon }) {
            const temporaryAdjuster =
              !(path.match('/intro') && href === '/sentinel') &&
              !(path.match('/downloads') && href === '/sentinel')
            return (
              <li
                key={text}
                {...(path.indexOf(href) > -1 &&
                  temporaryAdjuster && { className: 'active' })}
              >
                <Link href={href} key={text}>
                  <a>
                    {icon && (
                      <span dangerouslySetInnerHTML={{ __html: icon }} />
                    )}
                    {text}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
