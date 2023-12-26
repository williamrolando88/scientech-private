import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { COLLECTIONS } from 'src/lib/enums/collections';
import { AUTH, DB } from 'src/lib/settings/firebase';
import { ActionMapType, AuthStateType, AuthUserType, FirebaseContextType } from './types';

enum Types {
  INITIAL = 'INITIAL',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  return state;
};

export const AuthContext = createContext<FirebaseContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          const userRef = doc(DB, COLLECTIONS.USERS, user.uid);
          const docSnap = await getDoc(userRef);
          const profile = docSnap.data();

          dispatch({
            type: Types.INITIAL,
            payload: {
              isAuthenticated: true,
              user: {
                ...user,
                ...profile,
                role: 'admin',
              },
            },
          });
        } else {
          dispatch({
            type: Types.INITIAL,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(AUTH, email, password);
  }, []);

  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      await createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
        const userRef = doc(collection(DB, 'users'), res.user?.uid);

        await setDoc(userRef, {
          uid: res.user?.uid,
          email,
          displayName: `${firstName} ${lastName}`,
          role: 'user',
        });
      });
    },
    []
  );

  const logout = useCallback(() => {
    signOut(AUTH);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'firebase',
      login,
      register,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, register, logout]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
