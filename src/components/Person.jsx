import React from 'react';
import Image from "./Image";
import Design from "./Person.module.css";

export default function Person(props) {
  const { person } = props;
  return (
    <div className={Design.personInfoContainer}>
        <Image />
        <div className={Design.personDetails}>
            <h3 className={Design.personName}>{person.name}</h3>
            <p className={Design.personInfo}>{person.gender}, {person.age}yrs</p>
        </div>
    </div>
  )
}
