import React from 'react';
import Link from 'next/link';

export default function AlertPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl bg-white rounded-xl shadow-lg border border-red-100 p-8 md:p-12 text-gray-800">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          Important Communication Update
        </h1>

        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-700">
          <p>
            <strong>Dear Ma'am,</strong>
          </p>
          <p>
            We recently spoke regarding the setup of your <strong>HP Model m72625dn</strong> printer. Unfortunately, right after our conversation, my phone encountered a severe battery issue and completely died.
          </p>
          <p>
            We fully intended to complete your work, but this sudden hardware failure caused a major communication gap. We are facing significant difficulties because of this and are currently unable to proceed with the setup.
          </p>
          <p>
            Please be assured that <strong>we did not intentionally turn off the phone to avoid or refuse the work</strong>. This was a genuine technical issue on our end.
          </p>
          <p>
            We deeply apologize for the inconvenience and the trouble this situation has caused you.
          </p>
          <p className="mt-8 font-semibold">
            Thank you for your understanding.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
