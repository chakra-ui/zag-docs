import * as menu from "@zag-js/menu"
import { normalizeProps, useMachine, useSetup } from "@zag-js/react"
import { chakra } from "@chakra-ui/system"
import Portal from "@reach/portal"
import { Button } from "components/button"

const data = [
  { label: "Edit", value: "edit" },
  { label: "Delete", value: "delete" },
  { label: "Export", value: "export" },
  { label: "Duplicate", value: "duplicate" },
]

export function Menu(props) {
  const [state, send] = useMachine(menu.machine, { context: props.controls })
  const ref = useSetup({ send, id: "1" })
  const api = menu.connect(state, send, normalizeProps)

  return (
    <div ref={ref}>
      <Button size="sm" variant="green" {...api.triggerProps}>
        Actions{" "}
        <chakra.span ml="2" aria-hidden>
          ▾
        </chakra.span>
      </Button>
      <Portal>
        <div {...api.positionerProps}>
          <chakra.ul
            bg="white"
            width="240px"
            padding="2"
            isolation="isolate"
            listStyleType="none"
            shadow="base"
            className="focus-outline"
            {...api.contentProps}
          >
            {data.map((item) => (
              <chakra.li
                px="2"
                py="1"
                cursor="pointer"
                key={item.value}
                _focus={{ bg: "green.200" }}
                {...api.getItemProps({ id: item.value })}
              >
                {item.label}
              </chakra.li>
            ))}
          </chakra.ul>
        </div>
      </Portal>
    </div>
  )
}
