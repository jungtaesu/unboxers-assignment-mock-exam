import React from 'react'

type KeypadProps = {
  value: string
  onChange: (val: string) => void
  onConfirm: () => void
}

export function Keypad({ value, onChange, onConfirm }: KeypadProps) {
  const handle = (key: string) => {
    if (key === 'delete') {
      onChange(value.slice(0, -1))
    } else {
      onChange(value + key)
    }
  }

  const keys = [
    ['.', '/', '-'],
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9']
  ]

  return (
    <div className="flex w-[340px] flex-col rounded-2xl p-6">
      {/* 안내 문구 영역 */}
      <div className="mb-6 flex flex-col gap-[14px] text-[12px] font-medium leading-[1.5] text-[#555]">
        <p>
          모든 주관식 답은 숫자와 소숫점, 슬래시(/), 마이너스(-) 기호로 이루어져 있습니다.
        </p>
        <p>
          마이너스 2분의 3을 입력할 때는 "-3/2"라고 입력하면 돼요. 소숫점은 유효숫자 개수를 맞춰서 입력합니다.
        </p>
        <p>
          단위가 포함된 주관식 답안은 숫자만 입력합니다.
        </p>
        <div>
          예시)<br />
          제3사분면 → 3<br />
          3,700만원 → 37000000<br />
          95% → 95
        </div>
      </div>

      {/* 입력 박스 */}
      <div className="mb-5 flex h-[52px] items-center justify-center rounded-[12px] bg-white font-bold text-[#333] shadow-sm text-[16px]">
        {value || <span className="text-[#a0a0a0] font-semibold text-[15px]">입력할 곳을 터치해주세요</span>}
      </div>

      {/* 키패드 버튼 영역 */}
      <div className="flex flex-col gap-3">
        {keys.map((row, i) => (
          <div key={i} className="grid grid-cols-3 gap-3">
            {row.map((btn) => (
              <button
                key={btn}
                type="button"
                onClick={() => handle(btn)}
                className="flex h-[52px] items-center justify-center rounded-[12px] bg-white text-[20px] font-bold text-[#111] shadow-sm transition-all hover:bg-[#F0F0F0] active:scale-95"
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
        {/* 0, 뒤로가기 줄 */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handle('0')}
            className="col-span-2 flex h-[52px] items-center justify-center rounded-[12px] bg-white text-[20px] font-bold text-[#111] shadow-sm transition-all hover:bg-[#F0F0F0] active:scale-95"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => handle('delete')}
            className="flex h-[52px] items-center justify-center rounded-[12px] bg-white text-[18px] text-[#111] shadow-sm transition-all hover:bg-[#F0F0F0] active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 완료 버튼 */}
      <button
        type="button"
        onClick={onConfirm}
        className="mt-6 flex h-[52px] w-full items-center justify-center rounded-[12px] bg-[#F6F6F6] text-[16px] font-bold text-[#A0A0A0] shadow-sm border border-[#EAEAEA] transition-all hover:bg-[#EFEFEF] active:scale-95"
        style={{ background: '#f8f8f8' }}
      >
        완료
      </button>
    </div>
  )
}
