import Proact from '@proact/core'

export default function (props, context) {
  const { title, videoId } = props

  return (
    <div>
      <h4>{title}</h4>
      <div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  )
}
