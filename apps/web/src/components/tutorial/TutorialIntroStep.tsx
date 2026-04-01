import type { ExamSummary } from '../../types'

type Props = { exam: ExamSummary | undefined }

export function TutorialIntroStep({ exam }: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center gap-10 p-10">
        {/* 겹쳐진 시험지 일러스트 */}
        <div className="relative h-[220px] w-52">
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
      </div>

      <div className="px-8 pb-4 pt-2 text-center">
        <p className="text-[26px] font-bold leading-snug tracking-[-0.02em] text-[#090909]">
          모의고사 모드는 처음이시죠? 실전 모의고사는
          <br />
          실전과 최대한 비슷한 환경으로 진행돼요
        </p>
      </div>
    </div>
  )
}
