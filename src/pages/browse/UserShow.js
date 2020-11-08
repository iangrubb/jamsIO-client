import React from 'react'

import styled from 'styled-components'

const UserShow = ({ id }) => {
    return (
        <div>
            <h2>User Name</h2>
            <h3>User id: {id}</h3>
        </div>
    )
}

export default UserShow
