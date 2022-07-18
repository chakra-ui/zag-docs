import * as tagsInput from "@zag-js/tags-input"
import { normalizeProps, useMachine } from "@zag-js/react"
import { chakra } from "@chakra-ui/system"

export function TagsInput(props: any) {
  const [state, send] = useMachine(
    tagsInput.machine({
      id: "1",
      value: ["React", "Vue"],
    }),
    { context: props.controls },
  )

  const api = tagsInput.connect(state, send, normalizeProps)

  return (
    <chakra.div width="400px">
      <chakra.div {...api.rootProps}>
        <label {...api.labelProps}>Enter frameworks:</label>
        <chakra.div
          className="focus-outline"
          bg="white"
          borderWidth="1px"
          mt="2"
          py="2px"
          px="1"
          {...api.controlProps}
        >
          {api.value.map((value, index) => {
            const opt = { index, value }
            return (
              <span key={index}>
                <chakra.div
                  bg="gray.100"
                  px="2"
                  display="inline-block"
                  margin="4px"
                  _selected={{ bg: "green.200" }}
                  _disabled={{ opacity: 0.6 }}
                  {...api.getTagProps(opt)}
                >
                  <span>{value}</span>
                  <chakra.button ml="1" {...api.getTagDeleteButtonProps(opt)}>
                    &#x2715;
                  </chakra.button>
                </chakra.div>
                <chakra.input
                  px="2"
                  width="10"
                  outline="0"
                  {...api.getTagInputProps(opt)}
                />
              </span>
            )
          })}
          <chakra.input
            margin="4px"
            px="2"
            placeholder="Add tag..."
            _focus={{ outline: "0" }}
            {...api.inputProps}
          />
        </chakra.div>
      </chakra.div>
    </chakra.div>
  )
}
