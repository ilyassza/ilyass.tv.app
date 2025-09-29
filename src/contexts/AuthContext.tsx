'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  AuthError
} from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || userData.displayName,
              photoURL: firebaseUser.photoURL || userData.photoURL,
              role: userData.role || 'user',
              createdAt: userData.createdAt,
              lastLogin: new Date(),
            });
          } else {
            // Create user document if it doesn't exist
            const newUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || '',
              role: 'user',
              createdAt: new Date(),
              lastLogin: new Date(),
            };

            await setDoc(doc(db, 'users', firebaseUser.uid), {
              ...newUser,
              createdAt: newUser.createdAt,
              lastLogin: newUser.lastLogin,
            });

            setUser(newUser);
          }

          // Update last login
          await setDoc(doc(db, 'users', firebaseUser.uid), {
            lastLogin: new Date(),
          }, { merge: true });

        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Check user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        toast.success('تم تسجيل الدخول بنجاح!');
      } else {
        await signOut(auth);
        toast.error('ليس لديك صلاحية الوصول إلى لوحة التحكم');
        throw new Error('User is not an admin');
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error('Login error:', authError);
      
      let errorMessage = 'حدث خطأ أثناء تسجيل الدخول';
      
      if ((error as AuthError).code) {
        const authError = error as AuthError;
        switch (authError.code) {
          case 'auth/user-not-found':
            errorMessage = 'البريد الإلكتروني غير موجود';
            break;
          case 'auth/wrong-password':
            errorMessage = 'كلمة المرور غير صحيحة';
            break;
          case 'auth/invalid-email':
            errorMessage = 'البريد الإلكتروني غير صالح';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'تم تجاوز عدد المحاولات المسموح، حاول مرة أخرى لاحقاً';
            break;
          default:
            errorMessage = 'حدث خطأ أثناء تسجيل الدخول';
        }
      } else if ((error as Error).message !== 'User is not an admin') {
        errorMessage = (error as Error).message;
      } else {
        // Don't show a generic error message if it's an admin check failure
        return;
      }
      
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('تم تسجيل الخروج بنجاح');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};