const OBJECTIVE_QUESTIONS = Array.from({ length: 14 }, (_, i) => i + 1)
const SUBJECTIVE_QUESTIONS = Array.from({ length: 11 }, (_, i) => i + 1)
const CHOICES = [1, 2, 3, 4, 5]

type OmrCardProps = {
  objectiveAnswers: Record<number, number | null>
  subjectiveAnswers: Record<number, string>
  onObjectiveSelect: (number: number, choice: number) => void
  onSubjectiveChange: (number: number, value: string) => void
  /** 튜토리얼 모드: 특정 문항만 활성화 */
  tutorialObjectiveLock?: number   // 이 문항번호만 클릭 가능
  tutorialSubjectiveLock?: number  // 이 문항번호만 클릭 가능
  /** 주관식 선택된 문항 */
  activeSubjective: number | null
  onSubjectiveActivate: (number: number | null) => void
}

export function OmrCard({
  objectiveAnswers,
  subjectiveAnswers,
  onObjectiveSelect,
  onSubjectiveChange,
  tutorialObjectiveLock,
  tutorialSubjectiveLock,
  activeSubjective,
  onSubjectiveActivate,
}: OmrCardProps) {
  return (
    <div className="flex gap-3">
      {/* 객관식 영역 */}
      <div className="flex-1 rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-[0_8px_16px_#00000008]">
        <p className="mb-3 text-[13px] font-bold tracking-[-0.02em] text-[#b6b6b6]">객관식 답안</p>
        <div className="grid gap-1.5">
          {OBJECTIVE_QUESTIONS.map((number) => {
            const isLocked = tutorialObjectiveLock != null && tutorialObjectiveLock !== number
            const selected = objectiveAnswers[number]

            return (
              <div key={number} className="flex items-center gap-2">
                <span className="w-6 text-right text-[13px] font-bold text-[#b6b6b6]">{number}</span>
                <div className="flex gap-1.5">
                  {CHOICES.map((choice) => {
                    const isSelected = selected === choice
                    return (
                      <button
                        key={choice}
                        type="button"
                        disabled={isLocked}
                        onClick={() => onObjectiveSelect(number, choice)}
                        className={[
                          'flex h-9 w-9 items-center justify-center rounded-xl text-[15px] font-bold transition-all',
                          isSelected
                            ? 'bg-[#090909] text-white shadow-[0_4px_16px_#00000026]'
                            : 'bg-[#f5f5f5] text-[#b6b6b6] hover:bg-[#e8e8e8] disabled:cursor-default disabled:opacity-30',
                        ].join(' ')}
                      >
                        {choice}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 주관식 영역 */}
      <div className="w-56 rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-[0_8px_16px_#00000008]">
        <p className="mb-3 text-[13px] font-bold tracking-[-0.02em] text-[#b6b6b6]">주관식 답안</p>
        <div className="grid gap-1.5">
          {SUBJECTIVE_QUESTIONS.map((number) => {
            const isLocked = tutorialSubjectiveLock != null && tutorialSubjectiveLock !== number
            const value = subjectiveAnswers[number] ?? ''
            const isActive = activeSubjective === number

            return (
              <button
                key={number}
                type="button"
                disabled={isLocked}
                onClick={() => {
                  if (!isLocked) onSubjectiveActivate(isActive ? null : number)
                }}
                className={[
                  'flex h-9 w-full items-center rounded-xl border px-3 text-left text-[14px] transition-all',
                  isActive
                    ? 'border-[#5784F1] bg-[#EEF2FF]'
                    : value
                      ? 'border-[#e8e8e8] bg-white font-bold text-[#090909]'
                      : 'border-[#e8e8e8] bg-[#fafafa] text-[#b6b6b6] disabled:opacity-30',
                ].join(' ')}
              >
                {isActive && !value
                  ? '여기를 터치해요!'
                  : value || '터치해서 주관식 답안 입력'}
              </button>
            )
          })}
        </div>
      </div>

      {/* 주관식 키패드 (activeSubjective 있을 때만 표시) */}
      {activeSubjective != null && (
        <Keypad
          value={subjectiveAnswers[activeSubjective] ?? ''}
          onChange={(val) => onSubjectiveChange(activeSubjective, val)}
          onConfirm={() => onSubjectiveActivate(null)}
        />
      )}
    </div>
  )
}

type KeypadProps = {
  value: string
  onChange: (val: string) => void
  onConfirm: () => void
}

function Keypad({ value, onChange, onConfirm }: KeypadProps) {
  const handle = (key: string) => {
    if (key === 'backspace') {
      onChange(value.slice(0, -1))
      return
    }
    if (key === 'confirm') {
      onConfirm()
      return
    }
    // 숫자 + 슬래시(분수) + 마이너스(음수)만 허용, 최대 6자리
    const next = value + key
    if (next.length <= 6) {
      onChange(next)
    }
  }

  const keys = [
    ['.', '/', '-'],
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', null, 'backspace'],
  ]

  return (
    <div className="w-52 flex-shrink-0 rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-[0_8px_16px_#00000008]">
      {/* 입력 표시 */}
      <div className="mb-3 flex h-11 items-center justify-center rounded-xl border border-[#5784F1] bg-[#EEF2FF] text-[18px] font-bold text-[#090909]">
        {value || <span className="text-[14px] font-normal text-[#b6b6b6]">입력할 곳을 터치해주세요</span>}
      </div>

      {/* 키 */}
      <div className="grid gap-2">
        {keys.map((row, ri) => (
          <div key={ri} className="grid grid-cols-3 gap-2">
            {row.map((key, ki) =>
              key === null ? (
                <div key={ki} />
              ) : key === 'backspace' ? (
                <button
                  key={ki}
                  type="button"
                  onClick={() => handle('backspace')}
                  className="flex h-11 items-center justify-center rounded-xl bg-[#f5f5f5] text-[18px] text-[#090909] transition hover:bg-[#e8e8e8]"
                >
                  ⌫
                </button>
              ) : (
                <button
                  key={ki}
                  type="button"
                  onClick={() => handle(key)}
                  className="flex h-11 items-center justify-center rounded-xl bg-[#f5f5f5] text-[18px] font-bold text-[#090909] transition hover:bg-[#e8e8e8]"
                >
                  {key}
                </button>
              )
            )}
          </div>
        ))}

        {/* 완료 버튼 */}
        <button
          type="button"
          onClick={() => handle('confirm')}
          className="mt-1 flex h-11 w-full items-center justify-center rounded-xl bg-[#090909] text-[16px] font-bold text-white transition hover:bg-[#333]"
        >
          완료
        </button>
      </div>
    </div>
  )
}
