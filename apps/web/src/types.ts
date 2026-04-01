export type AppStep = 'tutorial' | 'marking' | 'result'

export type TutorialStep =
  | 'intro'          // 1장: 처음이시죠?
  | 'omr-intro'      // 2장: 시험지+OMR카드 설명
  | 'objective-try'  // 3장: 7번 3번 마킹해보세요
  | 'objective-erase'// 4장: 마킹한 곳 지워보세요
  | 'multi-answer'   // 5장: 2개 이상 답안 안내
  | 'subjective-try' // 6장: 주관식 입력해보세요
  | 'subjective-done'// 7장: 주관식 입력 완료
  | 'timer'          // 8장: 타이머 안내
  | 'submit'         // 9장: 제출 안내
  | 'complete'       // 10장: 튜토리얼 완료

/** 튜토리얼 OMR 연습 단계에서 공유하는 상태 */
export type OmrPracticeProps = {
  objectiveAnswers: Record<number, number | null>
  subjectiveAnswers: Record<number, string>
  onObjectiveToggle: (num: number, choice: number) => void
  onSubjectiveChange: (num: number, val: string) => void
  activeSubjective: number | null
  onSubjectiveActivate: (num: number | null) => void
}

export type AnswerType = 'objective' | 'subjective'
export type GradeResult = 'correct' | 'wrong' | 'unanswered' | 'duplicated'

export type ExamSummary = {
  title: string
  description: string
  supervisorName: string
  totalQuestions: number
  totalScore: number
}

export type StudentForm = {
  name: string
  school: string
  grade: string
  studentNumber: string
  seatNumber: string
}

export type SubmitPayload = {
  name: string
  school: string
  grade: number
  studentNumber: number
  seatNumber: number
  answers: Array<{
    answerType: AnswerType
    number: number
    answer: number
  }>
}

export type SubmitResponse = {
  title: string
  score: number
  correctCount: number
  wrongCount: number
  unansweredCount: number
  results: Array<{
    answerType: AnswerType
    number: number
    result: GradeResult
  }>
}
