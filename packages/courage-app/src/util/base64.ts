export function base64ToUtf8(s: string): string {
  const binStr = atob(s);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new TextDecoder().decode(arr);
}
