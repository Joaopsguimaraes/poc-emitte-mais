/* eslint-disable no-undef */
export type FormRadioOption = {
  value: string | number | boolean
  translateKey: string
}

export type SelectOptions = {
  label: string
  value: string | number
}

export type FormFields<T> = {
  name: keyof T
  disabled?: boolean
  label?: string
  optional?: boolean
} & (
  | {
      translateKey: string
      className?: string
      placeholderKey: string
      isLoading?: boolean
      type?: 'text' | 'tel' | 'email' | 'password' | 'number' | 'cnpj' | 'cpf'
    }
  | {
      translateKey: string
      className?: string
      placeholderKey: string
      type?: 'textarea'
    }
  | {
      translateKey: string
      className?: string
      type: 'switch'
      options: FormRadioOption[]      
    }
  | {
      translateKey: string
      className?: string
      type: 'radio'
      options: FormRadioOption[]
    }
  | {
      translateKey: string
      className?: string
      type: 'select'
      options: SelectOptions[]
      isLoading?: boolean
      placeHolder?: string
    }
  | {
      translateKey: string
      className?: string
      type: 'combobox'
      placeholderKey: string
      placeholder?: string
      loading?: boolean
      multiple: boolean
      options: SelectOptions[]
      contentSize?: string
      onInputChange?: (value: string) => void
    }
  | {
      translateKey: string
      placeholderKey: string
      className?: string
      type: 'date'
      mode?: 'default' | 'multiple' | 'range' | 'single'
    }
  | {
      translateKey: string
      placeholderKey: string
      className?: string
      type: 'date-single'
      mode?: 'default' | 'multiple' | 'range' | 'single'
    }
  | {
      translateKey: string
      className?: string
      placeholderKey: string
      type: 'zipcode'
    }
  | {
      type: 'hidden'
    }
)

export type FormFieldsConstant<T> = Array<FormFields<T> | FormFields<T>[]>
