"use client";

import React from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 w-full">
      <div className="mb-6 w-full flex justify-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {title || t("emptyState.title")}
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        {description || t("emptyState.description")}
      </p>
    </div>
  );
}
