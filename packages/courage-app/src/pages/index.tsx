/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Button, Input, Typography } from "@mui/material";
import { utils } from "ethers";
import { ChangeEvent, memo, ReactElement, useCallback, useState } from "react";
import Container from "../components/Container";
import CourageImage from "../components/CourageImage";
import Trappings from "../components/Trappings";

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
      <Container>
        <CourageImage address={address} />
        <Input type="text" onChange={handleInputChange} value={input} />
        <Button onClick={chooseAddress}>Set Address</Button>
        <Button onClick={reroll}>Reroll</Button>
        <Typography
          css={{ visibility: isInvalidAddress ? "visible" : "hidden" }}
        >
          Invalid address.
        </Typography>
      </Container>
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
