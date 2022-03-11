/** @jsx jsx */
import { utils } from "ethers";
import { memo, ReactElement, useCallback, useState } from "react";
import { Button, jsx } from "theme-ui";
import CourageImage from "../components/CourageImage";
import Trappings from "../components/Trappings";

export default memo(function IndexPage(): ReactElement {
  const [address, setAddress] = useState(getRandomAddress());
  const reroll = useCallback(() => setAddress(getRandomAddress()), []);
  return (
    <Trappings>
      <CourageImage address={address} />
      <Button onClick={reroll}>Reroll</Button>
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
