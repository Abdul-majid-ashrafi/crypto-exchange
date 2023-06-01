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
      // const idx = action.payload?.userIdx;
      // const allUsers = state.users;
      // if (idx) {

      //   // allUsers[idx].coin = state.users[idx].coin + 2;
      //   // state.users[idx].coin = state.users[idx].coin + 2;
      // }
      console.log("STATE ", state);
      var user = action.payload.user;
      console.log("payload ", user);
      // user.coin = user.coin - 2;
      // const index = allUsers.findIndex(usr => {
      //   return usr.id === user.id;
      // });
      // if (index !== -1) {
      //   allUsers[index].coin = allUsers[index].coin - 2;
      // }

      // state.users.splice(2 ,1)

      return {
        ...state,
        // users: [...allUsers],
        users: [...state.users],
      };
    // return {
    //   ...state,
    //   users: [...state.users, action.payload?.note],
    // };
    default:
      return state;
  }
};

export default cryptoCoin;
