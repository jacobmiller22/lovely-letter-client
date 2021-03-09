import axios from "axios";
import keys from "../config/keys";

const letters = axios.create({
  baseURL: keys.ll_server,
  headers: { ...keys.additional_headers },
});

const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
    },
  };
};

export const getLetters = (params, user) => {
  if (!user) {
    return undefined;
  }

  const cat = params.tab;
  const field = params.activeField.key;
  const dir = params.dir;

  const where = (cat, user) => {
    switch (cat) {
      case "inbox":
        return { _receiver: user.username };
      case "sent":
        return { _sender: user.username, isDraft: false };
      case "drafts":
        return { _sender: user.username, isDraft: true };
      default:
        return { _receiver: user.username };
    }
  };

  return letters.get("/letters", {
    ...getAuthHeader(),
    params: {
      q: JSON.stringify({
        where: where(cat, user),
        order: `${field} ${dir}`,
        select: [
          "_receiver",
          "_sender",
          "title",
          "dateSent",
          "dateRead",
          "isDraft",
        ],
      }),
    },
  });
};

export const postLetter = (body) => {
  const { formData } = body;

  return letters.post(
    "/letter",
    { ...formData },
    {
      ...getAuthHeader(),
    }
  );
};

export const deleteLetter = (params) => {
  const { _id } = params;

  return letters.delete("/letter", {
    ...getAuthHeader(),
    params: {
      _id,
    },
  });
};

export const getLetter = (params) => {
  const { _id } = params;

  return letters.get("/letter", {
    ...getAuthHeader(),
    params: {
      _id,
    },
  });
};
