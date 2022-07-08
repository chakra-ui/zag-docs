import * as editable from "@zag-js/editable"
import { normalizeProps, useMachine, useSetup } from "@zag-js/react"
import { chakra } from "@chakra-ui/system"
import { HStack } from "@chakra-ui/layout"
import { Button } from "components/button"

export function Editable(props: any) {
  const [state, send] = useMachine(editable.machine, {
    context: props.controls,
  })

  const ref = useSetup({ send, id: "1" })
  const api = editable.connect(state, send, normalizeProps)

  return (
    <chakra.div width="300px" ref={ref} {...api.rootProps}>
      <chakra.div mb="3" {...api.areaProps}>
        <chakra.input
          className="focus-outline"
          bg="transparent"
          {...api.inputProps}
        />
        <span {...api.previewProps} />
      </chakra.div>

      <div>
        {!api.isEditing && (
          <Button
            size="sm"
            variant="outline"
            bg="white"
            {...api.editButtonProps}
          >
            Edit
          </Button>
        )}
        {api.isEditing && (
          <HStack>
            <Button size="sm" variant="green" {...api.submitButtonProps}>
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              bg="white"
              {...api.cancelButtonProps}
            >
              Cancel
            </Button>
          </HStack>
        )}
      </div>
    </chakra.div>
  )
}
