import type { OmrPracticeProps } from '../../types'
import { OmrCard } from '../omr/OmrCard'

export function TutorialObjectiveTryStep(props: OmrPracticeProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 items-start justify-center overflow-auto p-6 pt-0">
        <OmrCard
          objectiveAnswers={props.objectiveAnswers}
          subjectiveAnswers={props.subjectiveAnswers}
          onObjectiveSelect={(num, choice) => props.onObjectiveToggle(num, choice)}
          onSubjectiveChange={props.onSubjectiveChange}
          tutorialObjectiveLock={7}
          activeSubjective={props.activeSubjective}
          onSubjectiveActivate={props.onSubjectiveActivate}
          objectiveOnly30
        />
      </div>
      <div className="px-8 pb-4 pt-2 text-center">
        <p className="mb-1.5 text-[13px] text-[#858585]">다음으로 넘어가려면 직접 해보세요</p>
        <p className="text-[26px] font-bold leading-snug tracking-[-0.02em] text-[#090909]">
          객관식 답안은 화면을 터치해서 마킹해요
          <br />
          <span className="text-[#5784F1]">7번 문제</span>에{' '}
          <span className="text-[#5784F1]">3번</span>으로 답안을 마킹해보세요
        </p>
      </div>
    </div>
  )
}
