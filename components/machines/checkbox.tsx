import { chakra } from "@chakra-ui/system"
import * as checkbox from "@zag-js/checkbox"
import { useMachine, useSetup } from "@zag-js/react"

type CheckboxProps = {
  controls: {
    indeterminate: boolean
    disabled: boolean
    readonly: boolean
  }
}

export function Checkbox(props: CheckboxProps) {
  const [state, send] = useMachine(checkbox.machine, {
    context: props.controls,
  })

  const ref = useSetup<HTMLLabelElement>({ send, id: "1" })
  const api = checkbox.connect(state, send)

  return (
    <div>
      <chakra.label
        display="flex"
        flexDirection="row-reverse"
        gap="2"
        userSelect="none"
        cursor="pointer"
        fontSize="18"
        _disabled={{
          cursor: "not-allowed",
          opacity: 0.4,
        }}
        _readOnly={{
          cursor: "default",
        }}
        ref={ref}
        {...api.rootProps}
      >
        <span {...api.labelProps}>Checkbox Input</span>
        <input data-peer {...api.inputProps} />
        <chakra.div
          boxSize="25px"
          rounded="md"
          border="solid 2px"
          borderColor="gray.400"
          color="white"
          _hover={{
            bg: "gray.100",
          }}
          _disabled={{
            bg: "gray.400",
            borderColor: "gray.400",
          }}
          _indeterminate={{
            backgroundColor: "white",
            borderColor: "grey",
            color: "grey",
          }}
          _checked={{
            "&:not([data-indeterminate]):not([data-disabled])": {
              bg: "blue.500",
              borderColor: "blue.500",
            },
          }}
          _peerFocusVisible={{
            outline: "2px solid royalblue",
          }}
          {...api.controlProps}
        >
          {api.view === "checked" && (
            <chakra.svg
              viewBox="0 0 24 24"
              fill="currentcolor"
              transform="scale(0.7)"
            >
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            </chakra.svg>
          )}
          {api.view === "mixed" && (
            <chakra.svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="4"
            >
              <line x1="21" x2="3" y1="12" y2="12" />
            </chakra.svg>
          )}
        </chakra.div>
      </chakra.label>
    </div>
  )
}
