type HeaderProps = {
  studentName?: string
  onHome?: () => void
}

export function Header({ studentName, onHome }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-[#e8e8e8] bg-white px-6">
      {/* 로고 */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#090909]">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="2" />
          <circle cx="7" cy="7" r="2" fill="white" />
        </svg>
      </div>

      {/* 타이틀 */}
      <span className="absolute left-1/2 -translate-x-1/2 text-[17px] font-bold tracking-[-0.02em] text-[#090909]">
        모의고사 모드
      </span>

      {/* 우측 */}
      <div className="flex items-center gap-3">
        {studentName && (
          <div className="flex items-center gap-1">
            <span className="text-[15px] font-medium text-[#090909]">{studentName} 학생</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#090909" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
        <button
          type="button"
          onClick={onHome}
          className="text-[15px] font-medium text-[#090909] hover:opacity-70"
        >
          홈으로
        </button>
      </div>
    </header>
  )
}
