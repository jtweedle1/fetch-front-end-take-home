import { useState } from "react";
import { useNavigate } from "react-router";
import {
    Button,
    Field,
    Fieldset,
    Input,
    Center,
    Stack
} from "@chakra-ui/react"

function Home() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const url = "https://frontend-take-home-service.fetch.com/auth/login";
        const body = {
            name: name,
            email: email
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(body),
                credentials: 'include',
            })

            const result: any = await response.json();

            if (response.ok) {
                navigate('/search');
            } else {
                throw new Error(`Login failed. Error: ${result.message}`);
            }
        } catch (err) {
            console.error('Login error: ', err)
        }
    }

    return (
        <div>
            <h1>Home</h1>
            <Fieldset.Root size="lg" maxW="md">
                <Stack>
                    <Fieldset.Legend>Login</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Ready to find your perfect furry, barking friend? Login now!
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Input name="name" />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Email address</Field.Label>
                        <Input name="email" type="email" />
                    </Field.Root>

                </Fieldset.Content>

                <Fieldset.HelperText>
                    By clicking "Login", you agree to our Terms of Service and Privacy Policy.
                </Fieldset.HelperText>
                <Center>
                    <Button variant="solid" type="submit">
                        Login
                    </Button>
                </Center>
            </Fieldset.Root>
        </div>
    );
}

export default Home;