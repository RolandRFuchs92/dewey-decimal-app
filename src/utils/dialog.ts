import { useConfirm } from "material-ui-confirm";

type DialogModel = {
  title?: string;
  description?: string;
  handleYes?: () => void;
  handleNo?: () => void;
};

export const useDialog = () => {
  const confirm = useConfirm();
  return ({
    title = "Are you sure?",
    description = "",
    handleYes,
    handleNo
  }: DialogModel) =>
    confirm({
      title,
      description,
      confirmationText: "Yes",
      cancellationText: "No"
    })
      .then(() => handleYes && handleYes())
      .catch(() => handleNo && handleNo());
};
