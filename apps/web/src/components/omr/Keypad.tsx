type KeypadProps = {
  value: string
  onChange: (val: string) => void
  onConfirm: () => void
}

export function Keypad({ value, onChange, onConfirm }: KeypadProps) {
  const handle = (key: string) => {
    if (key === '지우기') {
      onChange(value.slice(0, -1))
    } else if (key === '(-)부호') {
      if (value.startsWith('-')) onChange(value.slice(1))
      else onChange('-' + value)
    } else if (value.replace('-', '').length < 3) {
      onChange(value + key)
    }
  }

  const rows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['(-)부호', '0', '지우기'],
  ]

  return (
    <div className="flex w-64 flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-2 flex h-14 items-center justify-end rounded-xl bg-[#F8F9FA] px-4">
        <span className="text-2xl font-bold tracking-wider text-[#333]">
          {value || ' '}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {rows.flat().map((btn) => (
          <button
            key={btn}
            type="button"
            onClick={() => handle(btn)}
            className="flex h-12 items-center justify-center rounded-xl bg-[#F0F2F5] text-lg font-medium text-[#444] transition-all hover:bg-[#E4E6E9] active:scale-95 active:bg-[#D8DADC]"
          >
            {btn}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onConfirm}
        className="mt-1 flex h-12 w-full items-center justify-center rounded-xl bg-[#364F8E] text-lg font-bold text-white transition-all hover:bg-[#2C417A] active:scale-95"
      >
        입력 완료
      </button>
    </div>
  )
}
