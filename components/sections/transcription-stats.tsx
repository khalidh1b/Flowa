"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DollarSign, Zap, Target } from "lucide-react";

const TranscriptionStats = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const stats = [
    {
      Icon: DollarSign,
      title: "100+ Currencies",
      description: "Support for major global currencies including USD, EUR, JPY, GBP, and more with real-time conversion.",
      color: "from-blue-100 to-blue-200",
      iconColor: "text-[#5B8DEF]"
    },
    {
      Icon: Zap,
      title: "Instant Processing",
      description: "Real-time transaction analysis and categorization. Get insights the moment you spend.",
      color: "from-purple-100 to-purple-200",
      iconColor: "text-[#8B7DF8]"
    },
    {
      Icon: Target,
      title: "95% AI Accuracy",
      description: "Industry-leading receipt scanning powered by Google Gemini API. Trusted accuracy for your financial data.",
      color: "from-green-100 to-green-200",
      iconColor: "text-green-600"
    }
  ];

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-8 pt-10 pb-0 lg:flex-row lg:items-start lg:gap-14 lg:py-48">
        <motion.div 
          className="flex h-[300px] w-full items-center justify-center rounded-[32px] bg-gradient-to-br from-[#5B8DEF] to-[#8B7DF8] p-8 lg:h-[432px] lg:w-1/2 overflow-hidden relative"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }}
          />
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
            <div 
              className="size-24 lg:size-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <DollarSign className="size-12 lg:size-16 text-white" />
            </div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 select-none">AI-Powered</div>
              <div className="text-lg lg:text-xl text-white/80 select-none">Financial Intelligence</div>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex w-full flex-col gap-6 pt-4 lg:w-1/2 lg:gap-11 lg:pt-0">
          <motion.h2 
            className="w-fit text-3xl font-medium leading-[1.25] tracking-[-1.28px] text-[#263043] lg:text-4xl select-none"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Powered by advanced AI
          </motion.h2>
          <div className="flex flex-col gap-10">
            {stats.map((stat, index) => (
              <div key={index}>
                <motion.div 
                  className="cursor-pointer flex w-full items-start gap-4 lg:gap-8"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0 + index * 0.2 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="w-1/4">
                    <motion.div 
                      className={`size-12 lg:size-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.Icon className={`size-6 lg:size-7 ${stat.iconColor}`} />
                    </motion.div>
                  </div>
                  <div className="flex w-3/4 flex-col gap-px lg:gap-2">
                    <h4 className="text-xl font-medium leading-snug text-[#4D5A66] lg:text-2xl select-none">
                      {stat.title}
                    </h4>
                    <p className="text-base text-[#8C929D] select-text">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
                {index < stats.length - 1 && (
                  <motion.div 
                    className="w-full border-t border-t-[#8C929D]/20 mt-10"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranscriptionStats;