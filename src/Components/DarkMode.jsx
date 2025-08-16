// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// const DarkMode = ({ isDark, setIsDark }) => {

//   return (
//     <StyledWrapper>
//       <div className='border-2 border-gray-500 rounded-full'>

//         <label className="switch">
//           <input
//             type="checkbox"
//             checked={isDark}
//             onChange={() => setIsDark(!isDark)}
//           />
//           <span className="slider">
//             <span className="circle">
//               <span className="shine shine-1" />
//               <span className="shine shine-2" />
//               <span className="shine shine-3" />
//               <span className="shine shine-4" />
//               <span className="shine shine-5" />
//               <span className="shine shine-6" />
//               <span className="shine shine-7" />
//               <span className="shine shine-8" />
//               <span className="moon" />
//             </span>
//           </span>
//         </label>
//       </div>
//     </StyledWrapper>
//   );
// };


// const StyledWrapper = styled.div`
//   .switch {
//     font-size: 17px;
//     position: relative;
//     display: inline-block;
//     width: 3.5em;
//     height: 2em;
//   }

//   .switch input {
//     opacity: 0;
//     width: 0;
//     height: 0;
//   }

//   .slider {
//     position: absolute;
//     cursor: pointer;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: #333;
//     transition: 0.4s;
//     border-radius: 30px;
//     overflow: hidden;
//   }

//   .circle {
//     position: absolute;
//     content: "";
//     height: 1.4em;
//     width: 1.4em;
//     border-radius: 20px;
//     left: 0.3em;
//     bottom: 0.3em;
//     background-color: var(--primary-yellow);
//     transform: rotate(360deg) translateX(0);
//     transition: 0.4s;
//   }

//   .switch input:checked + .slider .circle {
//     transform: rotate(0deg) translateX(1.5em) !important;
//   }

//   .switch input:checked + .slider .circle .shine {
//     transform: translate(0%, 0%) !important;
//   }

//   .switch input:checked + .slider .circle .moon {
//     left: -10%;
//     opacity: 1;
//     transform: translateY(-60%);
//   }

//   .moon {
//     position: absolute;
//     left: -100%;
//     top: 50%;
//     opacity: 0;
//     background-color: #333;
//     width: 1.25rem;
//     height: 1.25rem;
//     border-radius: 99999px;
//     transform: translateY(-50%);
//     transition: all 0.4s;
//   }

//   .shine {
//     display: block;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     width: 0.25rem;
//     height: 0.25rem;
//     background-color: var(--seconday-yellow);
//     border-radius: 1rem;
//     transition: all 0.4s;
//   }

//   .shine-1 {
//     transform: translate(-50%, -375%);
//   }
//   .shine-2 {
//     transform: translate(175%, -275%);
//   }
//   .shine-3 {
//     transform: translate(275%, -50%);
//   }
//   .shine-4 {
//     transform: translate(175%, 175%);
//   }
//   .shine-5 {
//     transform: translate(-50%, 275%);
//   }
//   .shine-6 {
//     transform: translate(-275%, 175%);
//   }
//   .shine-7 {
//     transform: translate(-375%, -50%);
//   }
//   .shine-8 {
//     transform: translate(-275%, -275%);
//   }`;

// export default DarkMode;

import React from 'react';
import styled from 'styled-components';

const DarkMode = ({ isDark, setIsDark }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setIsDark(!isDark)}
        />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .switch {
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    border: 2px solid gray;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    transition: 0.4s;
    border-radius: 30px;
  }

  .slider:before {
    content: '';
    position: absolute;
    height: 1.4em;
    width: 1.4em;
    left: 0.3em;
    bottom: 0.3em;
    background-color: var(--primary-yellow, #facc15); /* Fallback yellow */
    border-radius: 50%;
    transition: 0.4s;
  }

  .switch input:checked + .slider {
    background-color: #000;
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.5em);
    background-color: black;
    box-shadow: inset 9px 0px 1px 0px white;
  }

  .switch input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  /* ✅ Responsive styles */
  @media (max-width: 480px) {
    .switch {
      width: 3em;
      height: 1.6em;
    }

    .slider:before {
      height: 1.2em;
      width: 1.2em;
      left: 0.2em;
      bottom: 0.2em;
    }

    .switch input:checked + .slider:before {
      transform: translateX(1.2em);
    }
  }
`;

export default DarkMode;
