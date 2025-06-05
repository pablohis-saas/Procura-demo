import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface WorkflowStep {
  title: string;
  href: string;
  description: string;
}

interface WorkflowNavigationProps {
  steps: WorkflowStep[];
  currentStep: number;
}

export default function WorkflowNavigation({ steps, currentStep }: WorkflowNavigationProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Flujo de Trabajo</h3>
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.href}>
            <Link
              href={step.href}
              className={`flex-1 p-3 rounded-lg ${
                index === currentStep
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : index < currentStep
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  index === currentStep
                    ? 'bg-blue-500 text-white'
                    : index < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            </Link>
            {index < steps.length - 1 && (
              <ArrowRightIcon className="h-5 w-5 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
} 