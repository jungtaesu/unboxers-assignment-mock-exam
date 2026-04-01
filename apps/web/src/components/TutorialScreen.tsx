import { useState } from 'react'
import type { ExamSummary, TutorialStep } from '../types'
import { OmrCard } from './OmrCard'

type TutorialScreenProps = {
  exam: ExamSummary | undefined
  onSkip: () => void
  onComplete: () => void
}

// 튜토리얼 단계 순서
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

  // 튜토리얼용 연습 상태
  const [practiceObjAnswers, setPracticeObjAnswers] = useState<Record<number, number | null>>(
    { 15: null }
  )
  const [practiceSubjAnswers, setPracticeSubjAnswers] = useState<Record<number, string>>(
    Object.fromEntries(Array.from({ length: 11 }, (_, i) => [i + 1, '']))
  )
  const [activeSubjective, setActiveSubjective] = useState<number | null>(null)

  const canGoNext = (() => {
    if (step === 'objective-try') return practiceObjAnswers[15] === 3
    if (step === 'objective-erase') return practiceObjAnswers[15] == null
    if (step === 'subjective-try') return practiceSubjAnswers[4]?.trim() !== ''
    return true
  })()

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) setStepIndex((i) => i + 1)
    else onComplete()
  }

  const goPrev = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1)
  }

  const isOmrStep = ['objective-try', 'objective-erase', 'multi-answer', 'subjective-try', 'subjective-done'].includes(step)

  const instruction = INSTRUCTIONS[step]

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* OMR 영역 (해당 단계에서만) */}
      {isOmrStep && (
        <div className="flex flex-1 items-start justify-center overflow-y-auto p-6 pb-0">
          <div className="w-full max-w-3xl">
            <OmrCard
              objectiveAnswers={practiceObjAnswers}
              subjectiveAnswers={practiceSubjAnswers}
              onObjectiveSelect={(num, choice) => {
                setPracticeObjAnswers((prev) => ({
                  ...prev,
                  [num]: prev[num] === choice ? null : choice,
                }))
              }}
              onSubjectiveChange={(num, val) => {
                setPracticeSubjAnswers((prev) => ({ ...prev, [num]: val }))
              }}
              tutorialObjectiveLock={
                ['objective-try', 'objective-erase'].includes(step) ? 15 : undefined
              }
              tutorialSubjectiveLock={
                ['subjective-try', 'subjective-done'].includes(step) ? 4 : undefined
              }
              activeSubjective={activeSubjective}
              onSubjectiveActivate={setActiveSubjective}
            />
          </div>
        </div>
      )}

      {/* 일러스트 영역 (1~2장) */}
      {['intro', 'omr-intro'].includes(step) && (
        <div className="flex flex-1 items-center justify-center gap-8 p-10">
          {/* 시험지 일러스트 */}
          <div className="relative w-48">
            {[3, 2, 1].map((i) => (
              <div
                key={i}
                className="absolute rounded-xl border border-[#e8e8e8] bg-white shadow-[0_8px_16px_#00000008]"
                style={{ width: 160, height: 210, top: i * 5, left: i * 4, zIndex: 4 - i }}
              />
            ))}
            <div className="relative z-10 flex h-[210px] w-40 flex-col rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-[0_8px_16px_#00000008]">
              <p className="text-[11px] text-[#b6b6b6]">실전 모의고사</p>
              <p className="mt-1 text-[22px] font-bold tracking-tight text-[#090909]">
                {exam?.title ?? '공통수학2'}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-6 rounded bg-[#f5f5f5]" />
                ))}
              </div>
            </div>
          </div>

          {/* OMR 카드 미리보기 (2장에서만) */}
          {step === 'omr-intro' && (
            <div className="h-[210px] w-64 overflow-hidden rounded-xl border border-[#e8e8e8] bg-white p-3 shadow-[0_8px_16px_#00000008]">
              <div className="mb-2 flex gap-4">
                <div className="w-20">
                  <p className="mb-1 text-[9px] font-bold text-[#364F8E]">TEN-UP BRAIN</p>
                  <div className="space-y-1">
                    {['이름', '학교', '베이스고등학교', '학번', '번호'].map((t) => (
                      <div key={t} className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full border border-[#b6b6b6]" />
                        <p className="text-[8px] text-[#b6b6b6]">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-center text-[9px] font-bold text-[#090909]">객 관 식 답 안</p>
                  <div className="grid grid-cols-5 gap-[2px]">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div key={i} className="h-3 w-3 rounded-full bg-[#f5f5f5]" />
                    ))}
                  </div>
                </div>
                <div className="w-20">
                  <p className="mb-1 text-center text-[9px] font-bold text-[#090909]">주 관 식 답 안</p>
                  <div className="space-y-0.5">
                    {Array.from({ length: 11 }).map((_, i) => (
                      <div key={i} className="h-3 w-full rounded bg-[#f5f5f5]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 완료 화면 */}
      {step === 'complete' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#090909]">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M8 18L15 25L28 11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[13px] text-[#858585]">다음으로 넘어가려면 직접 해보세요</p>
            <p className="mt-3 text-[28px] font-bold leading-tight tracking-[-0.02em] text-[#090909]">
              튜토리얼을 완료했어요
            </p>
            <p className="mt-2 text-[17px] text-[#858585]">
              이제 실전 모의고사를 응시할 준비가 됐어요
            </p>
          </div>
        </div>
      )}

      {/* 안내 문구 */}
      <div className="flex flex-col items-center px-6 pb-2 pt-4">
        {instruction.hint && (
          <button
            type="button"
            className="mb-2 flex items-center gap-1 text-[13px] text-[#858585]"
          >
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#858585" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {instruction.hint}
          </button>
        )}
        <p
          className="text-center text-[26px] font-bold leading-snug tracking-[-0.02em] text-[#090909]"
          dangerouslySetInnerHTML={{ __html: instruction.main }}
        />
      </div>

      {/* 하단 버튼 */}
      <div className="flex items-center justify-between border-t border-[#e8e8e8] bg-white px-8 py-5">
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={goPrev}
            className="flex items-center gap-1 rounded-2xl border border-[#e8e8e8] bg-white px-6 py-3 text-[17px] font-bold text-[#090909] transition hover:bg-[#f5f5f5]"
          >
            <span className="text-[14px]">‹</span> 이전으로
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
          onClick={step === 'complete' ? onComplete : goNext}
          disabled={!canGoNext}
          className="rounded-2xl bg-[#090909] px-8 py-3 text-[17px] font-bold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-30"
        >
          {step === 'complete' ? '응시 시작' : '다음'}
        </button>
      </div>
    </div>
  )
}

const INSTRUCTIONS: Record<TutorialStep, { hint?: string; main: string }> = {
  intro: {
    main: '모의고사 모드는 처음이시죠? 실전 모의고사는<br/>실전과 최대한 비슷한 환경으로 진행돼요',
  },
  'omr-intro': {
    main: '실제 시험지 크기에 인쇄된 시험지에 문제를 풀고<br/>화면에 표시된 OMR카드에 답을 마킹해요',
  },
  'objective-try': {
    hint: '다음으로 넘어가려면 직접 해보세요',
    main: '객관식 답안은 화면을 터치해서 마킹해요<br/><span style="color:#5784F1">15번 문제</span>에 <span style="color:#5784F1">3번</span>으로 답안을 마킹해보세요',
  },
  'objective-erase': {
    hint: '다음으로 넘어가려면 직접 해보세요',
    main: '마킹한 곳을 한 번 더 터치하면 지울 수 있어요<br/><span style="color:#5784F1">15번 문제</span>에 <span style="color:#5784F1">3번</span> 답안을 지워보세요',
  },
  'multi-answer': {
    hint: '좋아요! 다음으로 넘어갈까요?',
    main: '2개 이상의 답안을 골라야 하는 문제에서는<br/>두 답안 모두 마킹하면 돼요',
  },
  'subjective-try': {
    hint: '다음으로 넘어가려면 직접 해보세요',
    main: '주관식 답안을 입력하려면 입력할 곳을 터치해요<br/><span style="color:#5784F1">4번 문제</span>의 답안을 입력해볼까요?',
  },
  'subjective-done': {
    hint: '좋아요! 다음으로 넘어갈까요?',
    main: '이제 주관식 답안을 입력할 수 있어요<br/>입력한 곳을 다시 터치하면 수정할 수 있어요',
  },
  timer: {
    main: '화면 상단에 남은 시간이 표시돼요<br/>시험 시간이 끝나기 <span style="color:#5784F1">10분 전</span>부터는 빨간색으로 바뀌어요',
  },
  submit: {
    main: '답안 작성이 끝나면 <span style="color:#5784F1">제출하기</span> 버튼을 눌러요<br/>제출하면 즉시 채점 결과를 확인할 수 있어요',
  },
  complete: {
    main: '',
  },
}
