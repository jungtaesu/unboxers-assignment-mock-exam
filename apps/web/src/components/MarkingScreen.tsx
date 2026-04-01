import { useEffect, useState } from 'react'
import type { ExamSummary, StudentForm, SubmitPayload } from '../types'
import { OmrCard } from './OmrCard'

const OBJECTIVE_QUESTIONS = Array.from({ length: 14 }, (_, i) => i + 1)
const SUBJECTIVE_QUESTIONS = Array.from({ length: 11 }, (_, i) => i + 1)
const EXAM_MINUTES = 100

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
  const [remaining, setRemaining] = useState(EXAM_MINUTES * 60)
  const [objectiveAnswers, setObjectiveAnswers] = useState<Record<number, number | null>>(
    () => Object.fromEntries(OBJECTIVE_QUESTIONS.map((n) => [n, null])) as Record<number, number | null>
  )
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<Record<number, string>>(
    () => Object.fromEntries(SUBJECTIVE_QUESTIONS.map((n) => [n, ''])) as Record<number, string>
  )
  const [activeSubjective, setActiveSubjective] = useState<number | null>(null)
  const [student, setStudent] = useState<StudentForm>({
    name: '', school: '', grade: '1', studentNumber: '', seatNumber: '',
  })
  const [validMsg, setValidMsg] = useState('')
  const [showStudentForm, setShowStudentForm] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining((s) => (s <= 1 ? 0 : s - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const objCount = Object.values(objectiveAnswers).filter((v) => v != null).length
  const subjCount = Object.values(subjectiveAnswers).filter((v) => v.trim() !== '').length
  const isTimeWarning = remaining < 600 // 10분 이하

  const handleSubmit = () => {
    if (!student.name.trim() || !student.school.trim()) {
      setValidMsg('이름과 학교명을 입력해 주세요.')
      setShowStudentForm(true)
      return
    }
    const grade = Number(student.grade)
    const studentNumber = Number(student.studentNumber)
    const seatNumber = Number(student.seatNumber)
    if (!Number.isInteger(grade) || grade <= 0) { setValidMsg('학년을 올바르게 입력해 주세요.'); setShowStudentForm(true); return }
    if (!Number.isInteger(studentNumber) || studentNumber <= 0) { setValidMsg('학생 번호를 올바르게 입력해 주세요.'); setShowStudentForm(true); return }
    if (!Number.isInteger(seatNumber) || seatNumber <= 0) { setValidMsg('좌석 번호를 올바르게 입력해 주세요.'); setShowStudentForm(true); return }
    setValidMsg('')

    const answers: SubmitPayload['answers'] = []
    for (const n of OBJECTIVE_QUESTIONS) {
      if (objectiveAnswers[n] != null) answers.push({ answerType: 'objective', number: n, answer: objectiveAnswers[n]! })
    }
    for (const n of SUBJECTIVE_QUESTIONS) {
      const v = subjectiveAnswers[n]?.trim()
      if (v) answers.push({ answerType: 'subjective', number: n, answer: Number(v) })
    }
    onSubmit({ name: student.name.trim(), school: student.school.trim(), grade, studentNumber, seatNumber, answers })
  }

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
            onClick={() => setShowStudentForm((v) => !v)}
            className="rounded-xl border border-[#e8e8e8] bg-white px-4 py-2 text-[14px] font-bold text-[#090909] transition hover:bg-[#f5f5f5]"
          >
            학생 정보 {showStudentForm ? '닫기' : '입력'}
          </button>
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

      {/* 학생 정보 폼 (토글) */}
      {showStudentForm && (
        <div className="border-b border-[#e8e8e8] bg-[#fafafa] px-8 py-4">
          <div className="flex flex-wrap gap-3">
            {([
              { field: 'name', label: '이름', placeholder: '홍길동', mode: 'text' },
              { field: 'school', label: '학교', placeholder: '베이스고', mode: 'text' },
              { field: 'grade', label: '학년', placeholder: '1', mode: 'numeric' },
              { field: 'studentNumber', label: '학생 번호', placeholder: '12', mode: 'numeric' },
              { field: 'seatNumber', label: '좌석 번호', placeholder: '3', mode: 'numeric' },
            ] as const).map(({ field, label, placeholder, mode }) => (
              <label key={field} className="grid gap-1 text-[13px] font-bold text-[#090909]">
                {label}
                <input
                  inputMode={mode === 'numeric' ? 'numeric' : 'text'}
                  value={student[field]}
                  onChange={(e) => setStudent((prev) => ({ ...prev, [field]: e.target.value }))}
                  placeholder={placeholder}
                  className="h-10 w-36 rounded-xl border border-[#e8e8e8] bg-white px-3 text-[15px] font-normal outline-none transition focus:border-[#090909]"
                />
              </label>
            ))}
          </div>
          {validMsg && (
            <p className="mt-2 text-[13px] text-red-500">{validMsg}</p>
          )}
          {submitError && (
            <p className="mt-2 text-[13px] text-red-500">{submitError}</p>
          )}
        </div>
      )}

      {/* OMR 본체 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl">
          <OmrCard
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
    </div>
  )
}
