import React, { useState } from 'react'

import styled from 'styled-components'

import { button } from '../../styles/css'

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
            <SubmitButton type="submit" value="Search"/>
        </Container>
    )
}

export default SearchForm

const Container = styled.form`
    display: flex;
    align-items: center;
`

const TextInput = styled.input`
    padding: 0.6rem 1rem;
    border: 2px solid black;
    border-radius: 32px;
    font-size: 18px;
    margin: 0 0.6rem 0 0;
`

const SubmitButton = styled.input`
    ${button}
`