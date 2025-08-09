import React from "react";
import { Link } from "react-router";
import FooterSocial from "./FooterSocial";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12 px-6 sm:px-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Community Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4 text-gray-900">Community</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#" className="hover:underline hover:text-green-600">
                Tips
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline hover:text-green-600">
                Events
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline hover:text-green-600">
                Groups
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4 text-gray-900">Legal</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/privacy"
                className="hover:underline hover:text-green-600"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-and-conditions"
                className="hover:underline hover:text-green-600"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4 text-gray-900">Follow Us</h6>
          <FooterSocial />
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SportsHub. All rights reserved.
      </div>
    </footer>
  );
}
