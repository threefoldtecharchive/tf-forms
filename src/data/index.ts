import type { FormInput } from '@/components/FormRenderer.vue'
import { ref, watch, type Ref } from 'vue'

export function hasFormData(key: string) {
  const maybeForm = localStorage.getItem(key)

  if (maybeForm) {
    try {
      JSON.parse(maybeForm)
      return true
    } catch {
      return false
    }
  }
  return false
}

export function useFormData(key: string, fallbackData: FormInput[][]): Ref<FormInput[][]> {
  const maybeForm = localStorage.getItem(key)

  if (maybeForm) {
    try {
      fallbackData = JSON.parse(maybeForm)
    } catch {
      /* Pass */
    }
  }

  const form = ref(fallbackData)
  watch(form, (form) => localStorage.setItem(key, JSON.stringify(form)), { deep: true })
  return form
}

export function setData(
  form: FormInput[][],
  values: { [key: number]: { [key: number]: any } }
): FormInput[][] {
  /* clone */
  form = [...form.map((x) => [...x.map((y) => ({ ...y }))])]

  for (const x in values) {
    for (const y in values[x]) {
      form[x][y].value = values[x][y]
    }
  }
  return form
}

export * from './investmentForm'
export * from './contactForm'
export * from './presaleForm'
