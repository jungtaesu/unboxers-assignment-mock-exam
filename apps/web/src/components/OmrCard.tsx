const OBJ_COL1 = [1, 2, 3, 4, 5, 6, 7]
const OBJ_COL2 = [8, 9, 10, 11, 12, 13, 14]
const OBJ_TUTORIAL_COL1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const OBJ_TUTORIAL_COL2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const OBJ_TUTORIAL_COL3 = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
const CHOICES = [1, 2, 3, 4, 5]
const SUBJ_QS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

type OmrCardProps = {
  objectiveAnswers: Record<number, number | null>
  subjectiveAnswers: Record<number, string>
  onObjectiveSelect: (number: number, choice: number) => void
  onSubjectiveChange: (number: number, value: string) => void
  /** 튜토리얼 모드: 이 문항번호만 클릭 가능 */
  tutorialObjectiveLock?: number
  tutorialSubjectiveLock?: number
  /** 주관식 포커스 문항 */
  activeSubjective: number | null
  onSubjectiveActivate: (number: number | null) => void
  /** 객관식 튜토리얼 전용 레이아웃(1~30, 3열, 주관식 숨김) */
  objectiveOnly30?: boolean
  /** 주관식 전용 레이아웃(객관식 숨김) */
  subjectiveOnly?: boolean
  /** 복수 정답 문항: 해당 문항은 토글 배열로 관리 */
  multiObjectiveAnswers?: Record<number, number[]>
  onMultiObjectiveToggle?: (qn: number, c: number) => void
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
  objectiveOnly30 = false,
  subjectiveOnly = false,
  multiObjectiveAnswers,
  onMultiObjectiveToggle,
}: OmrCardProps) {
  const objectiveColumns = objectiveOnly30
    ? [OBJ_TUTORIAL_COL1, OBJ_TUTORIAL_COL2, OBJ_TUTORIAL_COL3]
    : [OBJ_COL1, OBJ_COL2]

  const rootClass = (objectiveOnly30 || subjectiveOnly)
    ? 'mx-auto flex w-fit overflow-hidden rounded-2xl border border-[#dde0e8] bg-white shadow-[0_8px_24px_#0000000C]'
    : 'flex w-full overflow-hidden rounded-2xl border border-[#dde0e8] bg-white shadow-[0_8px_24px_#0000000C]'

  return (
    <div className={rootClass}>
      {/* ─── 객관식 영역 ─── */}
      {!subjectiveOnly && (
      <div className="flex min-w-0 flex-1 flex-col">
        {!objectiveOnly30 && (
          <div className="bg-[#364F8E] px-4 py-2 text-center">
            <p className="text-[13px] font-bold tracking-[0.3em] text-white">객 관 식 답 안</p>
          </div>
        )}

        <div className="flex flex-1 divide-x divide-[#eeeff2]">
          {objectiveColumns.map((col, ci) => (
            <div
              key={ci}
              className={objectiveOnly30 ? 'w-[100%] border-x border-[#5f86e7] bg-[#f3f1e8] p-3 pt-0' : 'flex-1 p-3'}
            >
              {!objectiveOnly30 && (
                <div className="mb-2 flex items-center gap-0.5">
                  <span className="w-7 shrink-0" />
                  {CHOICES.map((c) => (
                    <span key={c} className="w-9 text-center text-[11px] font-semibold text-[#b6b6b6]">
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {/* 문항 행 */}
              {col.map((qn) => {
                const isLocked = tutorialObjectiveLock != null && tutorialObjectiveLock !== qn
                const ans = objectiveAnswers[qn]
                const isLastOfGroup = objectiveOnly30 && [10, 20, 30].includes(qn)
                const isMultiQ = multiObjectiveAnswers != null && qn in multiObjectiveAnswers
                return (
                  <div key={qn}>
                  <div className={objectiveOnly30 ? 'flex items-center gap-2.5' : 'mb-1.5 flex items-center gap-0.5'}>
                    <span
                      className={[
                        objectiveOnly30
                          ? 'flex h-[44px] w-6 shrink-0 items-center justify-center bg-[#8FB6FF] text-[14px] font-bold border-r border-[#5f86e7] text-[#364F8E]'
                          : 'w-7 shrink-0 text-right text-[12px] font-bold',
                        !objectiveOnly30 && (isLocked ? 'text-[#b6c3e6]' : 'text-[#364F8E]'),
                      ].join(' ')}
                    >
                      {qn}
                    </span>
                    <div className={objectiveOnly30 ? 'flex items-center gap-[10px]' : 'flex items-center gap-0.5'}>
                      {CHOICES.map((c) => {
                        const isSelected = isMultiQ
                          ? (multiObjectiveAnswers![qn] ?? []).includes(c)
                          : ans === c
                        return (
                          <button
                            key={c}
                            type="button"
                            disabled={isLocked}
                            onClick={() => isMultiQ && onMultiObjectiveToggle
                              ? onMultiObjectiveToggle(qn, c)
                              : onObjectiveSelect(qn, c)
                            }
                            className={[
                              objectiveOnly30
                                ? 'flex h-[40px] w-[20px] items-center justify-center rounded-[20px] px-[10px] py-[8px] text-[12px] font-bold leading-none transition-all'
                                : 'flex h-7 w-9 items-center justify-center rounded-full text-[12px] font-bold transition-all',
                              isSelected
                                ? 'bg-[#364F8E] text-white shadow-sm'
                                : 'bg-[#A5A4A0] text-white',
                              !isLocked && !isSelected
                                ? 'hover:bg-[#8f8e89] active:scale-95'
                                : '',
                              isLocked && !objectiveOnly30 ? 'cursor-default opacity-25' : '',
                              isLocked && objectiveOnly30 ? 'cursor-default' : '',
                            ].join(' ')}
                          >
                            {c}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  {isLastOfGroup && (
                    <div className="mb-1.5 flex gap-[10px] pl-[34px]">
                      {CHOICES.map((c) => (
                        <div key={c} className="flex w-[20px] justify-center">
                          <div className="h-[24px] w-[8px] bg-black" />
                        </div>
                      ))}
                    </div>
                  )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      )}


      {!objectiveOnly30 && (
        <>
          {/* ─── 구분선 ─── */}
          {!subjectiveOnly && <div className="w-px bg-[#dde0e8]" />}

          {/* ─── 주관식 영역 ─── */}
          <div className="flex shrink-0">
            {/* 주관식 목록 */}
            <div className={subjectiveOnly ? 'flex w-[280px] flex-col' : 'w-52 flex-col'}>
              {!subjectiveOnly && (
                <div className="bg-[#364F8E] px-4 py-2 text-center">
                  <p className="text-[13px] font-bold tracking-[0.3em] text-white">주 관 식 답 안</p>
                </div>
              )}
              <div className={subjectiveOnly ? 'p-2' : 'p-3'}>
                {SUBJ_QS.map((qn) => {
                  const isLocked = tutorialSubjectiveLock != null && tutorialSubjectiveLock !== qn
                  const val = subjectiveAnswers[qn] ?? ''
                  const isActive = activeSubjective === qn
                  return (
                    <div key={qn} className={subjectiveOnly ? 'flex items-center gap-2.5' : 'mb-1.5 flex items-center gap-1.5'}>
                      <span
                        className={[
                          subjectiveOnly
                            ? 'flex h-[44px] w-6 shrink-0 items-center justify-center bg-[#8FB6FF] text-[14px] font-bold border-r border-[#5f86e7] text-[#364F8E]'
                            : 'w-5 shrink-0 text-right text-[12px] font-bold',
                          !subjectiveOnly && (isLocked ? 'text-[#d0d0d0]' : 'text-[#555]'),
                        ].join(' ')}
                      >
                        {qn}
                      </span>
                      <button
                        type="button"
                        disabled={isLocked}
                        onClick={() => !isLocked && onSubjectiveActivate(isActive ? null : qn)}
                        className={[
                          subjectiveOnly
                            ? 'flex h-[44px] flex-1 items-center justify-center rounded-lg border text-[13px] transition-all'
                            : 'flex h-8 flex-1 items-center justify-center rounded-lg border text-[12px] transition-all',
                          isActive
                            ? 'border-[#5784F1] bg-[#EEF2FF] font-medium text-[#090909]'
                            : val
                              ? 'border-[#dde0e8] bg-white font-bold text-[#090909]'
                              : 'border-[#eeeff2] bg-[#fafafa] text-[#c0c0c0]',
                          isLocked && !subjectiveOnly ? 'cursor-default opacity-25' : '',
                          isLocked && subjectiveOnly ? 'cursor-default' : '',
                        ].join(' ')}
                      >
                        {val || (isActive ? '입력 중…' : '터치해서 입력')}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 키패드 (주관식 문항 활성화 시 오른쪽에 표시) */}
            {activeSubjective != null && (
              <>
                <div className="w-px bg-[#dde0e8]" />
                <div className="flex items-center justify-center p-3">
                  <Keypad
                    value={subjectiveAnswers[activeSubjective] ?? ''}
                    onChange={(val) => onSubjectiveChange(activeSubjective, val)}
                    onConfirm={() => onSubjectiveActivate(null)}
                  />
                </div>
              </>
            )}
          </div>
        </>
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
    if (key === 'backspace') { onChange(value.slice(0, -1)); return }
    if (key === 'confirm') { onConfirm(); return }
    const next = value + key
    if (next.length <= 6) onChange(next)
  }

  const rows = [
    ['.', '/', '-'],
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', null, 'backspace'],
  ] as const

  return (
    <div className="w-44">
      {/* 입력 표시 */}
      <div className="mb-3 flex h-10 items-center justify-center rounded-xl border border-[#5784F1] bg-[#EEF2FF] text-[17px] font-bold text-[#090909]">
        {value || (
          <span className="text-[12px] font-normal text-[#b6b6b6]">입력할 곳을 터치해주세요</span>
        )}
      </div>

      <div className="grid gap-2">
        {rows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-3 gap-2">
            {row.map((key, ki) =>
              key === null ? (
                <div key={ki} />
              ) : key === 'backspace' ? (
                <button
                  key={ki}
                  type="button"
                  onClick={() => handle('backspace')}
                  className="flex h-10 items-center justify-center rounded-xl bg-[#f5f5f5] text-[16px] text-[#090909] transition hover:bg-[#e8e8e8] active:scale-95"
                >
                  ⌫
                </button>
              ) : (
                <button
                  key={ki}
                  type="button"
                  onClick={() => handle(key)}
                  className="flex h-10 items-center justify-center rounded-xl bg-[#f5f5f5] text-[16px] font-bold text-[#090909] transition hover:bg-[#e8e8e8] active:scale-95"
                >
                  {key}
                </button>
              ),
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => handle('confirm')}
          className="mt-1 flex h-10 w-full items-center justify-center rounded-xl bg-[#364F8E] text-[15px] font-bold text-white transition hover:bg-[#2d4278] active:scale-95"
        >
          완료
        </button>
      </div>
    </div>
  )
}

