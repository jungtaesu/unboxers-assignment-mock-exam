import type { OmrPracticeProps } from '../../types'
import { OmrCard } from '../omr/OmrCard'

type MultiAnswerStepProps = OmrPracticeProps & {
  multiObjAnswers: Record<number, number[]>
  onMultiToggle: (qn: number, c: number) => void
}

export function TutorialMultiAnswerStep({ multiObjAnswers, onMultiToggle, ...props }: MultiAnswerStepProps) {
  const selected = multiObjAnswers[20] ?? []
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 items-start justify-center overflow-auto">
        <OmrCard
          objectiveAnswers={props.objectiveAnswers}
          subjectiveAnswers={props.subjectiveAnswers}
          onObjectiveSelect={(num, choice) => props.onObjectiveToggle(num, choice)}
          onSubjectiveChange={props.onSubjectiveChange}
          activeSubjective={props.activeSubjective}
          onSubjectiveActivate={props.onSubjectiveActivate}
          tutorialObjectiveLock={20}
          multiObjectiveAnswers={multiObjAnswers}
          onMultiObjectiveToggle={onMultiToggle}
          objectiveOnly30
        />
      </div>
      <div className="px-8 pb-4 pt-2 text-center">
        <p className="mb-1.5 text-[13px] text-[#858585]">
          20번 문항에서 두 가지 답안을 선택해보세요 ({selected.length}/2)
        </p>
        <p className="text-[26px] font-bold leading-snug tracking-[-0.02em] text-[#090909]">
          2개 이상의 답안을 골라야 하는 문제에서는
          <br />두 답안 모두 마킹하면 돼요
        </p>
      </div>
    </div>
  )
}
