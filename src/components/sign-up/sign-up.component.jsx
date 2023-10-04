import {  useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignUpContainer } from "./sign-up.styles";
const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formField;

    
    const resetFormFiled = () => {
        setFormField(defaultFormField);
    }

    const hanldeChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('password do not match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFiled();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Can\'t create user, email already in use');
            } else {
                console.log('user creation encounted an error', error);
            }
        }
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email & password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name'
                    type="text"
                    required
                    onChange={hanldeChange}
                    name="displayName"
                    value={displayName} />
                <FormInput label='Email'
                    type="email"
                    required
                    onChange={hanldeChange}
                    name="email"
                    value={email} />
                <FormInput label='Password'
                    type="password"
                    required
                    onChange={hanldeChange}
                    name="password"
                    value={password} />
                <FormInput label='Confirm Password'
                    type="password"
                    required
                    onChange={hanldeChange}
                    name="confirmPassword"
                    value={confirmPassword} />
                <Button  type="submit" >Sign Up</Button>
            </form>
        </SignUpContainer>

    )
}

export default SignUpForm;