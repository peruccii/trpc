"use client";
import { useState, useEffect } from "react";
import { trpc } from "./trpc";
import { TRPCError } from "@trpc/server";
import { CustomInput } from "./ components/custom-input";

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
      <div className="items-center flex ">
        <CustomInput
          placeholder="Coloque sua idade aqui"
          className="flex items-center mx-auto w-96 mb-7"
          maxLength={3}
          onChange={(e) => handleTakeAge(Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
        {Array.from({ length: Math.ceil(weeks.length / 18) }, (_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex flex-wrap">
            {Array.from({ length: 18 }, (_, colIndex) => {
              const weekNumber = rowIndex * 18 + colIndex + 1;
              if (weekNumber > weeks.length) return null;

              return (
                <>
                  <div
                    key={colIndex}
                    className={`w-5 h-5 m-[1px] rounded-sm flex items-center justify-center text-[8px]
                      border-[0.5px] border-white ${weekNumber <= currentWeek ? "bg-white" : "bg-black"}
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
