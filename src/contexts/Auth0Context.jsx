import { Auth0Client } from "@auth0/auth0-spa-js";
import LoadingScreen from "components/LoadingScreen";
import { auth0Config } from "config";
import { createContext, useEffect, useReducer } from "react";
// All types
// =============================================
var Types;

(function (Types) {
  Types["Init"] = "INIT";
  Types["Login"] = "LOGIN";
  Types["Logout"] = "LOGOUT";
})(Types || (Types = {}));

// ================================================
let auth0Client = null;
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      {
        return {
          isInitialized: true,
          user: action.payload.user,
          isAuthenticated: action.payload.isAuthenticated
        };
      }

    case "LOGIN":
      {
        return { ...state,
          isAuthenticated: true,
          user: action.payload.user
        };
      }

    case "LOGOUT":
      {
        return { ...state,
          user: null,
          isAuthenticated: false
        };
      }

    default:
      {
        return state;
      }
  }
};

const AuthContext = createContext({ ...initialState,
  method: "Auth0",
  login: () => Promise.resolve(),
  logout: () => {}
}); // props type

export const AuthProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async () => {
    await auth0Client?.loginWithPopup();
    const isAuthenticated = await auth0Client?.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client?.getUser();
      dispatch({
        type: Types.Login,
        payload: {
          user: user || null
        }
      });
    }
  };

  const logout = () => {
    auth0Client?.logout();
    dispatch({
      type: Types.Logout
    });
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        auth0Client = new Auth0Client({
          client_id: auth0Config.clientId || "",
          domain: auth0Config.domain || "",
          redirect_uri: window.location.origin
        });
        await auth0Client.checkSession();
        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const user = await auth0Client.getUser();
          dispatch({
            type: Types.Init,
            payload: {
              isAuthenticated,
              user: user || null
            }
          });
        } else {
          dispatch({
            type: Types.Init,
            payload: {
              isAuthenticated,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Init,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  if (!state.isInitialized) {
    return <LoadingScreen />;
  }

  return <AuthContext.Provider value={{ ...state,
    method: "Auth0",
    login,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export default AuthContext;