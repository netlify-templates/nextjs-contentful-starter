'use client';

import Image from 'next/image';

const ContentWithEmbed = ({ embedUrl, title, simpleContent, imageOnLeft }) => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row w-full items-center">
          {imageOnLeft ? (
            <>
              <div className="md:w-1/2 p-4">
                <div style={{ overflow: "hidden", marginLeft: "auto", marginRight: "auto", borderRadius: "10px", width: "100%", maxWidth: "800px", position: "relative" }}> 
                  <div style={{ width: "100%", paddingBottom: "52.5%" }}></div> 
                    <iframe 
                      width="800" 
                      height="420" 
                      title="Workflow execution example" 
                      src={embedUrl}
                      allow="clipboard-write" 
                      allowFullScreen={true} 
                      loading="lazy" 
                      style={{ background: "transparent", position: "absolute", left: 0, top: 0, width: "100%" }}
                    >
                    </iframe> 
                  </div>
              </div>
              <div className="md:w-1/2 p-4">
                <h2 className="text-4xl text-left mb-8 text-gray-100">{title}</h2>
                <p className="text-lg font-light text-gray-300">{simpleContent}</p>
              </div>
            </>
          ) : (
            <>
              <div className="md:w-1/2 p-4">
                <h2 className="text-4xl text-left mb-8 text-gray-100">{title}</h2>
                <p className="text-lg font-light text-gray-300">{simpleContent}</p>
              </div>
              <div className="md:w-1/2 p-4">
                <div style={{ overflow: "hidden", marginLeft: "auto", marginRight: "auto", borderRadius: "10px", width: "100%", maxWidth: "800px", position: "relative" }}> 
                  <div style={{ width: "100%", paddingBottom: "52.5%" }}></div> 
                    <iframe 
                      width="800" 
                      height="420" 
                      title="Workflow execution example" 
                      src={embedUrl}
                      allow="clipboard-write" 
                      allowFullScreen={true} 
                      loading="lazy" 
                      style={{ background: "transparent", position: "absolute", left: 0, top: 0, width: "100%" }} frameBorder="0" 
                    >
                    </iframe> 
                  </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentWithEmbed;
