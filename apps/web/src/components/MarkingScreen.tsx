import { useEffect, useState } from 'react'
import type { ExamSummary, StudentForm, SubmitPayload } from '../types'
import { ExamOmrCard } from './omr/ExamOmrCard'

const OBJECTIVE_QUESTIONS = Array.from({ length: 30 }, (_, i) => i + 1)
const SUBJECTIVE_QUESTIONS = Array.from({ length: 11 }, (_, i) => i + 1)
const EXAM_TOTAL_SEC = 20

type MarkingScreenProps = {
  exam: ExamSummary | undefined
  onSubmit: (payload: SubmitPayload) => void
  isSubmitting: boolean
  submitError: string | null
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function MarkingScreen({ exam, onSubmit, isSubmitting, submitError }: MarkingScreenProps) {
  const [remaining, setRemaining] = useState(EXAM_TOTAL_SEC)
  const [objectiveAnswers, setObjectiveAnswers] = useState<Record<number, number | null>>(
    () => Object.fromEntries(OBJECTIVE_QUESTIONS.map((n) => [n, null])) as Record<number, number | null>
  )
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<Record<number, string>>(
    () => Object.fromEntries(SUBJECTIVE_QUESTIONS.map((n) => [n, ''])) as Record<number, string>
  )
  const [activeSubjective, setActiveSubjective] = useState<number | null>(null)
  
  // -- 제출 모드 상태 (제출 완료 후, 결과 보기 눌렀을 때의 뷰 전환 용도) --
  const [submitScreenState, setSubmitScreenState] = useState<'idle' | 'submitted' | 'scanning'>('idle')

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining((s) => (s <= 1 ? 0 : s - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (remaining === 0) {
      setSubmitScreenState('submitted')
    }
  }, [remaining])

  const objCount = Object.values(objectiveAnswers).filter((v) => v != null).length
  const subjCount = Object.values(subjectiveAnswers).filter((v) => v.trim() !== '').length
  const isTimeWarning = remaining <= 5
  const progressPct = (remaining / EXAM_TOTAL_SEC) * 100

  const handleSubmit = () => {
    const answers: SubmitPayload['answers'] = []
    for (const n of OBJECTIVE_QUESTIONS) {
      if (objectiveAnswers[n] != null) answers.push({ answerType: 'objective', number: n, answer: objectiveAnswers[n]! })
    }
    for (const n of SUBJECTIVE_QUESTIONS) {
      const v = subjectiveAnswers[n]?.trim()
      if (v) answers.push({ answerType: 'subjective', number: n, answer: Number(v) })
    }
    // 제출 로직 트리거
    setSubmitScreenState('submitted')
  }

  const handleStartScan = () => {
    setSubmitScreenState('scanning')
    // 실제 서버로의 제출(결과 폼 이동)은 3초 후 시뮬레이션
    setTimeout(() => {
      const answers: SubmitPayload['answers'] = []
      for (const n of OBJECTIVE_QUESTIONS) {
        if (objectiveAnswers[n] != null) answers.push({ answerType: 'objective', number: n, answer: objectiveAnswers[n]! })
      }
      for (const n of SUBJECTIVE_QUESTIONS) {
        const v = subjectiveAnswers[n]?.trim()
        if (v) answers.push({ answerType: 'subjective', number: n, answer: Number(v) })
      }
      onSubmit({ name: '이름없음', school: '오류방지', grade: 1, studentNumber: 1, seatNumber: 1, answers })
    }, 3000)
  }

  // ----------------------------------------------------
  // 제출 완료 뷰 (결과 보기 전 / 스캔 중)
  // ----------------------------------------------------
  if (submitScreenState !== 'idle') {
    const isScanning = submitScreenState === 'scanning'
    return (
      <div className="relative flex flex-1 flex-col items-center overflow-hidden bg-[#F4F4F4]">
        {/* 오직 상단 우측 종류 버튼 පමණ 표시 */}
        <div className="absolute right-6 top-6">
          <button
            type="button"
            onClick={() => window.location.reload()} // 임시 종료 로직
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-[14px] font-bold text-[#090909] shadow-sm transition hover:bg-[#f5f5f5]"
          >
            종료하기
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center p-6 pt-16">
          <div className="relative flex w-[700px] justify-center" style={{ transform: 'scale(0.85)' }}>
            <div className="pointer-events-none opacity-80">
              <ExamOmrCard
                objectiveAnswers={objectiveAnswers}
                subjectiveAnswers={subjectiveAnswers}
                activeSubjective={null}
                onObjectiveSelect={() => {}}
                onSubjectiveActivate={() => {}}
                onSubjectiveChange={() => {}}
                hideKeypad
              />
            </div>
            
            {/* 띠링띠링 스캐너 애니메이션 레이저 막대 */}
            {isScanning && (
              <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[40px]">
                <div 
                  className="h-[120%] w-[2px] bg-red-500 absolute -top-[10%] animate-[scan_2s_ease-in-out_infinite_alternate]"
                  style={{
                    boxShadow: '0 0 15px 4px rgba(255, 0, 0, 0.6), -20px 0 40px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* 상하단 레이저 포인트 (위아래 살짝 튀어나온 붉은 점) */}
                  <div className="absolute -left-[4px] top-0 h-2 w-[10px] rounded-full bg-red-500" />
                  <div className="absolute -left-[4px] bottom-0 h-2 w-[10px] rounded-full bg-red-500" />
                </div>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes scan {
                    0% { transform: translateX(0px); }
                    100% { transform: translateX(700px); }
                  }
                `}} />
              </div>
            )}
          </div>

          <div className="mt-[20px] flex flex-col items-center text-center">
            {isScanning ? (
              <>
                <h1 className="mb-2 text-[26px] font-extrabold text-[#090909]">OMR 카드 스캔중...</h1>
                <h2 className="text-[20px] font-extrabold text-[#090909] mb-[40px]">곧 결과가 나와요</h2>
                <div className="flex h-12 w-[180px] cursor-not-allowed items-center justify-center rounded-xl bg-white text-[16px] font-bold text-[#A4A4A4] shadow-sm">
                  과연 몇 점일까요?
                </div>
              </>
            ) : (
              <>
                <h1 className="mb-2 text-[26px] font-extrabold text-[#090909]">제출 완료!</h1>
                <h2 className="text-[20px] font-extrabold text-[#090909] mb-[40px]">고생 많았어요. 결과를 바로 확인해볼까요?</h2>
                <button
                  type="button"
                  onClick={handleStartScan}
                  className="flex h-12 w-[180px] items-center justify-center rounded-xl bg-[#444444] text-[16px] font-bold text-white shadow-md transition hover:bg-[#333] active:scale-95"
                >
                  결과 보기
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ----------------------------------------------------
  // 일반 입력 화면
  // ----------------------------------------------------
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* 상단 진행 바 */}
      <div className="flex items-center gap-4 border-b border-[#e8e8e8] bg-white px-8 py-3">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[#858585]">남은 시간</span>
          <span className={[
            'text-[20px] font-bold tabular-nums tracking-[-0.02em]',
            isTimeWarning ? 'text-red-500' : 'text-[#090909]',
          ].join(' ')}>
            {formatTime(remaining)}
          </span>
        </div>
        <div className="mx-2 h-5 w-px bg-[#e8e8e8]" />
        <span className="text-[13px] text-[#858585]">
          응답 <span className="font-bold text-[#090909]">{objCount + subjCount}</span> / {exam?.totalQuestions ?? 25}
        </span>
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-xl bg-[#090909] px-6 py-2 text-[14px] font-bold text-white transition hover:bg-[#333] disabled:opacity-40"
          >
            {isSubmitting ? '제출 중...' : '답안 제출'}
          </button>
        </div>
      </div>

      {/* OMR 본체 */}
      <div className="flex-1 overflow-y-auto pt-6" style={{ paddingBottom: isTimeWarning ? '72px' : undefined }}>
        <div className="mx-auto">
          <ExamOmrCard
            objectiveAnswers={objectiveAnswers}
            subjectiveAnswers={subjectiveAnswers}
            onObjectiveSelect={(n, c) =>
              setObjectiveAnswers((prev) => ({ ...prev, [n]: prev[n] === c ? null : c }))
            }
            onSubjectiveChange={(n, v) =>
              setSubjectiveAnswers((prev) => ({ ...prev, [n]: v }))
            }
            activeSubjective={activeSubjective}
            onSubjectiveActivate={setActiveSubjective}
          />
        </div>
      </div>

      {/* 하단 타이머 바 */}
      <div className="shrink-0">
        <div className="flex items-center justify-between bg-white px-8 py-3">
          <div>
            {isTimeWarning ? (
              <>
                <p className="text-[12px] font-bold text-red-500">시험이 곧 종료됩니다</p>
                <p className="text-[18px] font-bold text-[#090909]">
                  {remaining}초 뒤에 자동으로 제출됩니다. 답안을 모두 입력해주세요.
                </p>
              </>
            ) : (
              <>
                <p className="text-[12px] text-[#858585]">시험 진행 중</p>
                <p className="text-[18px] font-bold text-[#090909]">
                  남은 시간 <span className="tabular-nums">{formatTime(remaining)}</span>
                </p>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[13px] text-[#858585]">시험 시간 {EXAM_TOTAL_SEC >= 60 ? `${Math.floor(EXAM_TOTAL_SEC / 60)}분` : `${EXAM_TOTAL_SEC}초`}</p>
          </div>
        </div>
        <div className="h-[6px] w-full bg-[#e8e8e8]">
          <div
            className="h-full bg-[#364F8E] transition-all duration-1000 ease-linear"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
