  import { useState } from 'react'
  import type { ExamSummary, OmrPracticeProps, TutorialStep } from '../types'
  import { TutorialIntroStep } from './tutorial/TutorialIntroStep'
  import { TutorialOmrIntroStep } from './tutorial/TutorialOmrIntroStep'
  import { TutorialObjectiveTryStep } from './tutorial/TutorialObjectiveTryStep'
  import { TutorialObjectiveEraseStep } from './tutorial/TutorialObjectiveEraseStep'
  import { TutorialMultiAnswerStep } from './tutorial/TutorialMultiAnswerStep'
  import { TutorialSubjectiveTryStep } from './tutorial/TutorialSubjectiveTryStep'
  import { TutorialSubjectiveDoneStep } from './tutorial/TutorialSubjectiveDoneStep'
  import { TutorialTimerStep } from './tutorial/TutorialTimerStep'

  type TutorialScreenProps = {
    exam: ExamSummary | undefined
    onSkip: () => void
    onComplete: () => void
  }

  const STEPS: TutorialStep[] = [
    'intro',
    'omr-intro',
    'objective-try',
    'objective-erase',
    'multi-answer',
    'subjective-try',
    'subjective-done',
    'timer',
  ]

  export function TutorialScreen({ exam, onSkip, onComplete }: TutorialScreenProps) {
    const [stepIndex, setStepIndex] = useState(0)
    const step = STEPS[stepIndex]

    const [objAnswers, setObjAnswers] = useState<Record<number, number | null>>({})
    const [subjAnswers, setSubjAnswers] = useState<Record<number, string>>({})
    const [activeSubjective, setActiveSubjective] = useState<number | null>(null)
    const [multiObjAnswers, setMultiObjAnswers] = useState<Record<number, number[]>>({ 20: [] })

    const handleMultiToggle = (qn: number, c: number) =>
      setMultiObjAnswers((prev) => {
        const cur = prev[qn] ?? []
        return { ...prev, [qn]: cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c] }
      })

    const omrProps: OmrPracticeProps = {
      objectiveAnswers: objAnswers,
      subjectiveAnswers: subjAnswers,
      onObjectiveToggle: (n, c) =>
        setObjAnswers((prev) => ({ ...prev, [n]: prev[n] === c ? null : c })),
      onSubjectiveChange: (n, v) =>
        setSubjAnswers((prev) => ({ ...prev, [n]: v })),
      activeSubjective,
      onSubjectiveActivate: setActiveSubjective,
    }

    const canGoNext = (() => {
      if (step === 'objective-try') return objAnswers[7] === 3
      if (step === 'objective-erase') return objAnswers[7] == null
      if (step === 'multi-answer') return (multiObjAnswers[20] ?? []).length >= 2
      if (step === 'subjective-try') return (subjAnswers[4] ?? '').trim() !== ''
      return true
    })()

    const goNext = () => {
      if (step === 'timer') { onComplete(); return }
      if (stepIndex < STEPS.length - 1) setStepIndex((i) => i + 1)
    }

    const goPrev = () => {
      if (stepIndex > 0) setStepIndex((i) => i - 1)
    }

    return (
      <div className="flex flex-1 flex-col items-center overflow-hidden">
        <div className="flex w-full h-full max-h-[855px] flex-col max-w-[1020px]">
          {/* 단계별 본문 */}
          <div className={['flex flex-1 flex-col', ['intro', 'omr-intro'].includes(step) ? 'justify-center' : 'justify-start overflow-y-auto'].join(' ')}>
            {step === 'intro' && <TutorialIntroStep exam={exam} />}
            {step === 'omr-intro' && <TutorialOmrIntroStep exam={exam} />}
            {step === 'objective-try' && <TutorialObjectiveTryStep {...omrProps} />}
            {step === 'objective-erase' && <TutorialObjectiveEraseStep {...omrProps} />}
            {step === 'multi-answer' && <TutorialMultiAnswerStep {...omrProps} multiObjAnswers={multiObjAnswers} onMultiToggle={handleMultiToggle} />}
            {step === 'subjective-try' && <TutorialSubjectiveTryStep {...omrProps} />}
            {step === 'subjective-done' && <TutorialSubjectiveDoneStep {...omrProps} />}
            {step === 'timer' && <TutorialTimerStep />}
          </div>

          {/* 하단 내비게이션 */}
          <div className="flex h-[88px] w-full shrink-0 justify-center">
            <div className="flex w-full items-center justify-between px-[30px] pt-[20px] pb-[50px]">
              {stepIndex > 0 && (<div className="flex flex-1 justify-start">
                
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex h-[48px] items-center justify-center rounded-[10px] bg-white px-[24px] text-[15px] font-bold text-[#111] transition-colors hover:bg-[#eaeaea] shadow-sm"
                  >
                    ‹ 이전으로
                  </button>
              
              </div>
  )}
              <div className="flex flex-1 items-center justify-center gap-[10px]">     
                <button
                    type="button"
                    onClick={onSkip}
                    className="flex h-[48px] items-center justify-center rounded-[10px] bg-white px-[24px] text-[15px] font-bold text-[#111] transition-colors hover:bg-[#eaeaea] shadow-sm"
                  >
                    튜토리얼 건너뛰기
                  </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canGoNext}
                  className={[
                    'flex h-[48px] min-w-[140px] items-center justify-center rounded-[10px] px-[24px] text-[15px] font-bold transition-colors shadow-sm',
                    !canGoNext
                      ? 'bg-white text-[#d1d1d1] cursor-not-allowed'
                      : 'bg-[#424242] text-white hover:bg-[#333]'
                  ].join(' ')}
                >
                  {step === 'timer' ? '시험 화면으로 이동' : '다음'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
