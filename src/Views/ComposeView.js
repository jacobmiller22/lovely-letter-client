import { useState } from "react";

import Page from "../components/Page";
import Compose from "../components/letters/Compose";

const ComposeView = ({ location }) => {
  const [isPristine, setIsPristine] = useState(true);
  const [open, setOpen] = useState(false);

  const pristine = { isPristine, setIsPristine };

  const initVals = location?.state?.vals;
  const backCfg = {
    to: { pathname: "/dashboard" },
    onClick: (e) => {
      if (!isPristine) {
        e.preventDefault();
        setOpen(true);
      }
    },
  };
  return (
    <Page title="Compose Letter" backCfg={backCfg}>
      <Compose
        initVals={initVals}
        pristine={pristine}
        open={open}
        setOpen={setOpen}
      />
    </Page>
  );
};

export default ComposeView;
