"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [currentUser, setCurrentUser] = useState(null);

 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setCurrentUser);
        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            
            await signInWithEmailAndPassword(email, password);
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth); 
            setEmail(""); 
            setPassword(""); 
        } catch (error) {
            console.error("Sign-out failed:", error.message);
        }
    };

    
    const handleRedirect = () => {
        window.location.href = "http://127.0.0.1:5001/mysterytask-7c5d6/us-central1/helloUser";
    };

    return (
        <div>
            <h1>{currentUser ? "Welcome, " + currentUser.email : "Sign In"}</h1>

            {/* Conditionally render the Sign In or Sign Out button */}
            {!currentUser ? (
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p style={{ color: "red" }}>Error: {error.message}</p>} {/* Display error message */}
                    <button onClick={handleSignIn} disabled={loading} style={{ backgroundColor: "blue", color: "white" }}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </div>
            ) : (
                <div>
                    <p>You are signed in!</p>
                    <button onClick={handleSignOut} style={{ backgroundColor: "red", color: "white" }}>Sign Out</button>

                    
                    <button
                        onClick={handleRedirect}
                        style={{ backgroundColor: "green", color: "white", marginTop: "10px" }}
                    >
                        Go to Cloud Function
                    </button>
                </div>
            )}
        </div>
    );
};

export default SignIn;