import React from "react"
import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap'

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    return (
        <Container>
            {code}
        </Container>
    )
}

