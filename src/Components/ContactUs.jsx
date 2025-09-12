import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ContactUs = ({ name }) => {
  const { t } = useTranslation()
  
  return (
    <StyledWrapper>
      <div>
        {name === 'call' ?
          <a href="tel:+97142232269" className=''>
            <button className="cursor-pointer">
              {t('navbar.call')}
            </button>
          </a> : name === 'download'?
          <button className="cursor-pointer">
            {t('landing.download')}
          </button>: <button>hi</button>
        }

      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   padding: 8px 16px;
   border: 2px solid gray;
   border-radius: 15px;
   color: #212121;
   z-index: 1;
//    background: #e8e8e8;
   background: var(--primary-yellow);
   position: relative;
   font-weight: 600;
   font-size: 15px;
   -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   transition: all 250ms;
   overflow: hidden;
  }

  button::before {
   content: "";
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 0;
   border-radius: 15px;
   background-color: var(--seconday-yellow);
   z-index: -1;
   -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
   transition: all 250ms
  }

  button:hover {
   color: #000;
  }

  button:hover::before {
   width: 100%;
  }`;

export default ContactUs;
