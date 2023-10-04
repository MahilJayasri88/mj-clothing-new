import {   useState } from "react";
import {   signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { ButtonsContainer, SignInContainer } from "./sign-in.styles";

const defaultFormField = {
    email: '',
    password: '',
}



const SignInForm = () => {
    // useEffect(() => {
    //     getRedirectResult(auth).then((response) => {
    //         if (response) {
    //             const userDocRef = createUserDocumentFromAuth(response.user);
    //         }
    //     }).catch((error) => {
    //         console.error("Error in getRedirectResult:", error);
    //     });
    // }, []);

    const [formField, setFormField] = useState(defaultFormField);
    const { email, password } = formField;



    const resetFormFiled = () => {
        setFormField(defaultFormField);
    }

    const logGoogleUser = async () => {
        try {
             await signInWithGooglePopup();
          
        } catch (error) {
            console.error("Error signing in with Google popup:", error);
        }
    }

    const hanldeChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFiled();
        } catch (error) {
            if (error.code === 'auth/invalid-login-credentials') {
                alert('Invalid email and password');
            } else {
                console.log('user creation encounted an error', error);
            }
        }
    }


    return (
        <SignInContainer>


            <h2>Already have an account?</h2>
            <span>Sign up with your email & password</span>
            <form onSubmit={handleSubmit}>

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
                <ButtonsContainer>

                    <Button type='submit'> Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}> Google</Button>
                    {/* <Button type='button' buttonType='google' onClick={signInWithGoogleRedirect}> Red</Button> */}

                </ButtonsContainer></form>
        </SignInContainer>

    )
}

export default SignInForm;