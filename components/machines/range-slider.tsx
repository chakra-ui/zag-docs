import * as slider from "@zag-js/range-slider"
import { normalizeProps, useMachine } from "@zag-js/react"
import { chakra } from "@chakra-ui/system"
import { Center, Flex } from "@chakra-ui/layout"

export function RangeSlider(props: any) {
  const [state, send] = useMachine(
    slider.machine({
      id: "1",
      name: "quantity",
      value: [10, 60],
    }),
    { context: props.controls },
  )

  const api = slider.connect(state, send, normalizeProps)

  return (
    <chakra.div width="200px" {...api.rootProps}>
      <Flex justify="space-between">
        <chakra.label mr="2" {...api.labelProps}>
          Quantity
        </chakra.label>
        <output {...api.outputProps}>
          <b>{api.values.join(" - ")}</b>
        </output>
      </Flex>

      <Flex
        mt="5"
        align="center"
        position="relative"
        py="2.5"
        {...api.controlProps}
      >
        <chakra.div
          height="4px"
          rounded="full"
          flex="1"
          bg="gray.300"
          {...api.trackProps}
        >
          <chakra.div
            height="100%"
            bg="green.500"
            rounded="inherit"
            _disabled={{ bg: "green.200" }}
            {...api.rangeProps}
          />
        </chakra.div>
        {api.values.map((_, index) => (
          <Center
            className="focus-outline"
            boxSize="20px"
            rounded="full"
            bg="white"
            shadow="base"
            _disabled={{ bg: "gray.200" }}
            key={index}
            {...api.getThumbProps(index)}
          >
            <input {...api.getInputProps(index)} />
          </Center>
        ))}
      </Flex>
    </chakra.div>
  )
}
