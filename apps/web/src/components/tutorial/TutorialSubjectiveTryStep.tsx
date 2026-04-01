import type { OmrPracticeProps } from '../../types'
import { OmrCard } from '../OmrCard'

export function TutorialSubjectiveTryStep(props: OmrPracticeProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 items-start justify-center overflow-auto p-6 pt-0">
        <OmrCard
          objectiveAnswers={props.objectiveAnswers}
          subjectiveAnswers={props.subjectiveAnswers}
          onObjectiveSelect={(num, choice) => props.onObjectiveToggle(num, choice)}
          onSubjectiveChange={props.onSubjectiveChange}
          tutorialSubjectiveLock={4}
          subjectiveOnly
          activeSubjective={props.activeSubjective}
          onSubjectiveActivate={props.onSubjectiveActivate}
        />
      </div>
      <div className="px-8 pb-4 pt-2 text-center">
        <p className="mb-1.5 text-[13px] text-[#858585]">다음으로 넘어가려면 직접 해보세요</p>
        <p className="text-[26px] font-bold leading-snug tracking-[-0.02em] text-[#090909]">
          주관식 답안을 입력하려면 입력할 곳을 터치해요
          <br />
          <span className="text-[#5784F1]">4번 문제</span>의 답안을 입력해볼까요?
        </p>
      </div>
    </div>
  )
}
