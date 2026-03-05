"use client";

import React from 'react';
import SectionDTO from "@/types/DTOs/public/section-dto";
import { RecordCard } from "./record-card";
import {useRouter} from "next/navigation";

interface MainInfoProps {
  sections: SectionDTO[];
}

export default function MainInfo({ sections }: MainInfoProps) {


  return (
    <div>
      {sections.map((section) => (
        <section
          key={section.orderNo}
          id={`section-${section.orderNo}`}
          data-order={section.orderNo}
          className="scroll-m-28 overflow-hidden"
        >
          <div className="flex items-center gap-4 ">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight shrink-0 text-foreground">
              {section.title}
            </h2>
          </div>

          <div>
            {section.entries && section.entries.length > 0 ? (
              section.entries.map((entry, index) => (
                <RecordCard key={index} entry={entry} />
              ))
            ) : (
              <div className="py-10 px-4 border border-dashed rounded-xl text-center bg-muted/30">
                <p className="text-sm text-muted-foreground italic">
                  Записи у цьому розділі відсутні
                </p>
              </div>
            )}
          </div>
        </section>
      ))}
      <div className={"min-h-100 hidden md:block"}/>
    </div>
  );
}