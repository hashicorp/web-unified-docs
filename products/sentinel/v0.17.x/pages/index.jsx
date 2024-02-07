export default function IndexPage() {
  return <p>redirecting...</p>
}

IndexPage.getInitialProps = ({ res }) => {
  if (!res || !res.writeHead) return {}
  res.writeHead(302, { Location: '/sentinel' })
  res.end()
}
