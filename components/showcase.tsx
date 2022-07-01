import { Checkbox } from "./machines/checkbox"
import { Accordion } from "./machines/accordion"
import { Dialog } from "./machines/dialog"
import { Editable } from "./machines/editable"
import { Menu } from "./machines/menu"
import { NumberInput } from "./machines/number-input"
import { PinInput } from "./machines/pin-input"
import { Popover } from "./machines/popover"
import { RangeSlider } from "./machines/range-slider"
import { Slider } from "./machines/slider"
import { Tabs } from "./machines/tabs"
import { TagsInput } from "./machines/tags-input"
import { ToastGroup } from "./machines/toast"
import { Tooltip } from "./machines/tooltip"
import { Playground } from "./playground"

const components = {
  Dialog: () => (
    <Playground
      component={Dialog}
      defaultProps={{
        preventScroll: true,
        closeOnOutsideClick: true,
        closeOnEsc: true,
        role: { options: ["dialog", "alertdialog"], default: "dialog" },
      }}
    />
  ),
  Checkbox: () => (
    <Playground
      component={Checkbox}
      defaultProps={{
        indeterminate: false,
        disabled: false,
        readonly: false,
      }}
    />
  ),
  Accordion: () => (
    <Playground
      component={Accordion}
      defaultProps={{
        collapsible: true,
        multiple: false,
        value: {
          default: "Aircrafts",
          options: ["Aircrafts", "Automobiles", "Watercraft"],
        },
      }}
    />
  ),
  Editable: () => (
    <Playground
      component={Editable}
      defaultProps={{
        autoResize: false,
        selectOnFocus: true,
        placeholder: "Enter text...",
        activationMode: {
          options: ["focus", "dblclick", "none"],
          default: "focus",
        },
        submitMode: {
          options: ["enter", "blur", "none", "both"],
          default: "enter",
        },
      }}
    />
  ),
  PinInput: () => (
    <Playground
      component={PinInput}
      defaultProps={{
        disabled: false,
        otp: false,
        type: {
          options: ["alphanumeric", "numeric", "alphabetic"],
          default: "alphanumeric",
        },
        blurOnComplete: false,
        mask: false,
      }}
    />
  ),
  NumberInput: () => (
    <Playground
      component={NumberInput}
      defaultProps={{
        disabled: false,
        minFractionDigits: 0,
        maxFractionDigits: 5,
        min: -10,
        max: 20,
        step: 1,
        allowMouseWheel: false,
      }}
    />
  ),
  Popover: () => (
    <Playground
      component={Popover}
      defaultProps={{
        modal: false,
        portalled: false,
        autoFocus: true,
        closeOnBlur: true,
        closeOnEsc: true,
      }}
    />
  ),
  Tabs: () => (
    <Playground
      component={Tabs}
      defaultProps={{
        loop: false,
        activationMode: {
          default: "automatic",
          options: ["manual", "automatic"],
        },
      }}
    />
  ),
  Slider: () => (
    <Playground
      component={Slider}
      defaultProps={{
        disabled: false,
        readonly: false,
        origin: { default: "start", options: ["start", "center"] },
        dir: { default: "ltr", options: ["ltr", "rtl"] },
      }}
    />
  ),
  RangeSlider: () => (
    <Playground
      component={RangeSlider}
      defaultProps={{
        disabled: false,
        readonly: false,
        dir: { default: "ltr", options: ["ltr", "rtl"] },
      }}
    />
  ),
  TagsInput: () => (
    <Playground
      component={TagsInput}
      defaultProps={{
        disabled: false,
        dir: { default: "ltr", options: ["ltr", "rtl"] },
        blurBehavior: { default: "--", options: ["add", "clear"] },
        addOnPaste: false,
      }}
    />
  ),
  Menu: () => <Playground component={Menu} />,
  Tooltip: () => (
    <Playground
      component={Tooltip}
      defaultProps={{
        closeOnPointerDown: true,
        openDelay: 1000,
        closeDelay: 500,
      }}
    />
  ),
  Toast: () => (
    <Playground
      component={ToastGroup}
      defaultProps={{
        pauseOnPageIdle: false,
        pauseOnInteraction: true,
      }}
    />
  ),
}

export function Showcase(props: { id: keyof typeof components }) {
  const Component = components[props.id]
  return <Component />
}
