interface ClientState {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    id: string;
    token: string;
}

const defaultState: ClientState = {
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    id: "",
    token: "",
};

type ClientAction =
    | { type: "LOAD_CLIENT"; payload: ClientState }
    | { type: "CLEAR_CLIENT"; payload: ClientState };

export const client = (state = defaultState, action: ClientAction) => {
    switch (action.type) {
        case "LOAD_CLIENT": {
            return { ...state, ...action.payload };
        }
        case "CLEAR_CLIENT": {
            return { ...state, ...defaultState };
        }
        default: {
            return state;
        }
    }
};