import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayNefturian from "../components/DisplayNefturian";
import { netfurian } from "../interfaces/interface";

const HomePage = () => {
  const [address, setAddress] = useState("");
  const [nefturian, setNefturian] = useState<netfurian>();
  const [side, setSide] = useState("");
  useEffect(() => {}, []);

  const handleSumbitAddress = async () => {
    console.log(address.length);
    if (address.length == 42) {
      const res: any = await axios
        .get(`http://localhost:3001/number?address=${address}`)
        .catch((err) => console.log(err));

      setNefturian(res.data.nefturian);
      setSide(res.data.side);
    }
  };

  return (
    <div>
      <p>Type your address</p>
      <input type="text" onChange={(e) => setAddress(e.target.value)} />
      <button onClick={handleSumbitAddress}>Sumbit</button>
      {nefturian && (
        <>
          <DisplayNefturian {...nefturian} />
          <p>You are on {side} side</p>
        </>
      )}
    </div>
  );
};

export default HomePage;
