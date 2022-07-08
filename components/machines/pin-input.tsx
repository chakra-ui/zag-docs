import { HStack } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import * as pinInput from "@zag-js/pin-input"
import { normalizeProps, useMachine, useSetup } from "@zag-js/react"

export function PinInput(props: any) {
  const [state, send] = useMachine(pinInput.machine, {
    context: props.controls,
  })
  const ref = useSetup({ send, id: "1" })
  const api = pinInput.connect(state, send, normalizeProps)

  return (
    <div>
      <HStack ref={ref} mb="4" {...api.rootProps}>
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
