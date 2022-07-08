import * as combobox from "@zag-js/combobox"
import * as dialog from "@zag-js/dialog"
import { normalizeProps, useMachine, useSetup } from "@zag-js/react"
import { matchSorter } from "match-sorter"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { searchData, SearchMetaResult } from "./search-meta"
import mergeRefs from "./use-merge-refs"

export function useSearch() {
  const [dialog_state, dialog_send] = useMachine(dialog.machine)
  const dialog_ref = useSetup<HTMLButtonElement>({
    send: dialog_send,
    id: "s1",
  })
  const dialog_api = dialog.connect(dialog_state, dialog_send, normalizeProps)

  const [results, setResults] = useState<SearchMetaResult>(searchData)

  const router = useRouter()

  const [combobox_state, combobox_send] = useMachine(
    combobox.machine({
      placeholder: "Search the docs",
      inputBehavior: "autohighlight",
      selectionBehavior: "clear",
      onSelect({ value }) {
        try {
          const { pathname, slug, url } = JSON.parse(value)
          router.push({ pathname, query: { slug } }, url)
        } catch (err) {
          console.log(err)
        }
        dialog_api.close()
      },
      onInputChange({ value }) {
        if (value.length < 3) return
        const results = matchSorter(searchData, value, {
          keys: [
            "hierarchy.lvl1",
            "hierarchy.lvl2",
            "hierarchy.lvl3",
            "content",
          ],
        })
        setResults(results.slice(0, 10))
      },
    }),
  )

  useEffect(() => {
    const fn = (event: KeyboardEvent) => {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform)
      const hotkey = isMac ? "metaKey" : "ctrlKey"
      if (event.key?.toLowerCase() === "k" && event[hotkey]) {
        event.preventDefault()
        dialog_api.isOpen ? dialog_api.close() : dialog_api.open()
      }
    }
    document.addEventListener("keydown", fn)
    return () => {
      document.removeEventListener("keydown", fn)
    }
  })

  const combobox_ref = useSetup<HTMLButtonElement>({
    send: combobox_send,
    id: "s2",
  })
  const combobox_api = combobox.connect(
    combobox_state,
    combobox_send,
    normalizeProps,
  )

  useEffect(() => {
    if (combobox_api.isInputValueEmpty) {
      setResults([])
    }
  }, [combobox_api.isInputValueEmpty])

  useEffect(() => {
    if (!dialog_api.isOpen) {
      combobox_api.clearValue()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog_api.isOpen, combobox_api.clearValue])

  return {
    ref: mergeRefs(dialog_ref, combobox_ref),
    results,
    dialog_api,
    combobox_api,
  }
}
