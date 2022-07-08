import { Box, Flex, HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import { normalizeProps, useMachine, useSetup } from "@zag-js/react"
import * as tabs from "@zag-js/tabs"
import { CodeArea } from "./code-area"
import { ReactIcon, SolidIcon, VueIcon } from "./icons"
import { NumberInput } from "./machines/number-input"
import { Playground } from "./playground"

const FrameworkButton = chakra("button", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "120px",
    height: "120px",
    rounded: "md",
    borderWidth: "1px",
    bg: "white",
    _selected: {
      bg: "green.50",
      borderBottomWidth: "4px",
      borderBottomColor: "green.500",
    },
  },
})

export function MultiframeworkTabs() {
  const [state, send] = useMachine(tabs.machine({ value: "react" }))
  const ref = useSetup({ send, id: "r:1" })
  const api = tabs.connect(state, send, normalizeProps)
  return (
    <Box ref={ref} {...api.rootProps}>
      <HStack {...api.triggerGroupProps}>
        <FrameworkButton {...api.getTriggerProps({ value: "react" })}>
          <VStack>
            <ReactIcon />
            <Text>React</Text>
          </VStack>
        </FrameworkButton>
        <FrameworkButton {...api.getTriggerProps({ value: "vue-jsx" })}>
          <VStack>
            <VueIcon />
            <Text>Vue (JSX)</Text>
          </VStack>
        </FrameworkButton>
        <FrameworkButton {...api.getTriggerProps({ value: "vue-sfc" })}>
          <VStack>
            <VueIcon />
            <Text>Vue (SFC)</Text>
          </VStack>
        </FrameworkButton>
        <FrameworkButton {...api.getTriggerProps({ value: "solid" })}>
          <VStack>
            <SolidIcon />
            <Text>Solid</Text>
          </VStack>
        </FrameworkButton>
      </HStack>

      <Stack direction={{ base: "column", lg: "row" }} spacing="56px" mt="8">
        <Box
          shadow="md"
          width={{ lg: "680px" }}
          flex="1"
          rounded="xl"
          overflow="hidden"
          {...api.contentGroupProps}
        >
          <Box {...api.getContentProps({ value: "react" })}>
            <CodeArea slug="react/number-input/usage" />
          </Box>
          <Box {...api.getContentProps({ value: "vue-jsx" })}>
            <CodeArea slug="vue-jsx/number-input/usage" />
          </Box>
          <Box {...api.getContentProps({ value: "vue-sfc" })}>
            <CodeArea slug="vue-sfc/number-input/usage" />
          </Box>
          <Box {...api.getContentProps({ value: "solid" })}>
            <CodeArea slug="solid/number-input/usage" />
          </Box>
        </Box>
        <Box
          flex="1"
          sx={{
            "#playground": {
              marginY: "0",
            },
            "[data-part=root]": {
              transform: "scale(1.5) translateY(40px)",
            },
          }}
        >
          <Playground
            component={NumberInput}
            hideControls
            defaultProps={{
              min: -10,
              max: 20,
              value: 0,
              disabled: false,
            }}
          />
        </Box>
      </Stack>
    </Box>
  )
}
