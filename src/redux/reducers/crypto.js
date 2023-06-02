const defaultUsers = [
  {
    username: "Asad",
    description: "Interview to conduct at 3.30PM on Thursday.",
    coin: 10,
    id: "01",
  },
  {
    username: "Atha",
    description: "Start learning reactjs course for 2 days.",
    coin: 14,
    id: "02",
  },
  {
    username: "Sean",
    description: "Have a coffee at your favourite cafe after dinner.",
    coin: 6,
    id: "03",
  },
  {
    username: "Kevin",
    description: "Visit car showroom to fix brake system issue.",
    coin: 8,
    id: "04",
  },
  {
    username: "Arif",
    description: "Check documents to learn project",
    coin: 18,
    id: "05",
  },
  {
    username: "Paul",
    description: "Visit car showroom to fix brake system issue.",
    coin: 16,
    id: "06",
  },
  {
    username: "Majid",
    description: "Interview to conduct at 3.30PM on Thursday.",
    coin: 14,
    id: "07",
  },
  {
    username: "Salman.0",
    description: "Check documents to learn project",
    coin: 12,
    id: "08",
  },
];

const initialState = {
  users: defaultUsers,
};

const cryptoCoin = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSFER_COIN':
      let user = action.payload.user;
      return {
        ...state,
        users: [...state.users, user],
      };
    default:
      return state;
  }
};

export default cryptoCoin;
