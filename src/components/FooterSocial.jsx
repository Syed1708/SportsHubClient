import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function FooterSocialIcons() {
  return (
    <nav>
      <div className="flex gap-5">
        <a
          href="https://facebook.com/fake"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-xl"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://instagram.com/fake"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-pink-500 transition-colors duration-300 text-xl"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/fake"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-400 transition-colors duration-300 text-xl"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://youtube.com/fake"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-red-600 transition-colors duration-300 text-xl"
        >
          <FaYoutube />
        </a>
      </div>
    </nav>
  );
}
