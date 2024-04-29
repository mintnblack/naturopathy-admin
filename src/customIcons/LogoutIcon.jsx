import React from "react";

export default function LogoutIcon(props) {
    const {color} = props;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.37358 4.35185H9.99431C10.5095 4.35185 10.9311 3.93519 10.9311 3.42593C10.9311 2.91667 10.5095 2.5 9.99431 2.5H4.37358C3.34311 2.5 2.5 3.33333 2.5 4.35185V17.3148C2.5 18.3333 3.34311 19.1667 4.37358 19.1667H9.99431C10.5095 19.1667 10.9311 18.75 10.9311 18.2407C10.9311 17.7315 10.5095 17.3148 9.99431 17.3148H4.37358V4.35185Z"
        fill={color}
      />
      <path
        d="M19.0344 10.5095L16.4207 7.9262C16.121 7.6299 15.6151 7.83361 15.6151 8.25027V9.90768H9.05758C8.54234 9.90768 8.12079 10.3243 8.12079 10.8336C8.12079 11.3429 8.54234 11.7595 9.05758 11.7595H15.6151V13.4169C15.6151 13.8336 16.121 14.0373 16.4114 13.741L19.025 11.1577C19.2124 10.9818 19.2124 10.6855 19.0344 10.5095Z"
        fill={color}
      />
    </svg>
  );
}