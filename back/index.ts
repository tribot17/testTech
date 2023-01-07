const Web3 = require("web3");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
//Just need a random RPC
const web3 = new Web3("https://polygon-rpc.com");
const app = express();
const address = "0x84723e16a5762bdfd393bAc63a37d882dC06d922";
let databaseContent;
const corsOptions = {
  origin: "*",
};
const getNefturianNumber = (address) => {
  const hexNumber = web3.utils.toHex(address.slice(8, 13));
  const number = web3.utils.toDecimal(hexNumber) % 1240;

  return number;
};

const readDataBase = () => {
  fs.readFile("./data/database.json", "utf-8", (err, data) => {
    if (err) throw err;
    databaseContent = JSON.parse(data);
  });
};

const updateDataBase = async (number, nefturian, side) => {
  let isIn = databaseContent.filter((element) => element.id === number);
  readDataBase();

  databaseContent.forEach((element) => {
    if (element.id === number) {
      isIn = true;
    }
  });

  if (isIn.length === 0) {
    databaseContent.push({
      id: number,
      nefturian,
      side,
    });

    const json = JSON.stringify(databaseContent);
    fs.writeFileSync("./data/database.json", json);
  }

  readDataBase();
};

const getSide = (number, nefturian) => {
  if (nefturian.attributes.length > 0) {
    if (number % 3 > 0) return "Cyberian";
    else return "Samurian";
  } else {
    return "lone wolf";
  }
};

app.get("/number", cors(corsOptions), async (req, res) => {
  try {
    const address = req.query.address;
    const result = getNefturianNumber(address);
    const netfurian = await axios.get(
      `https://api.nefturians.io/metadata/${result}`
    );
    const side = getSide(result, netfurian.data);

    updateDataBase(result, netfurian.data, side);
    res.json({ result: result, nefturian: netfurian.data, side: side });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("Listening on 3001");
});

readDataBase();
