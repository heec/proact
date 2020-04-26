import Proact from '@proact/core'

export default function (props, context) {
  const { label, name, value } = props
  return (
    <div class="form-row">
      <label>{label}</label>
      <input name={name} value={value} />
    </div>
  )
}
