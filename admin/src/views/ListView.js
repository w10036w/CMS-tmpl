import ViewList from './ViewList'

export default function (opts) {
  return {
    name: `view-list-${opts.name}`,
    render: h => h(ViewList, { props: { opts } })
  }
}