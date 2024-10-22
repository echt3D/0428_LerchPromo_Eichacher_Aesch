import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { LivestateContext } from "../../context/LivestateContext";
import { Document, Page, pdfjs } from "react-pdf";

import "./lightbox.styles.scss";

import { useMediaQuery } from "../../utils/useMediaQuery";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Lightbox = ({ lightboxData, lightboxOpen, setLightboxOpen }) => {
  const isBigScreen = useMediaQuery("(min-width: 640px)");
  if (!lightboxData) {
    return null;
  }

  return (
    <Modal
      isOpen={lightboxOpen}
      onRequestClose={() => setLightboxOpen(false)}
      contentLabel={`${lightboxData.type} Modal`}
      ariaHideApp={false}
    >
      {lightboxData.type === "pdf" && (
        <object
          data={lightboxData.src}
          alt="Factsheet"
          type="application/pdf"
          width={isBigScreen ? "100%" : (window.innerHeight - 40) / 1.414}
          height={isBigScreen ? "100%" : window.innerHeight - 40}
        ></object>
      )}
      {lightboxData.type === "image" && (
        <img src={lightboxData.src} alt="Content" />
      )}
      {lightboxData.type === "video" && (
        <video controls src={lightboxData.src} />
      )}
      {lightboxData.type === "tour" && (
        <iframe
          src={lightboxData.src}
          width="100%"
          height="100%"
          title="Tour Content"
          frameBorder="0"
        />
      )}
    </Modal>
  );
};

export default Lightbox;

// import React, { useContext, useEffect, useRef, useState } from "react";
// import Modal from "react-modal";
// import { LivestateContext } from "../../context/LivestateContext";
// import "./lightbox.styles.scss";

// const Lightbox = ({ lightboxData, lightboxOpen, setLightboxOpen }) => {
//   if (!lightboxData) {
//     return null;
//   }

//   return (
//     <Modal
//       isOpen={lightboxOpen}
//       onRequestClose={() => setLightboxOpen(false)}
//       contentLabel={`${lightboxData.type} Modal`}
//       ariaHideApp={false}
//     >
//       {lightboxData.type === "pdf" && (
//         <object
//           data={lightboxData.src}
//           alt="Factsheet"
//           type="application/pdf"
//           width={isBigScreen ? "100%" : (window.innerHeight - 40) / 1.414}
//           height={isBigScreen ? "100%" : window.innerHeight - 40}
//         ></object>
//       )}
//       {lightboxData.type === "image" && (
//         <img src={lightboxData.src} alt="Content" />
//       )}
//       {lightboxData.type === "video" && (
//         <video controls src={lightboxData.src} />
//       )}
//       1
//       {lightboxData.type === "tour" && (
//         <iframe
//           src={lightboxData.src}
//           width="100%"
//           height="100%"
//           title="Tour Content"
//           frameBorder="0"
//         />
//       )}
//     </Modal>
//   );
// };

// export default Lightbox;
