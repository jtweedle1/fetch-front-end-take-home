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

type LoginRequestBody = {
    name: string;
    email: string;
};

function Home() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (): Promise<void> => {
        const url = "https://frontend-take-home-service.fetch.com/auth/login";
        const body: LoginRequestBody = { name, email };

        try {
            const response: Response = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(body),
                credentials: 'include',
            })

            if (response.ok) {
                console.log('Login successful.')
                navigate('/search');
            } else {
                const result: any = await response.json();
                console.log('Login failed.')
                throw new Error(`Login failed. Error: ${result.message}`);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Login error: ', err.message);
            } else {
                console.error('Unexpected login error', err);
            }
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
                        <Input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Email address</Field.Label>
                        <Input
                            name="email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)}
                            type="email" />
                    </Field.Root>

                </Fieldset.Content>

                <Fieldset.HelperText>
                    By clicking "Login", you agree to our Terms of Service and Privacy Policy.
                </Fieldset.HelperText>
                <Center>
                    <Button
                        variant="solid"
                        type="submit"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Center>
            </Fieldset.Root>
        </div>
    );
}

export default Home;