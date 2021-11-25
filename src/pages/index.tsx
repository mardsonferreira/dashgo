import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { promises } from "stream";

import { Input } from "../components/Form/Input";

type SignInFormData = {
    email: string;
    password: string;
};

export default function SignIn() {
    const { register, handleSubmit, formState } = useForm();

    const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(data);
    };

    return (
        <Flex w="100vw" h="100vh" align="center" justify="center">
            <Flex
                as="form"
                width="100%"
                maxWidth={360}
                background="gray.800"
                padding="8"
                borderRadius={8}
                flexDirection="column"
                onSubmit={handleSubmit(handleSignIn)}
            >
                <Stack spacing="4">
                    <Input
                        label="E-mail"
                        name="email"
                        type="email"
                        {...register("email")}
                    />
                    <Input
                        label="Senha"
                        name="password"
                        type="password"
                        {...register("password")}
                    />
                </Stack>

                <Button
                    type="submit"
                    marginTop="6"
                    colorScheme="pink"
                    size="lg"
                    isLoading={formState.isSubmitting}
                >
                    Entrar
                </Button>
            </Flex>
        </Flex>
    );
}
