import Proact from '@proact/core'

export default function (props, context) {
  const { title, leadText, backgroundImage, fontColor } = props

  return (
    <section
      class="hero"
      style={`background-image: url("${backgroundImage}");color:${fontColor};`}
    >
      <div class="container">
        <h1>{title}</h1>
        <h2>{leadText}</h2>
      </div>
    </section>
  )
}
