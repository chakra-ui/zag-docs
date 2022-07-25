import { normalizeProps, useActor, useMachine } from "@zag-js/react"
import * as toast from "@zag-js/toast"
import { useRef } from "react"
import { chakra } from "@chakra-ui/system"
import { HiX } from "react-icons/hi"
import { Button } from "components/button"
import { useId } from "react"

function Toast({ actor }: { actor: toast.Service }) {
  const [state, send] = useActor(actor)
  const api = toast.connect(state, send, normalizeProps)
  const changed = api.type === "info"
  return (
    <chakra.div
      sx={{
        width: "400px",
        position: "relative",
        bg: changed ? "gray.600" : "green.500",
        color: "white",
        rounded: "sm",
        padding: "6",
        shadow: "rgba(0, 0, 0, 0.12) 0px 5px 10px 0px",
        animationName: api.isVisible ? "toast-in" : "toast-out",
        animationDuration: api.isVisible ? "0.35s" : "0.4s",
        animationTimingFunction: api.isVisible
          ? "cubic-bezier(.21,1.02,.73,1)"
          : "cubic-bezier(.06,.71,.55,1)",
        animationFillMode: "forwards",
      }}
      {...api.rootProps}
    >
      <chakra.div
        bg="whiteAlpha.500"
        sx={{
          position: "absolute",
          width: "full",
          bottom: "0",
          insetX: "0",
          height: "4px",
        }}
      >
        <chakra.div
          key={state.value}
          sx={{
            height: "inherit",
            bg: "white",
            animationName: state.matches("active") ? "shrink" : "none",
          }}
          {...api.progressbarProps}
        />
      </chakra.div>
      <p {...api.titleProps}>
        [{api.type}] {api.title}
      </p>

      <chakra.button
        display="flex"
        position="absolute"
        top="3"
        right="3"
        onClick={api.dismiss}
      >
        <HiX />
      </chakra.button>
    </chakra.div>
  )
}

export function ToastGroup(props: any) {
  const [state, send] = useMachine(
    toast.group.machine({
      id: useId(),
      offsets: "24px",
    }),
    { context: props.controls },
  )

  const api = toast.group.connect(state, send, normalizeProps)
  const id = useRef<string>()

  return (
    <>
      <div style={{ display: "flex", gap: "16px" }}>
        <Button
          size="sm"
          variant="outline"
          bg="white"
          onClick={() => {
            id.current = api.create({
              title: "The Evil Rabbit jumped over the fence.",
              type: "info",
            })
          }}
        >
          Show toast
        </Button>

        <Button
          size="sm"
          variant="outline"
          bg="white"
          onClick={() => {
            if (!id.current) return
            api.update(id.current, {
              title: "The Evil Rabbit is eating...",
              type: "success",
            })
          }}
        >
          Update
        </Button>
      </div>
      <chakra.div
        maxWidth="420px"
        {...api.getGroupProps({ placement: "bottom-end" })}
      >
        {api.toasts.map((actor) => (
          <Toast key={actor.id} actor={actor} />
        ))}
      </chakra.div>
    </>
  )
}
