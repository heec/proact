import Proact from '@proact/core'

export default function (props, context) {
  const { src, alt, caption } = props
  return (
    <figure>
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
