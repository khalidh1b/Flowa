"use client";

import { Upload, Scan, ChartBar } from "lucide-react";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stepsData = [
  {
    step: 1,
    title: "Upload Receipt",
    description: "Simply take a photo or upload your receipt to get started.",
    icon: Upload,
  },
  {
    step: 2,
    title: "AI Extracts Data",
    description: "Our AI scans and extracts transaction details automatically.",
    icon: Scan,
  },
  {
    step: 3,
    title: "Track & Analyze",
    description: "View insights, trends, and personalized financial recommendations.",
    icon: ChartBar,
  }
];

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.38135 15.0001C11.334 7.04259 23.3333 7.04259 30.7145 15.0001"
      stroke="#CDCDCD"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M25.0488 10.381L30.7155 15.0001L25.0488 19.6191"
      stroke="#CDCDCD"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
  isInView: boolean;
}

const StepCard = ({ step, title, description, icon: Icon, index, isInView }: StepCardProps) => (
  <motion.div 
    className="cursor-pointer flex w-full max-w-[340px] flex-col items-center justify-start gap-5 text-center select-none"
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    whileHover={{ scale: 1.05, y: -10 }}
  >
    <div 
      className="flex w-full items-center justify-center rounded-3xl bg-gradient-to-br from-[#EDF2FE] to-[#E8F0FE] p-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
    >
      <div 
        className="flex size-32 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B8DEF] to-[#8B7DF8] text-white"
      >
        <Icon className="size-16" />
      </div>
    </div>
    <div className="flex flex-col items-center justify-center gap-1.5">
      <motion.h3 
        className="text-2xl font-medium leading-[1.2] text-dark-text-secondary"
        whileHover={{ scale: 1.05 }}
      >
        {step}
        <span className="ml-2">{title}</span>
      </motion.h3>
      <p className="max-w-[330px] text-base text-muted-foreground">
        {description}
      </p>
    </div>
  </motion.div>
);

const ThreeSteps = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} id="how-it-works" className="bg-background pt-10 pb-24 md:pt-0 md:pb-32">
      <div className="container mx-auto flex flex-col items-center justify-center gap-y-14">
        <motion.div 
          className="flex flex-col items-center justify-center gap-y-2 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-medium leading-[1.25] tracking-[-1.28px] text-dark-text lg:text-5xl select-none">
            Financial insights in 3 steps
          </h2>
          <p className="text-lg text-muted-foreground select-none">
            The easiest way to track and understand your spending.
          </p>
        </motion.div>
        <div className="grid w-full grid-cols-1 place-items-center gap-y-16 lg:grid-cols-[1fr_max-content_1fr_max-content_1fr] lg:items-start lg:gap-x-12">
          <StepCard {...stepsData[0]} index={0} isInView={isInView} />
          <motion.div 
            className="hidden lg:block lg:translate-y-28"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowIcon />
            </motion.div>
          </motion.div>
          <StepCard {...stepsData[1]} index={1} isInView={isInView} />
          <motion.div 
            className="hidden lg:block lg:translate-y-28"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <ArrowIcon />
            </motion.div>
          </motion.div>
          <StepCard {...stepsData[2]} index={2} isInView={isInView} />
        </div>
      </div>
    </section>
  );
};

export default ThreeSteps;