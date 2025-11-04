"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Receipt, TrendingUp, Mail, FileText } from 'lucide-react';

export const FeaturesGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div ref={sectionRef} id="features" className="mx-auto flex w-full max-w-7xl flex-col gap-11 py-12 select-none md:py-24 lg:py-48">
      <motion.h2 
        className="bg-gradient-to-r from-[#19191D] to-[#626275] bg-clip-text px-8 text-4xl font-medium leading-[1.25] tracking-[-1.28px] text-transparent lg:text-6xl"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Four ways we make your
        <br className="hidden lg:block" /> finances better
      </motion.h2>

      <motion.div 
        className="grid w-full snap-x snap-mandatory auto-cols-max grid-flow-col overflow-x-auto p-0 lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-2 lg:gap-8 lg:overflow-visible lg:p-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="h-[400px] w-[80vw] max-w-[600px] snap-start pl-8 lg:h-[500px] lg:w-full lg:max-w-none lg:pl-0"
          variants={itemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="cursor-pointer relative flex h-full w-full flex-col justify-end rounded-[32px] bg-gradient-to-br from-[#5B8DEF] to-[#4A7DD9] text-white lg:h-[500px] overflow-hidden">
            <motion.div 
              className="absolute inset-0 flex items-center justify-center p-12"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full max-w-md aspect-[0.7] bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Receipt className="size-8" />
                  <motion.span 
                    className="text-sm bg-white/20 px-3 py-1 rounded-full"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    AI Scanning
                  </motion.span>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <motion.div 
                    className="h-3 bg-white/30 rounded w-3/4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div 
                    className="h-3 bg-white/30 rounded w-1/2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="h-24 bg-white/20 rounded-lg mt-4"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                  <motion.div 
                    className="h-3 bg-white/30 rounded w-2/3"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                  <motion.div 
                    className="h-3 bg-white/30 rounded w-1/2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
            <div className="relative flex flex-col gap-3 px-8 pb-8">
              <h3 className="text-2xl font-medium leading-[28.5px] tracking-[-0.4px]">
                AI Receipt Scanner
              </h3>
              <p className="text-lg leading-[24.75px] text-white/90">
                Upload receipts or bills—AI extracts transaction data
                <br className="hidden lg:block" /> instantly with high accuracy.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="h-[400px] w-[80vw] max-w-[600px] snap-start pl-8 lg:h-[500px] lg:w-full lg:max-w-none lg:pl-0"
          variants={itemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="cursor-pointer relative flex h-full w-full flex-col justify-between gap-10 overflow-hidden rounded-[32px] border border-[#36393F]/5 bg-white pt-12 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col gap-3 px-8">
              <h3 className="text-3xl font-medium leading-[38.5px] tracking-[-0.7px] text-[#263043]">
                Real-Time Dashboard
              </h3>
              <p className="leading-[24.75px] text-[#8C929D]">
                Visualize daily, weekly, and monthly spending with interactive charts and automatic categorization.
              </p>
            </div>
            <motion.div 
              className="mr-12 aspect-[1.3] w-fit self-end rounded-tr-[24px] lg:mr-0 lg:self-auto bg-gradient-to-br from-blue-50 to-purple-50 p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div>
                    <TrendingUp className="size-5 text-[#5B8DEF]" />
                  </div>
                  <div className="h-3 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <motion.div 
                    className="bg-white rounded-lg p-3 shadow-sm"
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-2 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                  </motion.div>
                  <motion.div 
                    className="bg-white rounded-lg p-3 shadow-sm"
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-2 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                  </motion.div>
                </div>
                <div className="flex-1 bg-gradient-to-t from-blue-200/50 to-transparent rounded-lg mt-2"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="h-[400px] w-[80vw] max-w-[600px] snap-start pl-8 lg:h-[330px] lg:w-full lg:max-w-none lg:pl-0"
          variants={itemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="cursor-pointer relative flex h-full w-full flex-col-reverse gap-10 overflow-hidden rounded-[32px] border border-[#36393F]/5 bg-white pb-12 lg:flex-row lg:items-center lg:py-12 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col gap-4 px-8 lg:w-1/2">
              <h3 className="text-2xl font-medium leading-[38.5px] tracking-[-0.7px] text-[#263043] lg:text-3xl">
                Personalized Monthly&nbsp;Insights
              </h3>
              <p className="leading-[24.75px] text-[#8C929D] lg:text-base">
                Gemini AI analyzes your habits and delivers tailored financial reports with actionable tips via email.
              </p>
            </div>
            <div className="relative h-[260px] pl-8 lg:h-full lg:w-1/2 lg:pl-0">
              <motion.div 
                className="absolute left-8 h-full w-[480px] rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 p-6 lg:left-auto lg:right-0 lg:w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-3">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Mail className="size-6 text-[#8B7DF8]" />
                  </motion.div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <motion.div 
                    className="mt-4 p-3 bg-white rounded-lg shadow-sm"
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-2 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-[#5B8DEF] rounded w-20"></div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="h-[400px] w-[80vw] max-w-[600px] snap-start pl-8 lg:h-[330px] lg:w-auto lg:pl-0"
          variants={itemVariants}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="cursor-pointer relative flex h-full w-full flex-col justify-end gap-10 overflow-hidden rounded-[32px] border border-[#36393F]/5 bg-white pb-9 shadow-lg hover:shadow-xl transition-shadow">
            <motion.div 
              className="absolute top-0 -right-8 aspect-[1.1] w-3/5 rounded-2xl md:right-4 lg:right-12 bg-gradient-to-br from-blue-50 to-purple-50 p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                <FileText className="size-5 text-[#5B8DEF]" />
                <div className="space-y-2 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="size-2 bg-[#8B7DF8] rounded-full"></div>
                      <div className="h-2 bg-gray-300 rounded flex-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-12"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            <div className="relative flex flex-col gap-3 px-8">
              <h3 className="text-3xl font-medium leading-[38.5px] tracking-[-0.7px] text-[#263043]">
                Transaction Management
              </h3>
              <p className="leading-[24.75px] text-[#8C929D]">
                Effortlessly add, edit, or delete transactions with receipt attachments and category filters.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};