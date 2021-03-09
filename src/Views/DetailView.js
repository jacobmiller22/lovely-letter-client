import { getCWDLeg } from "../utils";
import Page from "../components/Page";
import LetterDetail from "../components/letters/LetterDetail";

const DetailView = ({ location }) => {
  console.log("detail");
  return (
    <Page backCfg={{ to: { pathname: "/dashboard" } }}>
      <LetterDetail _id={getCWDLeg(location.pathname)} />
    </Page>
  );
};

export default DetailView;
