import { Keypad } from './Keypad'

const SUBJ_QS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export type OmrSubjectiveSectionProps = {
  answers: Record<number, string>
  activeSubjective: number | null
  onActivate: (qn: number | null) => void
  onChange: (qn: number, val: string) => void
}

export function OmrSubjectiveSection({
  answers,
  activeSubjective,
  onActivate,
  onChange,
}: OmrSubjectiveSectionProps) {
  return (
    <div className="flex shrink-0">
      {/* 주관식 목록 */}
      <div className="w-52 flex-col">
        <div className="bg-[#364F8E] px-4 py-2 text-center">
          <p className="text-[13px] font-bold tracking-[0.3em] text-white">주 관 식 답 안</p>
        </div>
        <div className="p-3">
          {SUBJ_QS.map((qn) => {
            const val = answers[qn] ?? ''
            const isActive = activeSubjective === qn
            return (
              <div key={qn} className="mb-1.5 flex items-center gap-1.5">
                <span className="w-5 shrink-0 text-right text-[12px] font-bold text-[#555]">
                  {qn}
                </span>
                <button
                  type="button"
                  onClick={() => onActivate(isActive ? null : qn)}
                  className={[
                    'flex h-8 flex-1 items-center justify-center rounded-lg border text-[12px] transition-all',
                    isActive
                      ? 'border-[#5784F1] bg-[#EEF2FF] font-medium text-[#090909]'
                      : val
                        ? 'border-[#dde0e8] bg-white font-bold text-[#090909]'
                        : 'border-[#eeeff2] bg-[#fafafa] text-[#c0c0c0]',
                  ].join(' ')}
                >
                  {val || (isActive ? '입력 중…' : '터치해서 입력')}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* 키패드 */}
      {activeSubjective != null && (
        <>
          <div className="w-px bg-[#dde0e8] ml-2" />
          <div className="flex items-center justify-center p-6">
            <Keypad
              value={answers[activeSubjective] ?? ''}
              onChange={(val) => onChange(activeSubjective, val)}
              onConfirm={() => onActivate(null)}
            />
          </div>
        </>
      )}
    </div>
  )
}
