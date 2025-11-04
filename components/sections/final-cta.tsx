import { Sparkles, TrendingUp, PieChart } from 'lucide-react';

const FinalCta = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white from-[65%] to-[#EAF1FB] py-28 px-10">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="relative h-full w-full">
           <span className="absolute left-60 top-[60px] z-0 hidden h-fit w-fit lg:block">
            <div className="size-24 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-xl">
              <TrendingUp className="size-12 text-[#5B8DEF]" />
            </div>
          </span>
          <span className="absolute right-12 bottom-12 z-0 hidden h-fit w-fit lg:block">
            <div className="size-28 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center shadow-xl">
              <PieChart className="size-14 text-[#8B7DF8]" />
            </div>
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-fit flex-col items-center gap-7">
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-[34px] font-medium leading-none tracking-[-0.04em] text-[#263043] lg:text-[40px]">
            Smart finance management that saves you time.
          </h3>
          <p className="text-xl leading-[1.4] text-[#7B828E]">
            Start tracking your spending with AI today.
          </p>
        </div>

        <a
          href="/register"
          className="relative flex items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-br from-[#5B8DEF] to-[#8B7DF8] px-5 py-2.5 text-base font-semibold leading-none text-white transition-transform duration-200 hover:scale-105 active:scale-100"
        >
          <span>Get Started Free</span>
        </a>
      </div>
    </section>
  );
};

export default FinalCta;