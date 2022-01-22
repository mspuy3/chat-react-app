import axios from "axios";

const API_URL = "https://slackapi.avionschool.com/api/v1";

export const register = async (email, password, passwordConfirmation) => {
    let errors = [];
    const response = await axios
        .post(`${API_URL}/auth`, {
            email,
            password,
            password_confirmation: passwordConfirmation,
        })
        .catch((error) => {
            errors = error.response.data.errors.full_messages;
        });

    return [response, errors];
};

const handleHeader = (headerData) => {
    if (headerData.data) {
        localStorage.setItem("data", JSON.stringify(headerData.data["data"]));
        localStorage.setItem(
            "headers",
            JSON.stringify({
                "access-token": headerData.headers["access-token"],
                client: headerData.headers["client"],
                uid: headerData.headers["uid"],
                expiry: headerData.headers["expiry"],
            })
        );
        console.log({
            "access-token": headerData.headers["access-token"],
            client: headerData.headers["client"],
            uid: headerData.headers["uid"],
            expiry: headerData.headers["expiry"],
        });
    }
};

export const login = async (email, password) => {
    let errors = [];
    const response = await axios
        .post(`${API_URL}/auth/sign_in`, {
            email,
            password,
        })
        .then((headerData) => handleHeader(headerData))
        .catch((error) => {
            errors = error.response.data.errors;
        });

    return [response, errors];
};

const handleFilteredUsers = () => {
    let userList = JSON.parse(localStorage.getItem("usersList"));
    let filteredUsers = userList.map(filterFunc);
    function filterFunc(x) {
        let y = {
            id: parseInt(x["id"]),
            uid: x["uid"],
            class: "User",
        };
        return y;
    }
    localStorage.setItem("filteredUsersList", JSON.stringify(filteredUsers));
};

// list of users function
export const listUsers = async (header) => {
    let errors = [];
    const response = await axios
        .get(`${API_URL}/users`, { headers: header })
        .then((listUsersData) => {
            localStorage.setItem(
                "usersList",
                JSON.stringify(listUsersData.data.data)
            );
            handleFilteredUsers();
        })
        .catch((error) => {
            errors = error.response.data.errors;
        });

    return [response, errors];
};

const handleFilteredChannels = () => {
    let channelList = JSON.parse(localStorage.getItem("channelsList"));
    let filteredChannels = channelList.map(filterFunc);
    function filterFunc(x) {
        let y = {
            id: parseInt(x["id"]),
            uid: x["name"],
            class: "Channel",
        };
        return y;
    }
    localStorage.setItem(
        "filteredChannelsList",
        JSON.stringify(filteredChannels)
    );
};

// list of channels function
export const listChannels = async (header) => {
    let errors = [];
    const response = await axios
        .get(`${API_URL}/channels`, { headers: header })
        .then((listChannelsData) => {
            localStorage.setItem(
                "channelsList",
                JSON.stringify(listChannelsData.data.data)
            );
            handleFilteredChannels();
        })
        .catch((error) => {
            errors = error.response.data.errors;
        });

    return [response, errors];
};

//send Message
export const sendMessage = async (
    header,
    receiver_id,
    receiver_class,
    body
) => {
    let errors = [];
    const response = await axios
        .post(
            `${API_URL}/messages`,
            {
                receiver_id: parseInt(receiver_id),
                receiver_class: receiver_class,
                body: body,
            },
            { headers: header }
        )
        .then((sendData) => console.log(sendData.data,"Sent by ", header.uid))
        .catch((error) => {
            errors = error.response.data.errors;
        });

    return [response, errors];
};

//get messages of clicked
export const receiveMessageOfClicked = async (header, receiver_id, receiver_class) => {
    let errors = [];
    const response = await axios
        .get(
            `${API_URL}/messages?receiver_id=${receiver_id}&receiver_class=${receiver_class}`,
            { headers: header }
        )
        .then((receiveData) => {
            if (receiveData.data.data.length === 0) {
                // console.log("No Messages! for Clicked");
            } else {
                // console.log("Clicked Name's Messages!", receiveData);
                localStorage.setItem(
                    "receivedMessagesByClicked",
                    JSON.stringify(receiveData.data.data)
                );
            }
        })
        .catch((error) => {
            errors = error.errors;
            console.log(error);
        });
    return [response, errors];
};


//New Channel
export const newChannel = async (header, channelName, channelMembers) => {
    let errors = [];
    const response = await axios
        .post(
            `${API_URL}/channels`,
            {
                name: channelName,
                user_ids: channelMembers,
            },
            { headers: header }
        )
        .then((sendData) => {
            console.log("Channel Creation Chuchu", sendData.data);
            if (sendData.data.errors) {
                errors = sendData.data.errors;
            }
        })
        .catch((error) => {
            errors = error.response.data.errors;
        });

    return [response, errors];
};

export const getChannelDetails = async (header, channelId) => {
  let errors = [];
  const response = await axios
      .get(`${API_URL}/channels/${channelId}`, { headers: header })
      .then((channelDetails) => {
        localStorage.setItem(
          "channelDetails",
          JSON.stringify(channelDetails.data.data)
      );
      })
      .catch((error) => {
          errors = error.response.data.errors;
      });

  return [response, errors];
};
