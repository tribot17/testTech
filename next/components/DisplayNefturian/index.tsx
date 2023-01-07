import Image from "next/image";
import React from "react";
import { netfurian } from "../../interfaces/interface";

const DisplayNefturian = (nefturian: netfurian) => {
  return (
    <div>
      <p>{nefturian.name}</p>
      <Image
        src={nefturian.image}
        width={150}
        height={150}
        alt="nefturian_img"
      />
    </div>
  );
};

export default DisplayNefturian;
