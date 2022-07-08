import { Box, Flex, HStack, Spacer } from "@chakra-ui/layout"
import { useToken } from "@chakra-ui/system"
import Portal from "@reach/portal"
import * as dialog from "@zag-js/dialog"
import { normalizeProps, useMachine, useSetup } from "@zag-js/react"
import { useRouteChange } from "lib/use-route-change"
import { useEffect, useRef } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import useMatchMedia from "use-match-media-hook"
import { Button } from "./button"
import { FrameworkSelect } from "./framework-select"
import { LogoWithLink } from "./logo"
import { Sidebar } from "./sidebar"

export function MobileNavigation() {
  const [state, send] = useMachine(
    dialog.machine({
      initialFocusEl: () => initialRef.current,
    }),
  )
  const ref = useSetup({ send, id: "m1" })
  const api = dialog.connect(state, send, normalizeProps)
  const initialRef = useRef<HTMLButtonElement>(null)

  const lgBreakpoint = useToken("breakpoints", "lg")
  const [desktop] = useMatchMedia([`(min-width: ${lgBreakpoint})`])

  useEffect(() => {
    if (desktop) api.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desktop])

  useRouteChange(() => {
    api.close()
  })

  return (
    <>
      <Button
        display={{ base: "inline-flex", lg: "none" }}
        size="sm"
        px="2"
        {...api.triggerProps}
      >
        <HStack ref={ref}>
          <HiMenu /> <span>Menu</span>
        </HStack>
      </Button>

      {api.isOpen && (
        <Portal>
          <div {...api.underlayProps}>
            <Box
              {...api.contentProps}
              position="fixed"
              inset="0"
              bg="white"
              zIndex="modal"
              pb="10"
              overflowY="auto"
            >
              <Flex
                justify="space-between"
                py="4"
                px={{ base: "4", sm: "6", md: "8" }}
              >
                <LogoWithLink />
                <Button
                  ref={initialRef}
                  size="sm"
                  px="2"
                  {...api.closeButtonProps}
                >
                  <HStack>
                    <HiX /> <span>Close</span>
                  </HStack>
                </Button>
              </Flex>
              <Box px="8">
                <Spacer height="10" bg="white" />
                <Box mb="8">
                  <FrameworkSelect />
                </Box>
                <Sidebar />
              </Box>
            </Box>
          </div>
        </Portal>
      )}
    </>
  )
}
