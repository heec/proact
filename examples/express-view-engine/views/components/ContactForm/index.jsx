import Proact from '@proact/core'
import FormRow from './FormRow'

export default function (props, context) {
  return (
    <form>
      <FormRow label="Email" name="email" />
      <FormRow label="Message" name="message" />
    </form>
  )
}
