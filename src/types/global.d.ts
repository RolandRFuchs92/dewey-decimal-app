interface Window {
  ipcRenderer: {
    send: (
      sendOnChanel: string,
      errorLogResult: { [key: string]: string }[]
    ) => void;
    once: (
      listenOnChanel: string,
      callback: (
        event: { [key: string]: string },
        result: { isSuccess: boolean; message: string }
      ) => void
    ) => void;
  };
}
