import type { OmrPracticeProps } from '../../types'
import { OmrCard } from '../omr/OmrCard'

export function TutorialSubjectiveDoneStep(props: OmrPracticeProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 items-start justify-center overflow-auto p-6">
        <OmrCard
          objectiveAnswers={props.objectiveAnswers}
          subjectiveAnswers={props.subjectiveAnswers}
          onObjectiveSelect={(num, choice) => props.onObjectiveToggle(num, choice)}
          onSubjectiveChange={props.onSubjectiveChange}
          subjectiveOnly
          activeSubjective={props.activeSubjective}
          onSubjectiveActivate={props.onSubjectiveActivate}
        />
      </div>
      <div className="px-8 pb-4 pt-2 text-center">
        <p className="mb-1.5 text-[13px] text-[#858585]">좋아요! 다음으로 넘어갈까요?</p>
        <p className="text-[26px] font-bold leading-snug tracking-[-0.02em] text-[#090909]">
          이제 주관식 답안을 입력할 수 있어요
          <br />
          입력한 곳을 다시 터치하면 수정할 수 있어요
        </p>
      </div>
    </div>
  )
}
