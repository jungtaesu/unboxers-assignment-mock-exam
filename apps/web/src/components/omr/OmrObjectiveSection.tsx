const OBJ_COL1 = [1, 2, 3, 4, 5, 6, 7]
const OBJ_COL2 = [8, 9, 10, 11, 12, 13, 14]
const CHOICES = [1, 2, 3, 4, 5]

export type OmrObjectiveSectionProps = {
  answers: Record<number, number | null>
  onSelect: (qn: number, choice: number) => void
}

export function OmrObjectiveSection({ answers, onSelect }: OmrObjectiveSectionProps) {
  const objectiveColumns = [OBJ_COL1, OBJ_COL2]

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="bg-[#364F8E] px-4 py-2 text-center">
        <p className="text-[13px] font-bold tracking-[0.3em] text-white">객 관 식 답 안</p>
      </div>

      <div className="flex flex-1 divide-x divide-[#eeeff2]">
        {objectiveColumns.map((col, ci) => (
          <div key={ci} className="flex-1 p-3">
            <div className="mb-2 flex items-center gap-0.5">
              <span className="w-7 shrink-0" />
              {CHOICES.map((c) => (
                <span key={c} className="w-9 text-center text-[11px] font-semibold text-[#b6b6b6]">
                  {c}
                </span>
              ))}
            </div>

            {col.map((qn) => {
              const ans = answers[qn]
              return (
                <div key={qn} className="mb-1.5 flex items-center gap-0.5">
                  <span className="w-7 shrink-0 text-right text-[12px] font-bold text-[#364F8E]">
                    {qn}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {CHOICES.map((c) => {
                      const isSelected = ans === c
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => onSelect(qn, c)}
                          className={[
                            'flex h-7 w-9 items-center justify-center rounded-full text-[12px] font-bold transition-all',
                            isSelected
                              ? 'bg-[#364F8E] text-white shadow-sm'
                              : 'bg-[#A5A4A0] text-white hover:bg-[#8f8e89] active:scale-95',
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
  )
}

