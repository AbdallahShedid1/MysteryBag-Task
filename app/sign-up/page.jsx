"use client";
import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); // Initialize useRouter

    const [
        createUserWithEmailAndPassword, 
        user, 
        loading, 
        error
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async () => {
        try {   
            const userCredentials = await createUserWithEmailAndPassword(email, password);
            if (userCredentials) {
                setEmail("");
                setPassword("");
                router.push("/"); // Redirect to home page after successful sign-up
            }
        } catch (error) {
            console.error("Unexpected error:", error); // Handle unexpected errors
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
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
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}  {/* Display Firebase error message */}
            <button onClick={handleSignUp} disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"} {/* Show loading state on button */}
            </button>
        </div>
    );
}

export default SignUp;