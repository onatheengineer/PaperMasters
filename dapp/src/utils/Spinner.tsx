// import * as React from 'react';
//
// //import styled from 'styled-components';
//
//
// const SpinnerOverlay = styled.div`
//   height: 60vh;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
//
// const SpinnerContainer = styled.div`
//   display: inline-block;
//   width: 50px;
//   height: 50px;
//   border: 3px solid rgba(195, 195, 195, 0.6);
//   border-radius: 50%;
//   border-top-color: #636767;
//   animation: spin 1s ease-in-out infinite;
//   -webkit-animation: spin 1s ease-in-out infinite;
//   @keyframes spin {
//     to {
//       -webkit-transform: rotate(360deg);
//     }
//   }
//   @-webkit-keyframes spin {
//     to {
//       -webkit-transform: rotate(360deg);
//     }
//   }
// `;
//
//const Spinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
import { FC } from 'react';

const Spinner: FC = () => {
  //return isLoading?
  return (
    <div>Spinning</div>
    //     <SpinnerOverlay>
    //         <SpinnerContainer />
    //     </SpinnerOverlay>
    //     ) : (
    //         <WrappedComponent {...otherProps} />
  );
};
//
export default Spinner;
