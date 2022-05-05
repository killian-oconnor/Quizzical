import React from 'react';

export default function Blobs() {
    return (
        <div className="blob-container">

            <div className="blob1">
                <svg viewBox="0 0 800 500" preserveAspectRatio="none" width="100%" id="blobSvg">
                    <g transform="translate(200, 0)">
                        <path className="blob" d="M357.5,315Q292,380,170.5,388Q49,396,95,283.5Q141,171,232.5,97Q324,23,373.5,136.5Q423,250,357.5,315Z" fill="#a29bfe"></path>
                    </g>
                </svg>
            </div>

            <div className="blob2">
                <svg viewBox="0 0 800 500" preserveAspectRatio="none" width="100%" id="blobSvg">
                    <g transform="translate(200, 0)">
                        <path className="blob" d="M400,364Q324,478,223.5,410Q123,342,93,228Q63,114,184.5,95.5Q306,77,391,163.5Q476,250,400,364Z" fill="#fdcb6e"></path>
                    </g>
                </svg>
            </div>
        </div>
    )
}

