import { ExamOmrCard } from './ExamOmrCard'

type Props = {
  scale?: number
}

export function MiniOmrCard({ scale }: Props) {
  return (
    <div style={{ zoom: scale, flexShrink: 0 }}>
      <ExamOmrCard
        objectiveAnswers={{}}
        subjectiveAnswers={{}}
        activeSubjective={null}
        onObjectiveSelect={() => {}}
        onSubjectiveActivate={() => {}}
        onSubjectiveChange={() => {}}
        hideKeypad
      />
    </div>
  )
}
