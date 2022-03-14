/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, Button, Input, Typography } from "@mui/material";
import { BigNumber, utils } from "ethers";
import { ChangeEvent, memo, ReactElement, useCallback, useState } from "react";
import { chainFrom, range } from "transducist";
import TokenCard from "../components/TokenCard";
import Trappings from "../components/Trappings";
import { generateImageUri } from "../util/courageImage";

export default memo(function IndexPage(): ReactElement {
  const [address, setAddress] = useState(getRandomAddress());
  const [input, setInput] = useState(address);
  const [isInvalidAddress, setIsInvalidAddress] = useState(false);
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInput(event.currentTarget.value);
      setIsInvalidAddress(false);
    },
    [],
  );
  const chooseAddress = useCallback(() => {
    if (!utils.isAddress(input)) {
      setIsInvalidAddress(true);
    } else {
      setAddress(input);
    }
  }, [input]);
  const reroll = useCallback(() => {
    const randomAddress = getRandomAddress();
    setAddress(randomAddress);
    setInput(randomAddress);
    setIsInvalidAddress(false);
  }, []);

  return (
    <Trappings>
      <Box
        sx={{
          display: "grid",
          gap: "1.25rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {chainFrom(range(10))
          .map(() => (
            <TokenCard
              tokenId={BigNumber.from(address)}
              owner={address}
              metadata={{
                name: "Courage of 0x6a2…9d01",
                description:
                  "Courage that 0x6a2…9d01 had all along, even if they didn't know it.",
                image: generateImageUri(address),
              }}
            />
          ))
          .toArray()}
      </Box>

      <Input type="text" onChange={handleInputChange} value={input} />
      <Button onClick={chooseAddress}>Set Address</Button>
      <Button onClick={reroll}>Reroll</Button>
      <Typography css={{ visibility: isInvalidAddress ? "visible" : "hidden" }}>
        Invalid address.
      </Typography>
    </Trappings>
  );
});

function getRandomAddress(): string {
  const parts: string[] = ["0x"];
  utils.randomBytes(20).forEach((byte) => {
    const s = byte.toString(16);
    if (s.length === 1) {
      parts.push("0");
    }
    parts.push(s);
  });
  return parts.join("");
}
