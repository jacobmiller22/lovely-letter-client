import { Container } from "react-bootstrap";

import LetterPanel from "../components/letters/LetterPanel";
import LetterItemLarge from "../components/letters/LetterItemLarge";
import LetterListControl from "../components/letters/LetterListControl";

const LettersListView = () => {
  return (
    <Container>
      <LetterPanel Item={LetterItemLarge}>
        <LetterListControl />
      </LetterPanel>
    </Container>
  );
};
export default LettersListView;
