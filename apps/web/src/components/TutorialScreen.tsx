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
import { TutorialSubmitStep } from './tutorial/TutorialSubmitStep'
import { TutorialCompleteStep } from './tutorial/TutorialCompleteStep'

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
  'submit',
  'complete',
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
    if (step === 'complete') { onComplete(); return }
    if (stepIndex < STEPS.length - 1) setStepIndex((i) => i + 1)
  }

  const goPrev = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1)
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* 단계별 본문 */}
      <div className="flex flex-1 overflow-hidden">
        {step === 'intro' && <TutorialIntroStep exam={exam} />}
        {step === 'omr-intro' && <TutorialOmrIntroStep exam={exam} />}
        {step === 'objective-try' && <TutorialObjectiveTryStep {...omrProps} />}
        {step === 'objective-erase' && <TutorialObjectiveEraseStep {...omrProps} />}
        {step === 'multi-answer' && <TutorialMultiAnswerStep {...omrProps} multiObjAnswers={multiObjAnswers} onMultiToggle={handleMultiToggle} />}
        {step === 'subjective-try' && <TutorialSubjectiveTryStep {...omrProps} />}
        {step === 'subjective-done' && <TutorialSubjectiveDoneStep {...omrProps} />}
        {step === 'timer' && <TutorialTimerStep />}
        {step === 'submit' && <TutorialSubmitStep />}
        {step === 'complete' && <TutorialCompleteStep />}
      </div>

      {/* 하단 내비게이션 */}
      <div className="flex shrink-0 items-center justify-between border-t border-[#e8e8e8] bg-white px-8 py-5">
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={goPrev}
            className="flex items-center gap-1 rounded-2xl border border-[#e8e8e8] bg-white px-6 py-3 text-[17px] font-bold text-[#090909] transition hover:bg-[#f5f5f5]"
          >
            ‹ 이전으로
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={onSkip}
          className="rounded-2xl border border-[#e8e8e8] bg-white px-6 py-3 text-[17px] font-bold text-[#090909] transition hover:bg-[#f5f5f5]"
        >
          튜토리얼 건너뛰기
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          className="rounded-2xl bg-[#090909] px-8 py-3 text-[17px] font-bold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-30"
        >
          {step === 'complete' ? '응시 시작' : '다음'}
        </button>
      </div>
    </div>
  )
}
