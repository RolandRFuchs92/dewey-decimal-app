declare module "quagga" {
  function init(
    initialize: {
      [key: string]: string | number | boolean | object | object[];
    },
    callback: (err: Error) => void
  ): void;
  function start(): void;
  function onDetected(
    onDetectedCallback: (r: { codeResult: { code: string } }) => void
  ): void;
  function offDetected(
    onDetectedCallback: (r: { codeResult: { code: string } }) => void
  ): void;
}
