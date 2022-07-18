import { normalizeProps, useMachine } from "@zag-js/react"
import * as tabs from "@zag-js/tabs"
import { chakra } from "@chakra-ui/system"

const data = [
  { value: "item-1", label: "Item one", content: "Item one content" },
  { value: "item-2", label: "Item two", content: "Item two content" },
  { value: "item-3", label: "Item three", content: "Item three content" },
]

export function Tabs(props: any) {
  const [state, send] = useMachine(tabs.machine({ id: "1", value: "item-1" }), {
    context: props.controls,
  })

  const api = tabs.connect(state, send, normalizeProps)

  return (
    <chakra.div width="full" maxW="400px" fontSize="sm">
      <chakra.div bg="white" borderBottomWidth="1px" {...api.triggerGroupProps}>
        {data.map((item) => (
          <chakra.button
            py="2"
            px="4"
            borderBottomWidth="2px"
            borderBottomColor="transparent"
            _selected={{
              color: "green.500",
              borderBottomColor: "currentColor",
            }}
            {...api.getTriggerProps({ value: item.value })}
            key={item.value}
          >
            {item.label}
          </chakra.button>
        ))}
      </chakra.div>
      {data.map((item) => (
        <chakra.div
          padding="4"
          bg="white"
          minHeight="20"
          {...api.getContentProps({ value: item.value })}
          key={item.value}
        >
          <p>{item.content}</p>
        </chakra.div>
      ))}
    </chakra.div>
  )
}
