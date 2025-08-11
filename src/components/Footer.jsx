import React from "react";
import { Link } from "react-router";
import FooterSocial from "./FooterSocial";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content py-12 px-6 sm:px-12 border-t border-base-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Community Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Community</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/events" className="hover:underline hover:text-primary">
                Events
              </Link>
            </li>
            <li>
              <Link to="/create-event" className="hover:underline hover:text-primary">
                Create Event
              </Link>
            </li>
            <li>
              <Link to="/manageEvents" className="hover:underline hover:text-primary">
                Manage Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Legal</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy" className="hover:underline hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:underline hover:text-primary">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Follow Us</h6>
          <FooterSocial />
        </div>
      </div>

      <div className="mt-10 border-t border-base-300 pt-6 text-center text-sm opacity-70">
        © {new Date().getFullYear()} SportsHub. All rights reserved.
      </div>
    </footer>
  );
}
