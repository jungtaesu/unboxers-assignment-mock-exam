import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { AppStep, ExamSummary, SubmitPayload, SubmitResponse } from './types'
import { Header } from './components/Header'
import { TutorialScreen } from './components/TutorialScreen'
import { MarkingScreen } from './components/MarkingScreen'
import { ResultScreen } from './components/ResultScreen'

async function fetchExamSummary(): Promise<ExamSummary> {
  const res = await fetch('/api/exams')
  if (!res.ok) throw new Error('시험 정보를 불러오지 못했습니다.')
  const json = (await res.json()) as { data: ExamSummary }
  return json.data
}

async function submitExam(payload: SubmitPayload): Promise<SubmitResponse> {
  const res = await fetch('/api/exams/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('답안 제출에 실패했습니다.')
  const json = (await res.json()) as { data: SubmitResponse }
  return json.data
}

function App() {
  const { data: exam } = useQuery({ queryKey: ['exam'], queryFn: fetchExamSummary })
  const submitMutation = useMutation({ mutationFn: submitExam })
  const [step, setStep] = useState<AppStep>('tutorial')

  const handleComplete = () => setStep('marking')

  const handleSubmit = (payload: SubmitPayload) => {
    submitMutation.mutate(payload, { onSuccess: () => setStep('result') })
  }

  const handleRetry = () => {
    submitMutation.reset()
    setStep('tutorial')
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f5f5f5]">
      <Header studentName={undefined} onHome={handleRetry} />
      {step === 'tutorial' && (
        <TutorialScreen exam={exam} onSkip={handleComplete} onComplete={handleComplete} />
      )}
      {step === 'marking' && (
        <MarkingScreen
          exam={exam}
          onSubmit={handleSubmit}
          isSubmitting={submitMutation.isPending}
          submitError={
            submitMutation.isError
              ? submitMutation.error instanceof Error
                ? submitMutation.error.message
                : '제출 오류'
              : null
          }
        />
      )}
      {step === 'result' && submitMutation.data && (
        <ResultScreen result={submitMutation.data} onRetry={handleRetry} />
      )}
    </div>
  )
}

export default App
