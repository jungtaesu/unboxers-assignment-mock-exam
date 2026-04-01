export function TutorialCompleteStep() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-10">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#090909] shadow-[0_8px_32px_#00000020]">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M9 20L17 28L31 12"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-[30px] font-bold tracking-[-0.02em] text-[#090909]">
          튜토리얼을 완료했어요
        </p>
        <p className="mt-3 text-[18px] text-[#858585]">
          이제 실전 모의고사를 응시할 준비가 됐어요
        </p>
      </div>
    </div>
  )
}
