import type { ExamSummary } from '../../types'

type Props = { exam: ExamSummary | undefined }

export function TutorialIntroStep({ exam }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-12 p-10">
      <div className="flex items-center justify-center">
        {/* 겹쳐진 시험지 일러스트 */}
        <div className="relative h-[352px] w-[280px]">
          {[3, 2, 1].map((i) => (
            <div
              key={i}
              className="absolute rounded-xl border border-[#e8e8e8] bg-white shadow-sm"
              style={{ width: 280, height: 352, top: i * 8, left: i * 8, zIndex: 4 - i }}
            />
          ))}
          <div className="absolute left-0 top-0 z-10 flex h-[352px] w-[280px] flex-col rounded-xl border border-[#e8e8e8] bg-white p-[28px] shadow-[0_8px_16px_#00000008]">
            <p className="text-[20px] text-[#b6b6b6]">실전 모의고사</p>
            <p className="mt-2 text-[32px] font-bold tracking-tight text-[#090909]">
              {exam?.title ?? '공통수학2'}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 flex-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 rounded bg-[#f5f5f5]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 text-center mt-4">
        <p className="text-[20px] font-bold leading-[1.4] tracking-[-0.02em] text-[#090909]">
          모의고사 모드는 처음이시죠? 실전 모의고사는
          <br />
          실전과 최대한 비슷한 환경으로 진행돼요
        </p>
      </div>
    </div>
  )
}
