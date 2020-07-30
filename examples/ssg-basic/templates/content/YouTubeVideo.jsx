import Proact from '@proact/core'

export default function (props, context) {
  const { title, videoId } = props

  return (
    <div>
      <h4>{title}</h4>
      <pre>{videoId}</pre>
    </div>
  )
}
