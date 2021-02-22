import { Stack, Text, Input } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useState, SyntheticEvent } from 'react';
import { Users } from '../../index';

import api from '../../../services/api';

type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Props = {
  posts: Posts[];
  user: Users | undefined;
};

const PostByUserId = ({ posts, user }: Props) => {
  const [filter, setfilter] = useState('');

  const onChangeInput = (value: SyntheticEvent<HTMLInputElement>) => {
    setfilter(value.currentTarget.value.toLocaleLowerCase());
  };

  const postWithFilter =
    filter !== ''
      ? posts.filter(
          (post) =>
            post.title.toLocaleLowerCase().includes(filter) ||
            post.body.toLocaleLowerCase().includes(filter)
        )
      : posts;

  return (
    <Stack m={5} ml={50}>
      <Stack alignItems="center" mb={10}>
        <Stack spacing={1} align="flex-start">
          <Stack direction="row">
            <Text>name: </Text>
            <Text ml="auto" fontWeight="bold">
              {user?.name}
            </Text>
          </Stack>
          <Stack direction="row">
            <Text>email: </Text>
            <Text ml="auto" fontWeight="bold">
              {user?.email}
            </Text>
          </Stack>
          <Stack direction="row">
            <Text>company: </Text>
            <Text ml="auto" fontWeight="bold">
              {user?.company.name}
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <Input mb={10} variant="flushed" placeholder="search" onChange={onChangeInput} />

        {postWithFilter.map((post) => (
          <Stack key={post.id} mb={10}>
            <Text fontWeight="extrabold" textTransform="capitalize" isTruncated>
              {post.title}
            </Text>
            <Text textTransform="capitalize" isTruncated>
              {post.body}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default PostByUserId;

export const getServerSideProps: GetServerSideProps<Props, { userId: string }> = async (
  context
) => {
  const userId = context.params?.userId ?? '';

  const posts = (await api.get(`/posts/${userId}`)).data;
  const user = (await api.get(`/users/${userId}`)).data;

  return {
    props: {
      posts: posts ?? [],
      user: user[0] ?? undefined,
    },
  };
};
