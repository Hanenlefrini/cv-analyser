export const AnalyzingIllustration = (): JSX.Element => (
  <div className="flex items-center justify-center py-8">
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 border-4 border-purple-200 rounded-full"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-purple-400 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

