import React, { useContext, useEffect, useRef, useState } from "react";
import { LivestateContext } from "../../context/LivestateContext";
import "./lightbox.styles.scss";

const Lightbox = ({ src, title }) => {
  const [livestate, setLivestate] = useContext(LivestateContext);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeLoaded) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (iframeLoaded) {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [iframeLoaded]);

  const onClose = () => {
    setLivestate((prevS) => ({ ...prevS, lightbox: false }));
  };

  const checkURL = async () => {
    try {
      const response = await fetch(src);
      if (response.ok) {
        setIframeLoaded(true);
        return true;
      } else {
        console.error("Invalid URL:", src);
        return true;
      }
    } catch (error) {
      console.error("Error fetching URL:", src, error);
      return false;
    }
  };

  useEffect(() => {
    const loadURL = async () => {
      const isURLValid = await checkURL();
      if (!isURLValid) {
        // handle invalid URL here
      }
    };
    loadURL();
  }, []);

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: false,
        infobar1Visible: false,
        infobar2Visible: false,
      }));
    }
  };

  if (!src) return null;

  return (
    <div id="e3d-lightbox">
      <div className="e3d-lightbox-item">
        <iframe
          ref={iframeRef}
          src={src}
          allowFullScreen
          title={title}
          onLoad={() => setIframeLoaded(true)}
        ></iframe>
      </div>
      <span
        className="e3d-lightbox-button e3d-lightbox-close"
        onClick={onClose}
      >
        X
      </span>
    </div>
  );
};

export default Lightbox;
