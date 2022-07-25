import { HStack } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import * as pinInput from "@zag-js/pin-input"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"

export function PinInput(props: any) {
  const [state, send] = useMachine(pinInput.machine({ id: useId() }), {
    context: props.controls,
  })

  const api = pinInput.connect(state, send, normalizeProps)

  return (
    <div>
      <HStack mb="4" {...api.rootProps}>
        {[1, 2, 3].map((_, index) => (
          <chakra.input
            bg="white"
            borderWidth="1px"
            width="50px"
            height="50px"
            fontSize="lg"
            textAlign="center"
            key={index}
            {...api.getInputProps({ index })}
          />
        ))}
      </HStack>
      <chakra.button
        bg="white"
        borderWidth="1px"
        px="2"
        onClick={api.clearValue}
      >
        Clear
      </chakra.button>
    </div>
  )
}
