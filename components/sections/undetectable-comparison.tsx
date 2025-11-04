"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, XCircle, FileText, CreditCard, Clock, Brain } from "lucide-react";

const FlowaLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    height="1em"
    width="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="url(#flowa-gradient)" />
    <path
      d="M12 7v10M8 9l4-2 4 2M8 15l4 2 4-2"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="flowa-gradient" x1="4" y1="4" x2="20" y2="20">
        <stop stopColor="#5B8DEF" />
        <stop offset="1" stopColor="#8B7DF8" />
      </linearGradient>
    </defs>
  </svg>
);

const CheckCircleFilledIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2a8 8 0 110 16 8 8 0 010-16zm3.364 4.05l-4.5 4.5-2.12-2.121-.709.707 2.828 2.829 5.207-5.208-.707-.707z"></path>
  </svg>
);

const CrossCircleFilledIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="#263043"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm3.093 4.25l-2.12 2.122 2.12 2.12-.707.708-2.121-2.12-2.122 2.12-.707-.708 2.122-2.12-2.122-2.12.707-.708 2.122 2.12 2.12-2.12.707.708z"></path>
  </svg>
);

const UndetectableComparison = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const floatingIcons = [
    { Icon: FileText, color: "from-blue-100 to-blue-200", iconColor: "text-[#5B8DEF]", position: "-top-12 -left-16 lg:-top-32 lg:-left-24", rotation: "rotate-6" },
    { Icon: Brain, color: "from-purple-100 to-purple-200", iconColor: "text-[#8B7DF8]", position: "-top-16 right-0 lg:-top-36 lg:right-2", rotation: "-rotate-12" },
    { Icon: CreditCard, color: "from-green-100 to-green-200", iconColor: "text-green-600", position: "-bottom-24 left-10 lg:-bottom-24 lg:left-12", rotation: "-rotate-12" },
    { Icon: Clock, color: "from-orange-100 to-orange-200", iconColor: "text-orange-600", position: "-bottom-28 -right-8 lg:-bottom-36 lg:-right-4", rotation: "rotate-12" },
  ];

  return (
    <section ref={sectionRef} className="bg-white py-24 lg:py-36">
      <div className="container mx-auto flex w-full max-w-7xl flex-col items-center gap-14 px-8 md:px-0 lg:gap-24">
        <motion.div 
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="bg-gradient-to-r from-[#19191D] to-[#626275] bg-clip-text text-4xl font-medium leading-[1.25] tracking-[-1.28px] text-transparent lg:text-6xl select-none">
            Manual tracking vs.
            <br />
            Automated intelligence.
          </h2>
          <p className="text-sm font-medium text-[#8C929D] lg:text-base select-none">
            Why spend hours on spreadsheets when AI can do it instantly?
          </p>
        </motion.div>

        <div className="relative w-full">
          {floatingIcons.map(({ Icon, color, iconColor, position, rotation }, index) => (
            <motion.div
              key={index}
              className={`absolute ${position} ${rotation}`}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: rotation.includes("-") ? -20 : 20,
                y: -10
              }}
            >
              <motion.div 
                className={`cursor-pointer size-24 lg:size-32 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-xl`}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: rotation.includes("-") ? [-12, -15, -12] : [12, 15, 12]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: index * 0.5 
                }}
              >
                <Icon className={`size-12 lg:size-16 ${iconColor}`} />
              </motion.div>
            </motion.div>
          ))}

          <motion.div 
            className="grid w-full grid-cols-1 overflow-hidden rounded-[48px] border border-black/5 lg:grid-cols-2 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="flex flex-col gap-6 bg-[#EDEEF2] px-10 py-10 lg:gap-11 lg:px-20 lg:py-16"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="cursor-pointer flex items-center gap-1.5 text-2xl font-medium tracking-[-0.025em] text-[#19191D] lg:text-3xl select-none">
                Traditional Finance Apps
                <XCircle
                  className="text-red-500"
                  width={24}
                  height={24}
                  strokeWidth={1.5}
                />
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  "Manual data entry for every transaction",
                  "Generic insights with no personalization",
                  "Time-consuming receipt management"
                ].map((text, i) => (
                  <motion.p 
                    key={i}
                    className="inline-flex items-center gap-1.5 align-middle text-sm font-medium text-[#263043] lg:text-lg select-none"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <CrossCircleFilledIcon />
                    {text}
                  </motion.p>
                ))}
              </div>
              <motion.div 
                className="relative h-[256px] w-full max-w-[290px] self-center overflow-hidden rounded-2xl border-[12px] border-black bg-white lg:h-[300px] lg:max-w-[410px]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 size-full p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                      >
                        <div className="h-3 bg-gray-300 rounded flex-1"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex flex-col gap-6 bg-[#21232A] px-10 py-10 text-white lg:gap-11 lg:px-20 lg:py-16"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="cursor-pointer flex items-center gap-1.5 text-2xl font-medium tracking-[-0.025em] lg:text-3xl select-none">
                <FlowaLogoIcon />
                Flowa
                <CheckCircle2
                  className="text-green-500"
                  width={24}
                  height={24}
                  strokeWidth={1.5}
                />
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  "AI-powered automatic receipt scanning",
                  "Personalized monthly insights via email",
                  "Real-time dashboard with smart analytics"
                ].map((text, i) => (
                  <motion.p 
                    key={i}
                    className="inline-flex items-center gap-1.5 align-middle text-sm font-medium text-[#EDEEF2] lg:text-lg select-none"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: -5 }}
                  >
                    <CheckCircleFilledIcon />
                    {text}
                  </motion.p>
                ))}
              </div>
              <motion.div 
                className="relative h-[256px] w-full max-w-[290px] self-center overflow-hidden rounded-2xl border-[12px] border-black bg-gradient-to-br from-[#5B8DEF] to-[#8B7DF8] lg:h-[300px] lg:max-w-[410px]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 size-full p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-white/30 rounded w-24"></div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="size-6 text-white/80" />
                    </motion.div>
                  </div>
                  <motion.div 
                    className="mt-2 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="size-4 text-green-400" />
                      <div className="h-2 bg-white/40 rounded w-32"></div>
                    </div>
                    <div className="space-y-2">
                      <motion.div 
                        className="h-2 bg-white/30 rounded w-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div 
                        className="h-2 bg-white/30 rounded w-4/5"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                      <motion.div 
                        className="h-2 bg-white/30 rounded w-3/5"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      />
                    </div>
                  </motion.div>
                  <motion.div 
                    className="mt-auto flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <div className="h-2 bg-white/40 rounded w-24"></div>
                    <div className="h-6 bg-green-400/30 rounded px-3 flex items-center">
                      <div className="h-2 bg-green-400 rounded w-12"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UndetectableComparison;