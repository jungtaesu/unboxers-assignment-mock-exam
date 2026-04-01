export function TutorialSubmitStep() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center p-10">
        {/* 제출 버튼 mockup */}
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#e0e0e0] bg-white shadow-[0_8px_24px_#0000000C]">
          <div className="flex items-center gap-4 border-b border-[#e8e8e8] px-6 py-4">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#364F8E" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[22px] font-bold tabular-nums text-[#090909]">00:30:00</span>
            </div>
            <div className="mx-2 h-5 w-px bg-[#e8e8e8]" />
            <span className="text-[13px] text-[#858585]">
              응답 <span className="font-bold text-[#090909]">22</span> / 25
            </span>
            <div className="ml-auto">
              <div className="rounded-xl bg-[#090909] px-6 py-2 text-[14px] font-bold text-white shadow-sm ring-2 ring-[#364F8E] ring-offset-2">
                답안 제출
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 px-6 py-5 text-[13px] text-[#858585]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5784F1" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            답안 작성이 끝나면 오른쪽 위의 답안 제출 버튼을 눌러요
          </div>
        </div>
      </div>

      <div className="px-8 pb-4 pt-2 text-center">
        <p className="text-[26px] font-bold leading-snug tracking-[-0.02em] text-[#090909]">
          답안 작성이 끝나면{' '}
          <span className="text-[#5784F1]">답안 제출</span> 버튼을 눌러요
          <br />
          제출하면 즉시 채점 결과를 확인할 수 있어요
        </p>
      </div>
    </div>
  )
}
