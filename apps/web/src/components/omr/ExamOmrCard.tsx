import { Keypad } from "./Keypad"

const OBJ_COL1 = [1, 2, 3, 4, 5, 6, 7]
const OBJ_COL2 = [8, 9, 10, 11, 12, 13, 14]
const CHOICES = [1, 2, 3, 4, 5]
const SUBJ_QS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export type ExamOmrCardProps = {
  objectiveAnswers: Record<number, number | null>
  subjectiveAnswers: Record<number, string>
  activeSubjective: number | null
  onObjectiveSelect: (qn: number, choice: number) => void
  onSubjectiveActivate: (qn: number | null) => void
  onSubjectiveChange: (qn: number, val: string) => void
}

export function ExamOmrCard({
  objectiveAnswers,
  subjectiveAnswers,
  activeSubjective,
  onObjectiveSelect,
  onSubjectiveActivate,
  onSubjectiveChange,
}: ExamOmrCardProps) {
  const objectiveColumns = [OBJ_COL1, OBJ_COL2]

  const infoRows = [
    { label: '학 원 명', value: '텐업 모의고사' },
    { label: '반 명', value: '베이스' },
    { label: '성 명', value: '학생이름' },
  ]

  return (
    <div className="mx-auto flex w-fit items-start gap-[40px] pb-10 pt-5">
      {/* OMR 본체 */}
      <div className="flex shrink-0 overflow-hidden rounded-[20px] border border-[#5f86e7] bg-[#FFFDF1] shadow-[0_8px_24px_#0000000C]">
        
        {/* 왼쪽: 수험자 정보 */}
        <div className="flex w-[160px] flex-col border-r border-[#5f86e7]">
          <div className="flex flex-col border-b border-[#5f86e7] bg-[#FFFDF1]">
            {infoRows.map((row) => (
              <div key={row.label} className="flex h-[40px] border-b border-[#5f86e7] last:border-b-0">
                <div
                  className="flex w-[32px] shrink-0 items-center justify-center border-r border-[#5f86e7] bg-[#FFFDF1] py-[4px] text-[11px] font-bold text-[#364F8E]"
                  style={{ wordBreak: 'keep-all', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {row.label.replace(/ /g, '')}
                </div>
                <div className="flex flex-1 items-center justify-center text-[13px] font-bold text-[#364F8E]">
                  {row.value}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col items-center bg-[#FFFDF1] p-3 text-center">
            <h3 className="mt-4 text-[15px] font-bold text-[#364F8E]">답 안 지</h3>
            <div className="my-[10px] h-px w-8 bg-[#364F8E]" />
            <h2 className="text-[17px] font-bold leading-snug text-[#364F8E]">
              텐업<br />모의고사
            </h2>
          </div>
        </div>

        {/* 중앙: 객관식 영역 */}
        <div className="flex flex-col border-r border-[#5f86e7] bg-[#FFFDF1]">
          <div className="border-b border-[#5f86e7] bg-[#364F8E] py-[10px] text-center">
            <p className="text-[14px] font-bold tracking-[0.5em] text-white">객 관 식</p>
          </div>
          <div className="flex flex-1 divide-x divide-[#5f86e7]">
            {objectiveColumns.map((col, ci) => (
              <div key={ci} className="flex flex-1 flex-col p-[16px] pb-[8px]">
                <div className="mb-[8px] flex items-center justify-center gap-[8px] pl-6">
                  {CHOICES.map((c) => (
                    <span key={c} className="w-[18px] text-center text-[11px] font-semibold text-[#6b6b6b]">
                      {c}
                    </span>
                  ))}
                </div>
                {col.map((qn) => {
                  const ans = objectiveAnswers[qn]
                  const isDotted = qn % 5 === 0 && qn % 10 !== 0
                  return (
                    <div
                      key={qn}
                      className={
                        isDotted
                          ? "mb-[6px] flex items-center gap-[10px] border-b border-dashed border-[#5f86e7] pb-[6px]"
                          : "mb-[6px] flex items-center gap-[10px]"
                      }
                    >
                      <span className="flex h-[36px] w-[24px] shrink-0 items-center justify-center text-[14px] font-bold text-[#364F8E]">
                        {qn}
                      </span>
                      <div className="flex items-center gap-[8px]">
                        {CHOICES.map((c) => {
                          const isSelected = ans === c
                          return (
                            <button
                              key={c}
                              type="button"
                              onClick={() => onObjectiveSelect(qn, c)}
                              className={[
                                'flex h-[38px] w-[20px] items-center justify-center rounded-[20px] text-[12px] font-bold transition-all',
                                isSelected
                                  ? 'bg-[#364F8E] text-white shadow-sm'
                                  : 'bg-[#A4A4A4] text-white hover:bg-[#8e8e8e] active:scale-95',
                              ].join(' ')}
                            >
                              {c}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 주관식 영역 */}
        <div className="flex w-[320px] flex-col bg-[#FFFDF1]">
          <div className="border-b border-[#5f86e7] bg-[#364F8E] py-[10px] text-center">
            <p className="text-[14px] font-bold tracking-[0.5em] text-white">주 관 식</p>
          </div>
          <div className="flex flex-col">
            {SUBJ_QS.map((qn) => {
              const val = subjectiveAnswers[qn] || ''
              const isActive = activeSubjective === qn
              return (
                <div key={qn} className="flex h-[46px] items-center border-b border-[#5f86e7] bg-[#FFFDF1] last:border-b-0">
                  <span className="flex h-full w-[40px] shrink-0 items-center justify-center border-r border-[#5f86e7] bg-[#EBF1FF] text-[14px] font-bold text-[#364F8E]">
                    {qn}
                  </span>
                  <div className="flex h-full flex-1 items-center px-4">
                    <button
                      type="button"
                      onClick={() => onSubjectiveActivate(isActive ? null : qn)}
                      className={[
                        'flex h-[34px] w-full items-center justify-center rounded-[8px] border text-[13px] outline-none transition-all',
                        isActive
                          ? 'border-[2px] border-[#5784FF] bg-white font-bold text-[#090909]'
                          : 'border-[#e2e2e2] bg-white',
                        !isActive && val ? 'border-[#d0d0d0] bg-white font-bold text-[#090909]' : '',
                        !isActive && !val ? 'text-[#a0a0a0]' : '',
                      ].join(' ')}
                    >
                      {val || (isActive ? '정답을 입력하세요' : '터치하여 정답 입력')}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 키패드 */}
      <div className="sticky top-6 transition-opacity duration-300">
        <Keypad
          value={activeSubjective !== null ? subjectiveAnswers[activeSubjective] || '' : ''}
          onChange={(val) => activeSubjective !== null && onSubjectiveChange(activeSubjective, val)}
          onConfirm={() => onSubjectiveActivate(null)}
        />
      </div>
    </div>
  )
}