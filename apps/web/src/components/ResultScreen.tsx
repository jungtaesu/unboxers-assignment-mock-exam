import type { SubmitResponse, GradeResult } from '../types'

type ResultScreenProps = {
  result: SubmitResponse
  onRetry: () => void
}

const RESULT_LABEL: Record<GradeResult, string> = {
  correct: '정답',
  wrong: '오답',
  unanswered: '미응답',
  duplicated: '중복',
}

const RESULT_STYLE: Record<GradeResult, string> = {
  correct: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  wrong: 'border-rose-200 bg-rose-50 text-rose-700',
  unanswered: 'border-[#e8e8e8] bg-[#f5f5f5] text-[#858585]',
  duplicated: 'border-amber-200 bg-amber-50 text-amber-700',
}

export function ResultScreen({ result, onRetry }: ResultScreenProps) {

  const objectiveResults = result.results.filter((r) => r.answerType === 'objective')
  const subjectiveResults = result.results.filter((r) => r.answerType === 'subjective')

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-5">
        {/* 총점 카드 */}
        <div className="flex items-center justify-between rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-[0_8px_16px_#00000008]">
          <div>
            <p className="text-[13px] font-bold tracking-[0.06em] text-[#b6b6b6]">채점 결과</p>
            <p className="mt-1 text-[32px] font-bold tracking-[-0.02em] text-[#090909]">
              {result.score}점
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-[24px] font-bold text-emerald-600">{result.correctCount}</p>
              <p className="text-[12px] text-[#858585]">정답</p>
            </div>
            <div className="text-center">
              <p className="text-[24px] font-bold text-rose-500">{result.wrongCount}</p>
              <p className="text-[12px] text-[#858585]">오답</p>
            </div>
            <div className="text-center">
              <p className="text-[24px] font-bold text-[#b6b6b6]">{result.unansweredCount}</p>
              <p className="text-[12px] text-[#858585]">미응답</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="rounded-2xl border border-[#e8e8e8] bg-white px-6 py-3 text-[15px] font-bold text-[#090909] transition hover:bg-[#f5f5f5]"
          >
            다시 응시하기
          </button>
        </div>

        {/* 객관식 결과 */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-[0_8px_16px_#00000008]">
          <p className="mb-4 text-[15px] font-bold tracking-[-0.02em] text-[#090909]">객관식 결과</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {objectiveResults.map((entry) => (
              <div
                key={entry.number}
                className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${RESULT_STYLE[entry.result]}`}
              >
                <span className="text-[14px] font-bold">{entry.number}번</span>
                <span className="text-[12px] font-bold">{RESULT_LABEL[entry.result]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 주관식 결과 */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-[0_8px_16px_#00000008]">
          <p className="mb-4 text-[15px] font-bold tracking-[-0.02em] text-[#090909]">주관식 결과</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {subjectiveResults.map((entry) => (
              <div
                key={entry.number}
                className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${RESULT_STYLE[entry.result]}`}
              >
                <span className="text-[14px] font-bold">{entry.number}번</span>
                <span className="text-[12px] font-bold">{RESULT_LABEL[entry.result]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
