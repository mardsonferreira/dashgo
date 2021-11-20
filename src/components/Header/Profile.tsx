import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Mardson Ferreira</Text>
                <Text color="gray.300" fontSize="small">
                    mardsonferreira25@gmail.com
                </Text>
            </Box>

            <Avatar
                size="md"
                name="Mardson Ferreira"
                src="https://github.com/mardsonferreira.png"
            />
        </Flex>
    );
}
