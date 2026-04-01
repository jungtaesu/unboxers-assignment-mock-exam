import type { ExamSummary } from '../../types'

type Props = { exam: ExamSummary | undefined }

export function TutorialOmrIntroStep({ exam }: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center gap-12 p-10">
        {/* 시험지 일러스트 */}
        <div className="relative h-[220px] w-52 shrink-0">
          {[3, 2, 1].map((i) => (
            <div
              key={i}
              className="absolute rounded-xl border border-[#e8e8e8] bg-white shadow-sm"
              style={{ width: 172, height: 220, top: i * 6, left: i * 5, zIndex: 4 - i }}
            />
          ))}
          <div className="absolute left-0 top-0 z-10 flex h-[220px] w-44 flex-col rounded-xl border border-[#e8e8e8] bg-white p-5 shadow-[0_8px_16px_#00000008]">
            <p className="text-[11px] text-[#b6b6b6]">실전 모의고사</p>
            <p className="mt-1 text-[20px] font-bold tracking-tight text-[#090909]">
              {exam?.title ?? '공통수학2'}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-5 rounded bg-[#f5f5f5]" />
              ))}
            </div>
          </div>
        </div>

        {/* OMR 카드 미니어처 */}
        <div className="h-[220px] w-80 shrink-0 overflow-hidden rounded-xl border border-[#dde0e8] bg-white shadow-[0_8px_16px_#00000008]">
          {/* 헤더 */}
          <div className="flex gap-0 bg-[#364F8E]">
            <div className="w-20 px-2 py-1.5">
              <p className="text-[7px] font-bold tracking-wider text-white">TEN-UP BRAIN</p>
            </div>
            <div className="flex-1 border-l border-white/20 px-2 py-1.5 text-center">
              <p className="text-[7px] font-bold tracking-[0.2em] text-white">객 관 식 답 안</p>
            </div>
            <div className="w-24 border-l border-white/20 px-2 py-1.5 text-center">
              <p className="text-[7px] font-bold tracking-[0.2em] text-white">주 관 식 답 안</p>
            </div>
          </div>

          <div className="flex h-full gap-0">
            {/* 학생 정보 사이드 */}
            <div className="flex w-20 flex-col gap-1 p-2">
              {['이름', '학교', '학번', '번호', '감독관'].map((t) => (
                <div key={t} className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full border border-[#b6b6b6]" />
                  <p className="text-[7px] text-[#888]">{t}</p>
                </div>
              ))}
            </div>

            {/* 객관식 미니 그리드 */}
            <div className="flex flex-1 flex-wrap content-start gap-[3px] border-l border-[#eeeff2] p-2 pt-2">
              {Array.from({ length: 70 }).map((_, i) => (
                <div key={i} className="h-2.5 w-3 rounded-full bg-[#f2f3f5]" />
              ))}
            </div>

            {/* 주관식 미니 목록 */}
            <div className="flex w-24 flex-col gap-1 border-l border-[#eeeff2] p-2">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="h-3 w-full rounded bg-[#f2f3f5]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-4 pt-2 text-center">
        <p className="text-[26px] font-bold leading-snug tracking-[-0.02em] text-[#090909]">
          실제 시험지 크기에 인쇄된 시험지에 문제를 풀고
          <br />
          화면에 표시된 OMR카드에 답을 마킹해요
        </p>
      </div>
    </div>
  )
}
