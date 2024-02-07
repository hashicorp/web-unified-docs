import Subnav from '@hashicorp/react-subnav'
import subnavItems from 'data/subnav'
import { useRouter } from 'next/router'

export default function SentinelSubnav() {
  const router = useRouter()
  return (
    <Subnav
      titleLink={{
        text: 'Sentinel',
        url: '/',
      }}
      ctaLinks={[{ text: 'Download', url: '/sentinel/downloads' }]}
      currentPath={router.pathname}
      menuItemsAlign="right"
      menuItems={subnavItems}
      constrainWidth
    />
  )
}
