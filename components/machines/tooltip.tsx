import { normalizeProps, useMachine, useSetup } from "@zag-js/react"
import * as tooltip from "@zag-js/tooltip"
import { chakra } from "@chakra-ui/system"
import { Button } from "components/button"
import Portal from "@reach/portal"

export function Tooltip(props) {
  const [state, send] = useMachine(tooltip.machine, { context: props.controls })
  const ref = useSetup<HTMLButtonElement>({ send, id: "1" })
  const api = tooltip.connect(state, send, normalizeProps)

  return (
    <>
      <Button variant="green" size="sm" ref={ref} {...api.triggerProps}>
        Hover me
      </Button>
      <Portal>
        {api.isOpen && (
          <div {...api.positionerProps}>
            <chakra.div
              px="2"
              py="1"
              fontSize="sm"
              bg="gray.700"
              color="white"
              {...api.contentProps}
            >
              Tooltip
            </chakra.div>
          </div>
        )}
      </Portal>
    </>
  )
}
