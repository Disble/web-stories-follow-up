"use client";

import type React from "react";

type FormSectionProps = {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
};

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="grid gap-8 p-4 lg:grid-cols-2 lg:px-10 lg:py-8">
      <div className="space-y-5">
        <h4 className="text-medium font-bold text-default-600 sm:text-large">
          {title}
        </h4>
        <p className="text-small text-default-500 sm:text-medium">
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
};
