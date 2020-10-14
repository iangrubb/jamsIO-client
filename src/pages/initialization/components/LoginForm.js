import React, { useState } from 'react'
import styled from 'styled-components'

const LoginForm = ({ submitHandler }) => {

    const formDefault = {username: "", password: ""}

    const [ formState, setFormState ] = useState(formDefault)

    const updateForm = e => setFormState({...formState, [e.target.name]: e.target.value})

    const submit = e => {
        e.preventDefault()
        submitHandler({variables: formState})
        setFormState(formDefault)
    }

    return (
        <Container onSubmit={submit}>
            <label>Name</label>
            <input name="username" type="textfield" value={formState.username} onChange={updateForm} />
            <label>Password</label>
            <input name="password" type="password" value={formState.password} onChange={updateForm} />
            <input type="submit"/>
        </Container>
    )
}

export default LoginForm

const Container = styled.form`

    display: flex;
    flex-direction: column;

    width: 300px;

    & * {
        margin: 0 0 0.4rem 0;
    }

`

