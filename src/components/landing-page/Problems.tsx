export const ProblemsSection = () => {
  return (
    <section id="problem" className="">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-800 leading-tight text-balance">
            When patients can't afford care,{" "}
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-8 h-8 text-emerald-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>{" "}
            everyone loses
            {/* delayed treatments, and a zillion small problems. */}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Card 1: Patient Delays */}
          <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Every patient gets payment anxiety
            </h3>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-emerald-600 font-medium text-sm mb-1">
                  + Creating anxiety from sticker shock
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Patients see large bills and immediately worry about affording
                  care. This creates stress that affects their decision-making
                  and delays necessary treatments, leading to worse health
                  outcomes and emergency situations.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Mobile App Preview */}
          <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center">
            <div className="w-48 h-80 bg-indigo-600 rounded-3xl p-4 relative overflow-hidden">
              <div className="bg-white rounded-2xl h-full p-4 flex flex-col">
                <div className="flex gap-2 mb-4">
                  <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="flex-1 bg-white shadow-sm rounded-lg"></div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mt-4 text-center">
              Payment plans and financing in private practice
            </h3>
          </div>

          {/* Card 3: Questions */}
          <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Stuck? Get solutions based on your current pain points.
            </h3>
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-sm text-slate-600 mb-2">
                What's your biggest challenge?
              </p>
              <p className="text-blue-600 text-sm underline cursor-pointer">
                Ask me something
              </p>
              <p className="text-slate-700 text-sm mt-2">
                <strong>
                  Patients declining expensive procedures during your
                  consultation?
                </strong>
              </p>
            </div>
          </div>

          {/* Card 4: Language Support */}
          <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              Revenue loss across 25+ specialties.
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white rounded-lg p-3">
                <span className="text-lg">🇺🇸</span>
                <span className="text-slate-700 font-medium">Dental (US)</span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg p-3">
                <span className="text-lg">🇪🇸</span>
                <span className="text-slate-700 font-medium">
                  Cosmetic Surgery
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg p-3">
                <span className="text-lg">🇯🇵</span>
                <span className="text-slate-700 font-medium">Orthopedics</span>
              </div>
            </div>
          </div>

          {/* Card 5: Remember Names */}
          <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              Track patient financing to avoid revenue leaks
            </h3>
            <div className="bg-slate-900 rounded-lg p-3 text-white text-sm flex items-center justify-between">
              <span>Remember the patient "Sarah"?</span>
              <div className="flex gap-2">
                <button className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center">
                  <span className="text-xs">×</span>
                </button>
                <button className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 6: Analytics */}
          <div className="col-span-12 md:col-span-4 bg-white shadow-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Revenue tracking for accountability (and growth opportunities)
            </h3>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-3">
                You rank #23 out of 2376 practices
              </p>
              <div className="grid grid-cols-12 gap-1 h-16">
                {Array.from({ length: 84 }, (_, i) => {
                  // % heights you control; repeats every 12 bars
                  const pattern = [
                    20, 35, 50, 65, 80, 100, 85, 70, 55, 40, 30, 45,
                  ];
                  const h = pattern[i % pattern.length];

                  return (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        i < 20
                          ? "bg-emerald-500"
                          : i < 40
                          ? "bg-emerald-400"
                          : i < 60
                          ? "bg-emerald-300"
                          : "bg-gray-200"
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>

              <div className="mt-2 text-xs text-slate-500 flex justify-between">
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
              </div>
              {/* <div className="mt-2 bg-slate-900 text-white text-xs px-2 py-1 rounded inline-block">
                Jan 1 - Jan 31
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
