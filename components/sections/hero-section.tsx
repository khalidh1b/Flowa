"use client";

import { Sparkles, Receipt, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative isolate overflow-hidden">
      <motion.div 
        className="absolute inset-0 -z-10 bg-[linear-gradient(150.31deg,_#F5A97D_1.41%,_#8B7DF8_50.81%,_#6BA3E8_101.4%)]"
      ></motion.div>
      
      <motion.div 
        className="flex flex-col items-center gap-8 lg:gap-16 pt-20 lg:pt-28 pb-20 lg:pb-32"
      >
        <section className="flex h-full items-start justify-center">
          <div className="flex flex-col items-center gap-8 px-4">
            <div className="flex flex-col items-center gap-4 lg:gap-3">
              <h1 className="text-center text-[56px] font-medium leading-[102%] tracking-[-1px] text-white lg:text-[80px] select-none">
                <motion.span 
                  className="block h-[57px] overflow-hidden lg:h-[76px]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <span className="inline-block">AI That Thinks</span> <span className="inline-block">Like</span>
                </motion.span>
                <motion.span 
                  className="block h-[70px] overflow-hidden lg:h-[94px]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <span className="inline-block">Your CFO</span>
                </motion.span>
              </h1>
              <hr className="hidden h-px w-96 border-none lg:block" />
              <motion.h2 
                className="max-w-xl text-center text-lg font-medium leading-[140%] tracking-[-0.02em] text-white lg:text-[19px] select-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Transform the way you manage your money <br className="md:hidden" />with AI-powered receipt scanning, real-time insights, and personalized financial reports.
              </motion.h2>
            </div>
            <motion.div 
              className="h-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <Link href="/dashboard" className="cursor-pointer flex items-center gap-[6px] rounded-[10px] bg-[linear-gradient(90deg,_#8B7DF8,_#4A7DD9,_#8B7DF8)] bg-[200%_auto] p-[10px_20px] font-medium text-white text-[16px] tracking-[-0.13px] relative overflow-hidden hover:brightness-110 transition-all group">
                <span>Start Managing Your Finances</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </Link>
            </motion.div>
          </div>
        </section>

        <motion.div 
          className="relative hidden w-full h-fit items-start justify-center px-12 [perspective:1515px] md:flex"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="relative h-[32rem] w-full max-w-6xl rounded-[13px] lg:h-auto lg:aspect-[1.7] md:[transform:rotateX(25deg)]"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div className="absolute inset-0 w-full max-w-6xl rounded-[13px] bg-gradient-to-br from-slate-900 to-slate-800 blur-xl lg:block" />
            
            <motion.div 
              className="absolute -inset-[2px] rounded-[15px] opacity-80"
              style={{
                background: "linear-gradient(90deg, #5B8DEF, #8B7DF8, #F5A97D, #7DF0F8, #5B8DEF)",
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <motion.div 
              className="relative w-full h-full max-w-6xl rounded-[13px] bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl overflow-hidden lg:block"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between bg-black/20 px-4 py-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500/80"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-yellow-500/80"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500/80"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
                <div className="text-white/60 text-sm font-medium">Flowa Dashboard</div>
                <div className="w-16"></div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4 h-32">
                  {[
                    { label: "Total Spent", value: "$3,247", change: "↓ 12% this month", color: "text-red-400", delay: 0 },
                    { label: "Transactions", value: "142", change: "↑ 8 new today", color: "text-green-400", delay: 0.1 },
                    { label: "Top Category", value: "Food", change: "$890 spent", color: "text-white/60", delay: 0.2 }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 + stat.delay }}
                      whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                    >
                      <div className="text-white/60 text-xs mb-1">{stat.label}</div>
                      <div className="text-white text-2xl font-semibold">{stat.value}</div>
                      <div className={`${stat.color} text-xs mt-1`}>{stat.change}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 h-72"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <div className="text-white font-medium mb-4">Spending Overview</div>
                  <div className="flex items-end justify-between h-48 gap-2">
                    {[65, 45, 80, 55, 70, 90, 75].map((height, i) => (
                      <motion.div 
                        key={i} 
                        className="cursor-pointer flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t" 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: 1.5 + (i * 0.1), ease: "easeOut" }}
                        whileHover={{ scale: 1.05 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <motion.div 
                className="relative size-fit"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <motion.div 
                  className="cursor-pointer relative inline-flex h-10 w-fit items-center justify-center rounded-[6px] bg-[linear-gradient(93.94deg,_#5B8DEF_1.29%,_#4667C2_98.63%)] px-3 font-semibold leading-none text-white md:w-[220px] lg:h-11 lg:w-[240px] text-base"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="absolute -inset-px h-full w-full overflow-hidden rounded-[6px]">
                    <motion.span 
                      className="absolute -top-[52px] right-1 size-20 rounded-full bg-[#7DF0F8] opacity-40 mix-blend-lighten blur-[30px]"
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span 
                      className="absolute top-[0px] right-1 h-[28px] w-20 rounded-full bg-[#7DF0F8] opacity-40 mix-blend-lighten blur-[30px]"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.span 
                      className="absolute -bottom-[42px] -left-[19px] size-20 rounded-full bg-[#7DF0F8] opacity-40 mix-blend-lighten blur-[30px]"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </span>
                  <span className="relative z-10 flex items-center gap-1.5 text-sm leading-none -tracking-[0.02em] lg:text-base select-none">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Receipt size={16} />
                    </motion.div>
                    Upload receipt to scan
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="absolute inset-0 flex items-start justify-center pt-2 lg:pt-12"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.div 
                className="cursor-pointer flex w-[60%] origin-top flex-col items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-[#21232a]/50 to-[#21232a]/80 p-5 aspect-[1.4] backdrop-blur-xs lg:w-[50%]"
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex h-fit w-full flex-col gap-2">
                  <div className="flex w-full justify-end">
                    <motion.div 
                      className="relative origin-top-right overflow-hidden rounded-2xl rounded-br-md bg-[#5B8DEF] px-3 py-1 text-base text-[#CBE3FF] lg:text-lg select-none"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 2.2 }}
                    >
                      Analyze my spending
                    </motion.div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <motion.div 
                      className="flex items-center gap-1.5 text-sm text-[#7B828E] lg:text-base select-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.4 }}
                    >
                      <motion.div>
                        <Sparkles className="size-4" />
                      </motion.div>
                      <p>AI Insight</p>
                    </motion.div>
                    <motion.div 
                      className="w-full max-w-[90%] text-base leading-[1.3] tracking-[-0.005em] text-[#F2F2F5] select-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 2.6 }}
                    >
                      <p className="md:block">"Your food spending increased by 23% this month. Consider meal prepping to save $200+ monthly. I found 3 grocery stores with better prices near you."</p>
                    </motion.div>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <motion.div 
                    className="flex items-center gap-1 px-1.5 text-sm select-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.8 }}
                  >
                    <div className="flex items-center gap-1 text-[#EDEEF2]">
                      <TrendingUp className="size-4 text-white/60" />
                      Financial insights
                    </div>
                  </motion.div>
                  <motion.div 
                    className="cursor-pointer flex h-12 w-full items-center rounded-xl border border-white/20 bg-[#1a1e2d]/50 px-3 py-2 font-medium text-[#7A7A84]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3 }}
                    whileHover={{ borderColor: "rgba(255,255,255,0.4)" }}
                  >
                    Ask me about your finances...
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative flex w-full items-center justify-center py-2 md:hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(90deg, #5B8DEF, #8B7DF8, #F5A97D, #7DF0F8, #5B8DEF)",
              backgroundSize: "300% 300%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-[304px] h-[calc(300px*1.667+8px)] rounded-[26px]" />
          </motion.div>
          
          <motion.div 
            className="relative w-[300px] aspect-[0.6] bg-gradient-to-br from-slate-900 to-slate-800 rounded-[24px] shadow-2xl overflow-hidden border-8 border-slate-950"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <div className="p-4 space-y-4">
              <div className="text-white font-semibold text-lg select-none">Dashboard</div>
              <motion.div 
                className="cursor-pointer bg-white/10 backdrop-blur-sm rounded-xl p-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-white/60 text-xs select-none">Total Spent</div>
                <div className="text-white text-2xl font-bold select-none">$3,247</div>
              </motion.div>
              <div className="grid grid-cols-2 gap-2">
                {[{ label: "Transactions", value: "142" }, { label: "Categories", value: "8" }].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="cursor-pointer bg-white/5 rounded-lg p-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-white/60 text-xs select-none">{stat.label}</div>
                    <div className="text-white font-semibold select-none">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="cursor-pointer absolute top-5 right-[calc(50%-min(140px,_35vw))] w-fit origin-top-right overflow-hidden rounded-xl rounded-br-sm bg-[#5B8DEF] px-3 py-1 text-sm whitespace-nowrap text-[#CBE3FF] select-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Receipt className="inline size-3 mr-1" />
            Scan receipt
          </motion.div>
          <motion.div 
            className="cursor-pointer absolute top-28 left-[calc(50%-min(140px,_35vw))] flex w-fit flex-col items-start justify-between gap-2 overflow-hidden rounded-3xl rounded-tl-2xl rounded-bl-md bg-gradient-to-b from-[#21232a]/50 to-[#21232a]/80 p-3 backdrop-blur-xs max-w-[65vw]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="size-3.5 text-white" />
            </motion.div>
            <div className="text-sm leading-[1.3] tracking-[-0.005em] text-[#F2F2F5] select-text">
              <p>"Your food spending is up 23% this month. Try meal prepping to save!"</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};