import { Link, Stack, Text, Button, Heading, Input } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { GetServerSideProps } from 'next';
import api from '../services/api';
import { useState, SyntheticEvent } from 'react';

export type Users = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

type Props = {
  users: Users[];
};

const Users = ({ users }: Props) => {
  const [filter, setFilter] = useState('');

  const onChangeInput = (value: SyntheticEvent<HTMLInputElement>) => {
    const company = value.currentTarget.value.toLocaleLowerCase();
    setFilter(company);
  };

  const usersWithFilter =
    filter !== ''
      ? users.filter(
          (user) =>
            user.company.name.toLocaleLowerCase().includes(filter) ||
            user.name.toLocaleLowerCase().includes(filter)
        )
      : users;

  return (
    <Stack mt={10} ml={5} padding={5}>
      <Heading size="lg">Users</Heading>
      <Input mb={10} variant="flushed" placeholder="name or company" onChange={onChangeInput} />
      {usersWithFilter.map((user) => (
        <Stack spacing={1} ml={10} paddingBottom={10} align="flex-start" key={user.id}>
          <Stack direction="row">
            <Text>name: </Text>
            <Text ml="auto" fontWeight="bold">
              {user.name}
            </Text>
          </Stack>
          <Stack direction="row">
            <Text>email: </Text>
            <Text ml="auto" fontWeight="bold">
              {user.email}
            </Text>
          </Stack>
          <Stack direction="row">
            <Text>company: </Text>
            <Text ml="auto" fontWeight="bold">
              {user.company.name}
            </Text>
          </Stack>
          <Stack direction="row" m={0} p={0}>
            <Link href={`users/${user.id}/posts`} isExternal _hover={{ textDecoration: 'none' }}>
              <Button
                h="auto"
                px={0}
                _focus={{ outlineColor: 'yellow' }}
                _hover={{ color: 'yellow' }}
                bg="none"
                rightIcon={<ExternalLinkIcon boxSize={3} />}
              >
                posts
              </Button>
            </Link>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const users = (await api.get('/users')).data;

  return {
    props: {
      users: users ?? [],
    },
  };
};
