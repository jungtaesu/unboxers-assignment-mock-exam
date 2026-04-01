export function TutorialTimerStep() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center p-10">
        {/* 화면 상단 바 mockup */}
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#e0e0e0] bg-white shadow-[0_8px_24px_#0000000C]">
          {/* 헤더 바 */}
          <div className="flex items-center gap-4 border-b border-[#e8e8e8] px-6 py-4">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#364F8E" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[22px] font-bold tabular-nums tracking-[-0.02em] text-[#090909]">
                01:40:00
              </span>
            </div>
            <div className="mx-2 h-5 w-px bg-[#e8e8e8]" />
            <span className="text-[13px] text-[#858585]">
              응답 <span className="font-bold text-[#090909]">0</span> / 25
            </span>
          </div>

          {/* 10분 이하 경고 미리보기 */}
          <div className="flex items-center gap-4 px-6 py-4">
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[22px] font-bold tabular-nums text-red-500">00:09:59</span>
            </div>
            <p className="text-[13px] text-[#858585]">← 10분 이하 시 빨간색</p>
          </div>
        </div>
      </div>

      <div className="px-8 pb-4 pt-2 text-center">
        <p className="text-[26px] font-bold leading-snug tracking-[-0.02em] text-[#090909]">
          화면 상단에 남은 시간이 표시돼요
          <br />
          시험 시간이 끝나기{' '}
          <span className="text-[#5784F1]">10분 전</span>부터는 빨간색으로 바뀌어요
        </p>
      </div>
    </div>
  )
}
