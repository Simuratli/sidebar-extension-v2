import React from "react";

function Redirect({ onClick }: { onClick: () => void }) {
  return (
    <svg
      onClick={onClick}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.9"
        d="M17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34Z"
        fill="#85A5CC"
      />
      <path
        d="M23.6645 16.9453V22.6111C23.6645 23.112 23.4656 23.5924 23.1114 23.9466C22.7572 24.3008 22.2768 24.4997 21.7759 24.4997H11.3886C10.8877 24.4997 10.4073 24.3008 10.0532 23.9466C9.69898 23.5924 9.5 23.112 9.5 22.6111V12.2238C9.5 11.7229 9.69898 11.2425 10.0532 10.8884C10.4073 10.5342 10.8877 10.3352 11.3886 10.3352H17.0544"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.8301 7.49951H26.4959V13.1653"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.1094 17.8868L26.4967 7.49951"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default Redirect;
