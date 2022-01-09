import {
    Box,
    Flex,
    Heading,
    Button,
    Icon,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Checkbox,
    Text,
    useBreakpointValue,
    Spinner,
    Link,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import NextLink from "next/link";
import { useState } from "react";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/QueryClient";
import { api } from "../../services/api";

export default function UserList() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error } = useUsers(page);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(["user", userId], async () => {
            const response = await api.get(`users/${userId}`);

            return response.data;
        }, {
            staleTime: 1000 * 60 * 10
        })
    }

    return (
        <Box>
            <Header />

            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            {!isLoading && isFetching && (
                                <Spinner size="sm" color="gray.500" ml="4" />
                            )}
                        </Heading>

                        <NextLink href="/users/create" passHref>
                            <Button
                                a="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Cria novo
                            </Button>
                        </NextLink>
                    </Flex>

                    {isLoading ? (
                        <Flex justifyContent="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justifyContent="center">
                            <Text>Falha ao carregar dados dos usuários.</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th
                                            px={["4", "4", "6"]}
                                            color="gray.300"
                                            width="8"
                                        >
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuário</Th>
                                        {isWideVersion && (
                                            <Th>Data de cadastro</Th>
                                        )}
                                        <Th width="8"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.users.map((user) => (
                                        <Tr key={user.id}>
                                            <Td px={["4", "4", "6"]}>
                                                <Checkbox colorScheme="pink" />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <Link
                                                        color="purple.400"
                                                        fontWeight="bold"
                                                        onMouseEnter={() => handlePrefetchUser(user.id)}
                                                    >
                                                        {user.name}
                                                    </Link>
                                                    <Text
                                                        fontSize="sm"
                                                        color="gray.300"
                                                    >
                                                        {user.email}
                                                    </Text>
                                                </Box>
                                            </Td>
                                            {isWideVersion && (
                                                <Td>{user.createdAt}</Td>
                                            )}
                                            <Td>
                                                <Button
                                                    a="a"
                                                    size="sm"
                                                    fontSize="sm"
                                                    colorScheme="purple"
                                                    leftIcon={
                                                        <Icon
                                                            as={RiPencilLine}
                                                            fontSize="16"
                                                        />
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>

                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}
