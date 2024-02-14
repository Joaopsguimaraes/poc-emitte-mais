import IMask from 'imask'

export const masker = ({
  masked,
  transform,
  maskDefault,
}: {
  masked: any
  transform?: any
  maskDefault?: any
}) =>
  (function () {
    const mask = IMask.createPipe(
      masked,
      IMask.PIPE_TYPE.UNMASKED,
      IMask.PIPE_TYPE.MASKED
    )

    const unmask = IMask.createPipe(
      masked,
      IMask.PIPE_TYPE.MASKED,
      IMask.PIPE_TYPE.UNMASKED
    )

    const onChange = (e: any) => {
      const unmasked = unmask(e.target.value)
      const newValue = mask(unmasked)
      e.target.value = newValue
      return e
    }

    return {
      mask,
      onChange,
      transform,
      unmask,
      maskDefault,
    }
  })()

export const telMask = masker({
  masked: {
    mask: '(00) 00000-0000',
  },
})

export const emailMask = masker({
  masked: {
    mask: /^\S*@?\S*$/,
  },
})

export const zipCodeMask = masker({
  masked: {
    mask: '00000-000',
  },
})

export const cnpjMask = masker({
  masked: {
    mask: '00.000.000/0000-00',
  },
})

export const cpfMask = masker({
  masked: {
    mask: '000.000.000-00',
  },
})

export const IEMask = masker({
  // this mask must to be this structure: /^[A-Z]{2}-\d{6}$/ (e.g. SP-123456)
  masked: {
    mask: 'GO-000000',
  },
})
