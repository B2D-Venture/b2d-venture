"use client";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full" data-id="amount">
      <CountUp
        duration={1.5}
        prefix="$"
        end={amount}
      />
    </div>
  );
};

export default AnimatedCounter;
