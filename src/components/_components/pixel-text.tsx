"use client";

import PixelTransition from "../animation/PixelTransition/PixelTransition";

interface PixelTextProps {
    text: string;
    image: string;
    width: string;
    height: string
}

export default function PixelText( {text, image, width, height} : PixelTextProps ) {
  return (
    <div className="w-full">
      <PixelTransition
        firstContent={
          <img
            src={image}
            alt="An Image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        }
        secondContent={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              padding: "2px",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#111",
            }}
          >
            <p
              style={{
                fontWeight: 900,
                fontSize: "3rem",
                color: "#ffffff",
              }}
            >
              {text}
            </p>
          </div>
        }
        gridSize={12}
        pixelColor="#ffffff"
        animationStepDuration={0.4}
        className={`${width} ${height}`}
      />
    </div>
  );
}
