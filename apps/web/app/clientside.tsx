"use client";
import { useState, useEffect } from "react";
import { trpc } from "./trpc";
import { TRPCError } from "@trpc/server";

export default function Months() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [age, setAge] = useState(0);

  const handleTakeAge = (e: number) => {
    setAge(e);
  };

  const weeks = Array.from({ length: 960 }, (_, index) => index + 1);

  const shouldAddGap = (weekNumber: number) =>
    weekNumber % 270 === 0 && weekNumber !== 960;

  useEffect(() => {
    trpc.getData
      .query({ age: age })
      .then((response) => {
        setCurrentWeek(response.monthsLived);
      })
      .catch((error) => {
        if (error instanceof TRPCError) {
          console.log(error.message);
        }
      });
  }, [age]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <input
        onChange={(e) => handleTakeAge(Number(e.target.value))}
        placeholder="Coloque sua idade aqui"
        maxLength={3}
      />
      <span className="bg-blue-500">{error}</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: Math.ceil(weeks.length / 27) }, (_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex flex-wrap">
            {Array.from({ length: 27 }, (_, colIndex) => {
              const weekNumber = rowIndex * 27 + colIndex + 1;
              if (weekNumber > weeks.length) return null;

              return (
                <>
                  <div
                    key={colIndex}
                    className={`w-5 h-5 m-[1px] rounded-sm flex items-center justify-center text-[8px]
                       ${weekNumber <= currentWeek ? "bg-red-500" : "bg-blue-500"}
                       hover:bg-primary-foreground hover:scale-150 transition-all duration-200 ease-in-out`}
                    title={`Week ${weekNumber}`}
                  ></div>
                  {shouldAddGap(weekNumber) && <div className="w-full h-4" />}
                </>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
