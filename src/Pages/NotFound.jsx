import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 Text */}
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[180px] font-bold text-[#f7b205] leading-none">
            4<span className="text-[var(--secondary-dark-bg)]">0</span>4
          </h1>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-[var(--dark-text-muted)] text-lg">
            The page you're looking for seems to have taken a wrong turn. 
            Don't worry, let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-[#f7b205] hover:bg-[#f5d608] text-[var(--primary-dark-bg)] font-semibold py-3 px-8 rounded-full transition-colors duration-300"
          >
            Go Home
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12">
          <p className="text-[var(--dark-text-muted)] text-sm">
            Need help?{' '}
            <HashLink
              to="/#contact"
              className="text-[#f7b205] hover:text-[#f5d608] underline transition-colors"
            >
              Contact Support
            </HashLink>
          </p>
        </div>
      </div>
    </div>
  );
}