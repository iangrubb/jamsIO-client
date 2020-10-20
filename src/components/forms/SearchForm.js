import React, { useState } from 'react'

import styled from 'styled-components'

const SearchForm = ({ submitData }) => {

    const [formValue, setFormValue] = useState("")

    const handleChange = e => setFormValue(e.target.value)

    const submitHandler = e => {
        e.preventDefault()
        submitData(formValue)
        setFormValue("")
    }

    return (
        <Container onSubmit={submitHandler}>
            <TextInput name="searchTerm" type="textfield" value={formValue} onChange={handleChange} />
            <SubmitButton type="submit" value="SUBMIT"/>
        </Container>
    )
}

export default SearchForm

const Container = styled.form`
    display: flex;
`

const TextInput = styled.input`
    padding: 0.6rem 1rem;
    border: 2px solid black;
    border-radius: 32px;
    font-size: 18px;
    margin: 0 0.6rem 0 0;
`

const SubmitButton = styled.input`
    background: var(--green);
    border: none;
    border-radius: 32px;
    padding: 0 1rem;

    cursor: pointer;

    color: var(--white);
    font-size: 14px;
    font-weight: 700;
    font-family: var(--display-font);
`