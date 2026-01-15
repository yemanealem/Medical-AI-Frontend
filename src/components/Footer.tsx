export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-700 p-10 flex flex-col md:flex-row justify-between items-center text-gray-300 space-y-6 md:space-y-0">
      <div className="font-medium">
        © {new Date().getFullYear()} All rights reserved.
      </div>

      <div className="mt-2 md:mt-0  text-right">
        Developed by{" "}
        <span className="text-purple-500 font-semibold">Yemane A.</span>
      </div>

      <div className="flex gap-8 ">
        <a href="#" className="hover:text-white transition font-medium">
          Terms of Service
        </a>
        <a href="#" className="hover:text-white transition font-medium">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white transition font-medium">
          Help
        </a>
      </div>
    </footer>
  );
}
