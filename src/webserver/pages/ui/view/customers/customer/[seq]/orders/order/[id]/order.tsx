import { useRouter } from 'next/router';
import styled from 'styled-components';

const Title = styled.h1`
    color: blueviolet;
    font-size: 50px;
`;

export default function Order() {
    const router = useRouter();
    const { seq } = router.query;
    return <Title>{seq}</Title>;
}
