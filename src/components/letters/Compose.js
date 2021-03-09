import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { postLetter } from "../../apis/letter";

import { Container, Button } from "react-bootstrap";
import ModalBuilder from "../ModalBuilder";
import LetterForm from "./LetterForm";

const Compose = ({ initVals, pristine, open, setOpen }) => {
  const { isPristine, setIsPristine } = pristine;
  const [vals, setVals] = useState({
    title: "",
    receiver: "",
    content: "",
    ...initVals,
  });
  // const { open, setOpen } = openCtrl;

  let history = useHistory();

  const User = useContext(UserContext);
  const { currUser } = User;

  const onSubmit = async (formValues) => {
    const formData = { ...formValues, sender: currUser.username };

    (async () => {
      const body = { formData };
      const res = await postLetter(body);
      if (res.status === 200) {
        history.push("/dashboard");
      }
    })();
  };

  const modalActions = [
    <Button
      key={0}
      onClick={() => {
        setOpen(false);
        // Calculate prev Route
        history.push("/");
      }}
    >
      Discard
    </Button>,
    <Button key={1} onClick={() => setOpen(false)}>
      Keep Editing
    </Button>,
    <Button
      key={2}
      onClick={() => {
        setOpen(false);
        onSubmit({ ...vals, isDraft: true });
      }}
    >
      Save as Draft
    </Button>,
  ];

  const modalCfg = {
    open,
    title: `Save '${vals.title === "" ? "Untitled" : vals.title}' as Draft?`,
    body: "Save as Draft? Unsaved changes will be lost.",
    actions: modalActions,
    handleClose: () => setOpen(false),
  };

  const formConfig = {
    onSubmit,
    vals,
    setVals,
    isPristine,
    setIsPristine,
  };

  return (
    <Container>
      <ModalBuilder config={modalCfg} />
      <LetterForm config={formConfig} />
    </Container>
  );
};

export default Compose;
