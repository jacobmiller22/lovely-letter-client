import React, { useEffect, useState } from "react";

import ItemList from "../items/ItemList";

import contactApi from "../../apis/contact";

const ContactLanding = ({
  title,
  currUser,
  dir,
  setDir,
  field,
  setField,
  cat,
  FIELDS,
}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      setContacts(await contactApi.get("/contacts"));
    };
    fetchContacts();
  }, [currUser, dir, field, cat]);

  const contactContent = () => <div>contact</div>;

  const detailContent = () => <div>contact</div>;

  return (
    <div>
      <ItemList
        title={title}
        items={contacts}
        itemContent={contactContent}
        detailContent={detailContent}
        dir={dir}
        setDir={setDir}
        field={field}
        setField={setField}
        FIELDS={FIELDS}
      />
    </div>
  );
};

export default ContactLanding;
