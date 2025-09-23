import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

export default function Nasir() {
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(false);
  const {t, i18n} = useTranslation()
  
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-start space-x-2 rtl:left-auto rtl:right-4">
      {show && (
        <>
          {/* Nasir Head */}
          <img
            src="/Nasir_Head.png"
            alt="Nasir"
            className="w-20 h-20 object-contain"
            style={{ transform: i18n.dir() === 'rtl' ? 'scaleX(-1)' : 'none' }}
          />

          {/* Chat Bubble */}
          <div className="relative bg-green-500 text-white font-semibold text-sm md:text-base px-4 py-2 rounded-2xl shadow-lg flex items-center space-x-2 ">
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/97142232269"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 "
            >
              <FaWhatsapp className="text-lg" />
              <span className="hover:text-gray-100 transition">{t("whatsapp")}</span>
            </a>

            {/* Close Button */}
            <button
              onClick={handleShow}
              className="ml-2 text-white hover:text-gray-800 transition cursor-pointer"
            >
              &#x2715;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
