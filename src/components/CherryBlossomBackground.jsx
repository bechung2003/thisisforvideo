import React from 'react';

export const CherryBlossomBackground = () => {
  return (
    <div className="cherry-blossom-container" aria-hidden="true">
      {/* Sunny Sky Gradient Base */}
      <div className="sky-gradient-canvas"></div>

      {/* Warm Golden Sun Glow */}
      <div className="sun-bloom"></div>

      {/* Fluffy White Clouds */}
      <div className="clouds-layer">
        <svg className="cloud cloud-1" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 90C25 90 10 75 10 58C10 42 24 28 40 28C43 28 47 29 50 30C58 14 74 2 94 2C118 2 138 18 142 42C148 38 156 36 164 36C182 36 198 50 200 68C206 66 212 65 218 65C235 65 250 78 250 94C250 96 250 98 249 100H40V90Z" fill="white" fillOpacity="0.85"/>
          <path d="M70 100C55 100 45 88 45 74C45 60 56 49 70 49C73 49 76 50 78 51C85 38 98 28 114 28C134 28 150 41 154 60C159 57 166 55 172 55C188 55 200 66 202 81H70V100Z" fill="white" fillOpacity="0.95"/>
        </svg>

        <svg className="cloud cloud-2" viewBox="0 0 280 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 85C16 85 5 73 5 58C5 44 16 32 30 32C33 32 36 33 39 34C46 20 60 10 78 10C100 10 117 25 120 46C126 42 133 40 140 40C156 40 170 52 172 68C177 66 182 65 188 65C202 65 215 76 215 90H30V85Z" fill="white" fillOpacity="0.78"/>
          <path d="M60 92C48 92 38 82 38 70C38 58 48 48 60 48C62 48 65 49 67 50C73 38 85 30 99 30C116 30 130 42 133 58C138 55 143 53 150 53C163 53 174 63 175 76H60V92Z" fill="white" fillOpacity="0.92"/>
        </svg>

        <svg className="cloud cloud-3" viewBox="0 0 360 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 105C30 105 14 88 14 68C14 49 30 33 50 33C54 33 58 34 62 35C72 17 91 4 115 4C143 4 167 23 171 50C178 46 188 43 198 43C220 43 238 59 241 81C248 78 255 77 262 77C282 77 298 92 298 111C298 113 298 115 297 117H50V105Z" fill="white" fillOpacity="0.82"/>
        </svg>
      </div>

      {/* Top Left Cherry Blossom Branch (Crisp Vector) */}
      <div className="corner-branch branch-top-left">
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="branch-svg">
          {/* Main Woody Stem */}
          <path d="M-10 -10C40 25 90 35 140 28C185 22 220 45 250 75C275 100 295 140 310 190" stroke="#5a3d2e" strokeWidth="7" strokeLinecap="round" fill="none"/>
          <path d="M120 30C145 55 175 75 195 115" stroke="#5a3d2e" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
          <path d="M60 22C80 45 95 80 105 110" stroke="#5a3d2e" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <path d="M220 45C240 30 265 25 285 20" stroke="#5a3d2e" strokeWidth="3" strokeLinecap="round" fill="none"/>

          {/* Blossom 1 (Large Open Blossom) */}
          <g transform="translate(140, 28)">
            <ellipse cx="-10" cy="-6" rx="9" ry="7" fill="#fbcfe8" transform="rotate(-30 -10 -6)"/>
            <ellipse cx="6" cy="-10" rx="9" ry="7" fill="#fce7f3" transform="rotate(35 6 -10)"/>
            <ellipse cx="12" cy="5" rx="9" ry="7" fill="#fbcfe8" transform="rotate(95 12 5)"/>
            <ellipse cx="0" cy="12" rx="9" ry="7" fill="#fce7f3" transform="rotate(160 0 12)"/>
            <ellipse cx="-11" cy="5" rx="9" ry="7" fill="#fbcfe8" transform="rotate(225 -11 5)"/>
            <circle cx="0" cy="0" r="4.5" fill="#f43f5e"/>
            <circle cx="0" cy="0" r="2" fill="#fef08a"/>
          </g>

          {/* Blossom 2 (Top Branch Blossom) */}
          <g transform="translate(250, 75)">
            <ellipse cx="-9" cy="-5" rx="8" ry="6.5" fill="#fce7f3" transform="rotate(-25 -9 -5)"/>
            <ellipse cx="5" cy="-9" rx="8" ry="6.5" fill="#fbcfe8" transform="rotate(40 5 -9)"/>
            <ellipse cx="10" cy="4" rx="8" ry="6.5" fill="#fce7f3" transform="rotate(100 10 4)"/>
            <ellipse cx="0" cy="10" rx="8" ry="6.5" fill="#fbcfe8" transform="rotate(165 0 10)"/>
            <ellipse cx="-10" cy="4" rx="8" ry="6.5" fill="#fce7f3" transform="rotate(230 -10 4)"/>
            <circle cx="0" cy="0" r="4" fill="#f43f5e"/>
            <circle cx="0" cy="0" r="1.8" fill="#fef08a"/>
          </g>

          {/* Blossom 3 (Mid Hanging Blossom) */}
          <g transform="translate(195, 115)">
            <ellipse cx="-9" cy="-5" rx="8.5" ry="6.5" fill="#fbcfe8" transform="rotate(-20 -9 -5)"/>
            <ellipse cx="5" cy="-9" rx="8.5" ry="6.5" fill="#fce7f3" transform="rotate(45 5 -9)"/>
            <ellipse cx="10" cy="4" rx="8.5" ry="6.5" fill="#fbcfe8" transform="rotate(105 10 4)"/>
            <ellipse cx="0" cy="10" rx="8.5" ry="6.5" fill="#fce7f3" transform="rotate(170 0 10)"/>
            <ellipse cx="-10" cy="4" rx="8.5" ry="6.5" fill="#fbcfe8" transform="rotate(235 -10 4)"/>
            <circle cx="0" cy="0" r="4" fill="#e11d48"/>
            <circle cx="0" cy="0" r="1.8" fill="#fde047"/>
          </g>

          {/* Blossom 4 (Lower Stem Blossom) */}
          <g transform="translate(105, 110)">
            <ellipse cx="-8" cy="-5" rx="7.5" ry="6" fill="#fce7f3" transform="rotate(-25 -8 -5)"/>
            <ellipse cx="5" cy="-8" rx="7.5" ry="6" fill="#fbcfe8" transform="rotate(38 5 -8)"/>
            <ellipse cx="9" cy="4" rx="7.5" ry="6" fill="#fce7f3" transform="rotate(98 9 4)"/>
            <ellipse cx="0" cy="9" rx="7.5" ry="6" fill="#fbcfe8" transform="rotate(163 0 9)"/>
            <ellipse cx="-9" cy="4" rx="7.5" ry="6" fill="#fce7f3" transform="rotate(228 -9 4)"/>
            <circle cx="0" cy="0" r="3.5" fill="#f43f5e"/>
            <circle cx="0" cy="0" r="1.5" fill="#fef08a"/>
          </g>

          {/* Small Delicate Buds */}
          <circle cx="310" cy="190" r="5" fill="#f472b6"/>
          <circle cx="310" cy="190" r="2.5" fill="#fbcfe8"/>
          <circle cx="285" cy="20" r="4.5" fill="#f472b6"/>
          <circle cx="70" cy="55" r="4" fill="#fb7185"/>
        </svg>
      </div>

      {/* Top Right Cherry Blossom Branch */}
      <div className="corner-branch branch-top-right">
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="branch-svg">
          {/* Main Woody Stem */}
          <path d="M330 -10C280 25 230 35 180 28C135 22 100 45 70 75C45 100 25 140 10 190" stroke="#5a3d2e" strokeWidth="7" strokeLinecap="round" fill="none"/>
          <path d="M200 30C175 55 145 75 125 115" stroke="#5a3d2e" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
          <path d="M260 22C240 45 225 80 215 110" stroke="#5a3d2e" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <path d="M100 45C80 30 55 25 35 20" stroke="#5a3d2e" strokeWidth="3" strokeLinecap="round" fill="none"/>

          {/* Blossom Right 1 */}
          <g transform="translate(180, 28)">
            <ellipse cx="-10" cy="-6" rx="9" ry="7" fill="#fce7f3" transform="rotate(-30 -10 -6)"/>
            <ellipse cx="6" cy="-10" rx="9" ry="7" fill="#fbcfe8" transform="rotate(35 6 -10)"/>
            <ellipse cx="12" cy="5" rx="9" ry="7" fill="#fce7f3" transform="rotate(95 12 5)"/>
            <ellipse cx="0" cy="12" rx="9" ry="7" fill="#fbcfe8" transform="rotate(160 0 12)"/>
            <ellipse cx="-11" cy="5" rx="9" ry="7" fill="#fce7f3" transform="rotate(225 -11 5)"/>
            <circle cx="0" cy="0" r="4.5" fill="#f43f5e"/>
            <circle cx="0" cy="0" r="2" fill="#fef08a"/>
          </g>

          {/* Blossom Right 2 */}
          <g transform="translate(70, 75)">
            <ellipse cx="-9" cy="-5" rx="8" ry="6.5" fill="#fbcfe8" transform="rotate(-25 -9 -5)"/>
            <ellipse cx="5" cy="-9" rx="8" ry="6.5" fill="#fce7f3" transform="rotate(40 5 -9)"/>
            <ellipse cx="10" cy="4" rx="8" ry="6.5" fill="#fbcfe8" transform="rotate(100 10 4)"/>
            <ellipse cx="0" cy="10" rx="8.5" ry="6.5" fill="#fce7f3" transform="rotate(165 0 10)"/>
            <ellipse cx="-10" cy="4" rx="8" ry="6.5" fill="#fbcfe8" transform="rotate(230 -10 4)"/>
            <circle cx="0" cy="0" r="4" fill="#e11d48"/>
            <circle cx="0" cy="0" r="1.8" fill="#fde047"/>
          </g>

          {/* Blossom Right 3 */}
          <g transform="translate(125, 115)">
            <ellipse cx="-8" cy="-5" rx="8" ry="6" fill="#fce7f3" transform="rotate(-20 -8 -5)"/>
            <ellipse cx="5" cy="-8" rx="8" ry="6" fill="#fbcfe8" transform="rotate(45 5 -8)"/>
            <ellipse cx="9" cy="4" rx="8" ry="6" fill="#fce7f3" transform="rotate(105 9 4)"/>
            <ellipse cx="0" cy="9" rx="8" ry="6" fill="#fbcfe8" transform="rotate(170 0 9)"/>
            <ellipse cx="-9" cy="4" rx="8" ry="6" fill="#fce7f3" transform="rotate(235 -9 4)"/>
            <circle cx="0" cy="0" r="3.5" fill="#f43f5e"/>
            <circle cx="0" cy="0" r="1.5" fill="#fef08a"/>
          </g>

          {/* Small Delicate Buds */}
          <circle cx="10" cy="190" r="5" fill="#f472b6"/>
          <circle cx="35" cy="20" r="4.5" fill="#fb7185"/>
          <circle cx="215" cy="110" r="5" fill="#fbcfe8"/>
        </svg>
      </div>

      {/* Gentle Floating Cherry Blossom Petals */}
      <div className="petals-canvas">
        {[...Array(12)].map((_, idx) => (
          <div key={idx} className={`floating-petal petal-${idx + 1}`}>
            <svg viewBox="0 0 24 24" className="petal-svg">
              <path 
                d="M12 2C8 2 4.5 5.5 4.5 10.5C4.5 16 8.5 20.5 12 22C15.5 20.5 19.5 16 19.5 10.5C19.5 5.5 16 2 12 2ZM12 5.5C12.8 4.2 13.5 3.2 14 2.8C13.2 3.6 12.6 4.5 12 5.5Z" 
                fill="#fbcfe8" 
                fillOpacity="0.88"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};
