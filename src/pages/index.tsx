import { Flex, Button, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function SignIn() {
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
            >
                <Stack spacing="4">
                    <Input label="E-mail" name="email" type="email" />
                    <Input label="Senha" name="password" type="password" />
                </Stack>

                <Button
                    type="submit"
                    marginTop="6"
                    colorScheme="pink"
                    size="lg"
                >
                    Entrar
                </Button>
            </Flex>
        </Flex>
    );
}
