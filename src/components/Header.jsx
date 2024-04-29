import React from 'react';

export default function Header(props) {
  return (
    <h2 style={{"fontWeight": 700, marginTop: 0}}>{props.title}</h2>
  )
}
